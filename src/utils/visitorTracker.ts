// Client-side Visitor Tracking Utility

export function getVisitorId(): string {
  const STORAGE_KEY = 'gst_visitor_unique_id';
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = `usr-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`;
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

export function detectDeviceAndBrowser(): {
  deviceType: 'Mobile' | 'Desktop' | 'Tablet';
  browserName: string;
  osName: string;
} {
  const ua = navigator.userAgent;
  let deviceType: 'Mobile' | 'Desktop' | 'Tablet' = 'Desktop';

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    deviceType = 'Mobile';
  }

  let browserName = 'Chrome';
  if (ua.indexOf('Firefox') > -1) browserName = 'Firefox';
  else if (ua.indexOf('SamsungBrowser') > -1) browserName = 'Samsung Internet';
  else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) browserName = 'Opera';
  else if (ua.indexOf('Trident') > -1) browserName = 'Internet Explorer';
  else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) browserName = 'Microsoft Edge';
  else if (ua.indexOf('Chrome') > -1) browserName = 'Google Chrome';
  else if (ua.indexOf('Safari') > -1) browserName = 'Apple Safari';

  let osName = 'Windows';
  if (ua.indexOf('Win') !== -1) osName = 'Windows';
  else if (ua.indexOf('Mac') !== -1) osName = 'macOS';
  else if (ua.indexOf('Linux') !== -1) osName = 'Linux';
  else if (ua.indexOf('Android') !== -1) osName = 'Android';
  else if (ua.indexOf('like Mac') !== -1) osName = 'iOS';

  return { deviceType, browserName, osName };
}

export async function trackActivity(
  page: string,
  actionType?: 'page_view' | 'search_analyzed' | 'judgement_copy' | 'reply_drafted' | 'upi_clicked' | 'voice_assistant',
  actionDetails?: string,
  section?: string
) {
  try {
    const visitorId = getVisitorId();
    const { deviceType, browserName, osName } = detectDeviceAndBrowser();

    await fetch('/api/visitor/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        page,
        actionType: actionType || 'page_view',
        actionDetails: actionDetails || `Visited ${page}`,
        section,
        deviceType,
        browserName,
        osName,
      }),
    });
  } catch (err) {
    // Fail silently in background
    console.debug('Tracking event:', err);
  }
}
