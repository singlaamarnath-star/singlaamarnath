import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Radio,
  Sparkles,
  Send,
  AlertCircle,
  PhoneOff,
  Scale,
  Bot,
  Zap,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to start Live Voice Conversation');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<boolean>(false);
  const [textInput, setTextInput] = useState('');
  const [transcripts, setTranscripts] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  // Stop all playback audio nodes immediately
  const stopPlaybackQueue = useCallback(() => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {
        // source already stopped
      }
    });
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
  }, []);

  // Helper: Convert Float32Array to PCM Int16 LE Base64
  const convertFloat32ToPcm16Base64 = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Play incoming 24kHz PCM Int16 Base64 audio chunk from Gemini Live
  const playPcm24kChunk = useCallback(
    (base64Data: string) => {
      if (isSpeakerMuted) return;

      try {
        if (!outputAudioCtxRef.current) {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          outputAudioCtxRef.current = new AudioCtx({ sampleRate: 24000 });
        }

        const outputAudioCtx = outputAudioCtxRef.current;
        if (outputAudioCtx.state === 'suspended') {
          outputAudioCtx.resume();
        }

        const binaryStr = atob(base64Data);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        const int16 = new Int16Array(bytes.buffer);
        const float32 = new Float32Array(int16.length);
        for (let i = 0; i < int16.length; i++) {
          float32[i] = int16[i] / (int16[i] < 0 ? 32768 : 32767);
        }

        const audioBuffer = outputAudioCtx.createBuffer(1, float32.length, 24000);
        audioBuffer.getChannelData(0).set(float32);

        const source = outputAudioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputAudioCtx.destination);

        const now = outputAudioCtx.currentTime;
        const startTime = Math.max(now, nextStartTimeRef.current);
        source.start(startTime);
        nextStartTimeRef.current = startTime + audioBuffer.duration;

        activeSourcesRef.current.push(source);

        source.onended = () => {
          activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
        };
      } catch (err) {
        console.error('Error playing 24kHz audio chunk:', err);
      }
    },
    [isSpeakerMuted]
  );

  // Stop session
  const stopSession = useCallback(() => {
    setStatusMessage('Voice session ended');
    setIsConnected(false);
    setIsConnecting(false);
    setHasMicAccess(false);

    stopPlaybackQueue();

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, [stopPlaybackQueue]);

  // Connect to Gemini Live WebSocket
  const connectWebSocket = useCallback((withMic: boolean) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/live`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnecting(false);
      setIsConnected(true);
      setHasMicAccess(withMic);
      setStatusMessage(
        withMic
          ? 'Live Voice Connected (Two-Way Microphone & Speaker)'
          : 'Live Voice Connected (Voice Speaker Output Mode)'
      );
      setTranscripts((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: withMic
            ? 'Hello! I am your AI GST Legal Voice Advisor. Ask me anything about GST notices, case laws, or Section 73 vs 74.'
            : 'Hello! I am connected in Voice Output mode. Type your question or click a legal prompt below, and I will speak the answer out loud for you!',
        },
      ]);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.error) {
          setErrorMessage(msg.error);
          stopSession();
        } else if (msg.interrupted) {
          stopPlaybackQueue();
          setStatusMessage('Interrupted — Listening to you...');
        } else if (msg.audio) {
          setStatusMessage('Gemini Live is speaking...');
          playPcm24kChunk(msg.audio);
        }
      } catch (e) {
        console.error('Error parsing WS message:', e);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setErrorMessage('Failed to establish WebSocket connection with Gemini Live API');
      stopSession();
    };

    ws.onclose = () => {
      setIsConnected(false);
      setIsConnecting(false);
      setStatusMessage('Voice Session Disconnected');
    };
  }, [playPcm24kChunk, stopPlaybackQueue, stopSession]);

  // Start Gemini Live API session with optional microphone
  const startSession = async (requireMic = true) => {
    setErrorMessage(null);
    setPermissionError(false);
    setIsConnecting(true);
    setStatusMessage(requireMic ? 'Requesting microphone access...' : 'Connecting to Gemini Live Voice Advisor...');

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;

    // Initialize speaker output audio context
    try {
      if (!outputAudioCtxRef.current) {
        outputAudioCtxRef.current = new AudioCtx({ sampleRate: 24000 });
      }
      if (outputAudioCtxRef.current.state === 'suspended') {
        await outputAudioCtxRef.current.resume();
      }
    } catch (e) {
      console.warn('Speaker AudioContext initialization warning:', e);
    }

    if (!requireMic) {
      // Direct speaker/text mode connection
      connectWebSocket(false);
      return;
    }

    // Try microphone access
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support microphone input. You can continue in Voice Speaker mode.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const inputAudioCtx = new AudioCtx({ sampleRate: 16000 });
      if (inputAudioCtx.state === 'suspended') {
        await inputAudioCtx.resume();
      }
      inputAudioCtxRef.current = inputAudioCtx;

      const source = inputAudioCtx.createMediaStreamSource(stream);
      const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(inputAudioCtx.destination);

      // Handle mic audio processing
      processor.onaudioprocess = (e) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        if (isMuted) return;

        const float32Data = e.inputBuffer.getChannelData(0);
        const pcm16Base64 = convertFloat32ToPcm16Base64(float32Data);

        wsRef.current.send(JSON.stringify({ audio: pcm16Base64 }));
      };

      connectWebSocket(true);
    } catch (err: any) {
      console.error('Microphone capture error:', err);
      setIsConnecting(false);

      const isPermissionIssue =
        err?.name === 'NotAllowedError' ||
        err?.name === 'PermissionDeniedError' ||
        err?.name === 'SecurityError' ||
        err?.message?.toLowerCase().includes('permission') ||
        err?.message?.toLowerCase().includes('not allowed');

      if (isPermissionIssue) {
        setPermissionError(true);
        setErrorMessage(
          'Microphone permission was blocked or denied by the browser or iframe sandbox. You can open the app in a new tab to enable full mic permissions, or continue immediately in Voice Speaker mode!'
        );
      } else {
        setErrorMessage(err?.message || 'Could not initialize microphone.');
      }
    }
  };

  // Send text message into Live session
  const handleSendText = (textToSend?: string) => {
    const query = (textToSend || textInput).trim();
    if (!query) return;

    if (!isConnected) {
      // Automatically connect in Voice Output mode and send query
      startSession(false);
      setTimeout(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ text: query }));
          setTranscripts((prev) => [...prev, { sender: 'user', text: query }]);
          if (!textToSend) setTextInput('');
          setStatusMessage(`Asking Gemini: "${query}"`);
        }
      }, 1000);
      return;
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text: query }));
      setTranscripts((prev) => [...prev, { sender: 'user', text: query }]);
      if (!textToSend) setTextInput('');
      setStatusMessage(`Sent query: "${query}"`);
    } else {
      setErrorMessage('Voice session is not active. Click Start Session below.');
    }
  };

  // Close modal cleanup
  useEffect(() => {
    if (!isOpen) {
      stopSession();
    }
  }, [isOpen, stopSession]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded-xl flex items-center justify-center">
              <Radio className="w-5 h-5 animate-pulse text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Gemini Live Voice Legal Advisor
                </h3>
                <span className="text-[10px] font-extrabold bg-blue-900 text-blue-300 border border-blue-600/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  gemini-3.1-flash-live-preview
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time voice conversation powered by Gemini Live API • CA Amar Nath Singla
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSession();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Status & Visualizer Area */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-inner">
            <div className="relative inline-flex items-center justify-center">
              {/* Outer Pulse Circles */}
              {isConnected && (
                <>
                  <span className="absolute w-28 h-28 rounded-full bg-blue-500/20 animate-ping"></span>
                  <span className="absolute w-20 h-20 rounded-full bg-blue-500/30 animate-pulse"></span>
                </>
              )}

              <div
                className={`relative z-10 p-5 rounded-full border-2 transition-all shadow-xl ${
                  isConnected
                    ? hasMicAccess
                      ? 'bg-blue-600 text-white border-blue-400 shadow-blue-500/50 scale-110'
                      : 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-500/50 scale-110'
                    : isConnecting
                    ? 'bg-amber-600 text-white border-amber-400 animate-pulse'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {isConnected ? (
                  hasMicAccess ? <Mic className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />
                ) : isConnecting ? (
                  <Sparkles className="w-8 h-8 animate-spin" />
                ) : (
                  <MicOff className="w-8 h-8" />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isConnected
                      ? 'bg-emerald-500 animate-pulse'
                      : isConnecting
                      ? 'bg-amber-500 animate-bounce'
                      : 'bg-slate-600'
                  }`}
                ></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {isConnected
                    ? hasMicAccess
                      ? 'Two-Way Live Voice Active'
                      : 'Live Voice Speaker Output Active'
                    : isConnecting
                    ? 'Connecting Live API...'
                    : 'Ready to Converse'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">{statusMessage}</p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {!isConnected ? (
                <>
                  <button
                    onClick={() => startSession(true)}
                    disabled={isConnecting}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Voice Session (Mic + Audio)</span>
                  </button>

                  <button
                    onClick={() => startSession(false)}
                    disabled={isConnecting}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>Voice Output Mode (No Mic)</span>
                  </button>
                </>
              ) : (
                <>
                  {hasMicAccess && (
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isMuted
                          ? 'bg-rose-950 border border-rose-700 text-rose-300'
                          : 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                      <span>{isMuted ? 'Mic Muted' : 'Mute Mic'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSpeakerMuted
                        ? 'bg-amber-950 border border-amber-700 text-amber-300'
                        : 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {isSpeakerMuted ? (
                      <VolumeX className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-blue-400" />
                    )}
                    <span>{isSpeakerMuted ? 'Speaker Muted' : 'Audio On'}</span>
                  </button>

                  <button
                    onClick={stopSession}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Session</span>
                  </button>
                </>
              )}
            </div>

            {/* Permission Denied / Error Alert Box */}
            {errorMessage && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-200 text-xs p-4 rounded-xl space-y-3 text-left">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-rose-100">{errorMessage}</p>
                    {permissionError && (
                      <p className="text-[11px] text-rose-300/90 leading-relaxed">
                        If running inside an embedded iframe or if microphone permission was previously blocked, you can either grant mic permission in your browser address bar settings or simply launch in a standalone tab.
                      </p>
                    )}
                  </div>
                </div>

                {permissionError && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-rose-900/60">
                    <button
                      onClick={() => startSession(false)}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Use Voice Output Mode (Listen & Type)</span>
                    </button>

                    <button
                      onClick={() => window.open(window.location.href, '_blank')}
                      className="bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in New Tab for Mic Access</span>
                    </button>

                    <button
                      onClick={() => startSession(true)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 border border-slate-700"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Try Mic Again</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick GST Voice Prompts */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Quick Voice Legal Prompts (Click to Ask & Hear Gemini Speak)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Explain Section 75(4) Natural Justice requirements',
                'How to challenge Section 74 Extended Limitation?',
                'What is the Suncraft Energy Supreme Court ruling on ITC?',
                'What are the landmark rulings on Section 169 service of notice?',
                'Explain Section 128A Amnesty Scheme 2024',
                'What is the Safari Retreats Supreme Court ruling on Section 17(5)(d)?',
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendText(prompt)}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 text-slate-200 text-xs text-left p-2.5 rounded-xl transition-all font-medium flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3 h-3 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Conversation Log / Transcripts */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-blue-400" />
              Live Conversation Feed
            </span>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-h-48 overflow-y-auto space-y-3 font-sans text-xs">
              {transcripts.length === 0 ? (
                <p className="text-slate-500 italic text-center py-4">
                  Conversation transcripts will appear here in real-time as you converse with the AI Legal Advisor.
                </p>
              ) : (
                transcripts.map((t, i) => (
                  <div
                    key={i}
                    className={`flex gap-2.5 ${
                      t.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        t.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/70 rounded-bl-none'
                      }`}
                    >
                      <div className="font-bold text-[10px] uppercase opacity-75 mb-1">
                        {t.sender === 'user' ? 'You' : 'CA Legal Voice AI'}
                      </div>
                      <p>{t.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Text Input fallback */}
          <div className="pt-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendText();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Ask any GST legal question (AI will speak the answer aloud)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!textInput.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950/80 px-6 py-3 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Consultancy by CA Amar Nath Singla (9810059721)</span>
          </div>
          <span>Powered by Google Gemini 3.1 Flash Live WebSockets</span>
        </div>
      </div>
    </div>
  );
};
