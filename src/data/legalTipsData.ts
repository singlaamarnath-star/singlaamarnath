export interface LegalTipItem {
  sectionKey: string; // e.g. '75(4)', '73', '74', '16(4)', '2A vs 3B Mismatch', '129', '83', '169', '54', '50', '29', '107', '67', '70', '86A', 'ALL'
  sectionTitle: string;
  category: 'Natural Justice' | 'ITC & Scrutiny' | 'Limitation & Fraud' | 'Transit & E-Way' | 'Recovery & Attachment' | 'Notices & Service' | 'Appeals & Refunds';
  statutoryRule: string;
  timeLimitOrLimitation: string;
  burdenOfProof: string;
  keyMaximsAndDoctrines: string[];
  mandatoryCirculars: { number: string; title: string; keyPoint: string }[];
  proceduralDefenses: string[];
  keyDraftingClause: string;
  landmarkPrecedents: { caseTitle: string; citation: string; court: string; ratio: string }[];
}

export const GST_LEGAL_TIPS: Record<string, LegalTipItem> = {
  '75(4)': {
    sectionKey: '75(4)',
    sectionTitle: 'Section 75(4) - Mandatory Personal Hearing & Speaking Order',
    category: 'Natural Justice',
    statutoryRule:
      'Section 75(4) of the CGST/SGST Act mandates that an opportunity of personal hearing MUST be granted where an adverse decision is contemplated against the taxable person, or where a written request is received from the taxpayer.',
    timeLimitOrLimitation:
      'Section 75(5) permits up to three adjournments upon showing sufficient cause. Order passed without hearing or on same day as hearing notice is void ab initio.',
    burdenOfProof:
      'Proper Officer must establish that real, effective, and reasonable notice of hearing (with functional VC link or accessible physical venue) was served with sufficient time.',
    keyMaximsAndDoctrines: [
      'Audi Alteram Partem (Hear the other side before deciding)',
      'Stereotype Rejection Barred: Stating mere "reply is unsatisfactory" without discussing evidence violates speaking order requirement',
      'No Demand Beyond SCN (Section 75(7)): Adjudication order cannot travel beyond allegations and grounds framed in DRC-01',
    ],
    mandatoryCirculars: [
      {
        number: 'CBIC Master Instruction',
        title: 'Virtual Hearing Facilities',
        keyPoint: 'Proper Officer must provide functional Video Conferencing link or fixed physical slot with minimum 7 days notice.',
      },
    ],
    proceduralDefenses: [
      'Personal hearing notice was not issued or checked as "No" in DRC-01 portal form.',
      'Hearing was scheduled with less than 24 hours notice or on a non-working holiday.',
      'Request for first adjournment due to sickness/accountant absence was arbitrarily rejected u/s 75(5).',
      'DRC-07 order simply recorded "reply not satisfactory" without analyzing reconciliation tables.',
    ],
    keyDraftingClause:
      'That the impugned DRC-07 order is void ab initio and violative of the principles of natural justice and Section 75(4) of the CGST Act, as no effective opportunity of personal hearing was afforded prior to confirming the adverse tax demand, as settled in Murli Finance Co. (2024 Del HC) and Graziano Trasmissioni.',
    landmarkPrecedents: [
      {
        caseTitle: 'Murli Finance Company v. Commissioner of GST',
        citation: '2024 (2) TMI 510 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Personal hearing is mandatory prior to adverse order even if not explicitly demanded in taxpayer reply.',
      },
      {
        caseTitle: 'Graziano Trasmissioni India Pvt. Ltd. v. State of Gujarat',
        citation: '2022 (6) TMI 1198 (Gujarat High Court)',
        court: 'Gujarat High Court',
        ratio: 'Opportunity of personal hearing is a mandatory statutory right under Section 75(4); violation renders order null and void.',
      },
      {
        caseTitle: 'Apex Enterprises v. Sales Tax Officer',
        citation: '2024 (3) TMI 780 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Dismissing taxpayer reply with a cryptic one-line remark "reply unsatisfactory" demonstrates non-application of mind.',
      },
    ],
  },

  '73': {
    sectionKey: '73',
    sectionTitle: 'Section 73 - Determination of Tax Not Involving Fraud / Suppression',
    category: 'Limitation & Fraud',
    statutoryRule:
      'Applicable for bonafide interpretation differences, clerical mismatches, and routine disallowances. SCN must be issued in Form DRC-01 allowing at least 30 days to reply under Section 73(8).',
    timeLimitOrLimitation:
      'Order under Section 73(9) must be passed within 3 years from due date of Annual Return (GSTR-9). SCN under Section 73(2) must be issued at least 3 months prior to this 3-year deadline.',
    burdenOfProof:
      'Initial burden lies on the Department to substantiate shortfall of tax or erroneous refund based on verified records, not portal automated red-flag alerts.',
    keyMaximsAndDoctrines: [
      'Section 128A Amnesty Benefit: Complete waiver of interest and penalty for FY 2017-18, 2018-19, and 2019-20 upon payment of full tax demand by 31.03.2025.',
      'Section 73(8) 30-Day Window: Taxpayer is entitled to full 30 days to file defense reply; premature orders are illegal.',
      'Proportionality: Penalty capped at 10% of tax or Rs. 10,000, whichever is higher under Section 73(9).',
    ],
    mandatoryCirculars: [
      {
        number: 'Circular No. 183/2022-GST',
        title: 'GSTR-2A vs GSTR-3B Mismatch Clarification',
        keyPoint: 'Verification through CA Certificate or Supplier Undertaking for FY 2017-18 & 2018-19.',
      },
      {
        number: 'Circular No. 193/2023-GST',
        title: 'Extension of Circular 183 to FY 2019-20',
        keyPoint: 'Applies verification mechanism for cumulative Rule 36(4) periods up to 31.12.2021.',
      },
    ],
    proceduralDefenses: [
      'Show Cause Notice issued beyond the statutory limitation period prescribed u/s 73(2) & 73(10).',
      'DRC-01 allowed less than the statutory 30 days period to file a detailed response.',
      'Case falls squarely under Section 128A Amnesty Scheme for waiver of interest and penalty.',
      'Dispute is a bonafide legal interpretation issue disclosed in GSTR-9 annual return.',
    ],
    keyDraftingClause:
      'That the proceedings initiated under Section 73 are barred by limitation under Section 73(10) of the CGST Act. Furthermore, the Noticee is entitled to statutory waiver of entire interest and penalty pursuant to Section 128A inserted via Finance (No. 2) Act 2024 for the period under dispute.',
    landmarkPrecedents: [
      {
        caseTitle: 'Gaurav Jain v. Joint Commissioner (Appeals-II)',
        citation: '2026 (7) TMI 890 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Proceedings initiated prior to 01.10.2025 follow earlier pre-deposit and limitation rules; prospective statutory application.',
      },
      {
        caseTitle: 'State of Punjab v. Bhatinda District Co-op Milk Producers',
        citation: '(2007) 11 SCC 363 (Supreme Court)',
        court: 'Supreme Court',
        ratio: 'Statutory limitation period is jurisdictional; proceedings initiated beyond limitation are void ab initio.',
      },
    ],
  },

  '74': {
    sectionKey: '74',
    sectionTitle: 'Section 74 - Extended 5-Year Limitation & Strict Fraud Standard',
    category: 'Limitation & Fraud',
    statutoryRule:
      'Can only be invoked when there is active fraud, wilful misstatement, or suppression of facts with deliberate intent to evade payment of tax. Routine disallowance cannot be framed under Section 74.',
    timeLimitOrLimitation:
      'Order under Section 74(9) must be passed within 5 years from due date of Annual Return. SCN under Section 74(2) must be issued at least 6 months prior to the 5-year expiry.',
    burdenOfProof:
      'Heavy and positive burden on the Department to establish "mens rea" (conscious dishonest state of mind). Mere non-payment or omission is not suppression.',
    keyMaximsAndDoctrines: [
      'Suppression requires positive act of concealment: Disclosures made in audited balance sheets, profit & loss, or GSTR-9 negate suppression.',
      'Cosmic Radio & Uniworth Rule: Mens rea cannot be inferred from mechanical template phrases without specific evidentiary documentation.',
      'Penalty Reduction u/s 74(8)/(11): 50% penalty if paid within 30 days of communication of the adjudication order.',
    ],
    mandatoryCirculars: [
      {
        number: 'CBIC Master Circular 1053/02/2017-CX',
        title: 'Standard of Proof for Extended Limitation',
        keyPoint: 'Department must show deliberate intent to evade; extended period cannot be invoked for bonafide belief or ambiguous notifications.',
      },
    ],
    proceduralDefenses: [
      'SCN fails to specify any overt act of fraud, wilful misstatement, or deliberate concealment.',
      'All turnover, ITC, and taxes were duly reflected in audited books and Form GSTR-9.',
      'Notice issued beyond 3-year Section 73 period by mechanically adding fraud boilerplate words.',
      'Issue involves substantial question of law / interpretation of taxability.',
    ],
    keyDraftingClause:
      'That the invocation of extended period of limitation under Section 74 is entirely without jurisdiction as the Noticee disclosed all material transactions in its audited books of account and GSTR-9 return. In the absence of positive mens rea to evade tax, Section 74 cannot be sustained, as held by the Hon’ble Supreme Court in Uniworth Textiles and Cosmic Dye Chemical.',
    landmarkPrecedents: [
      {
        caseTitle: 'Uniworth Textiles Ltd. v. Commissioner of Central Excise',
        citation: '2013 (288) ELT 161 (Supreme Court)',
        court: 'Supreme Court',
        ratio: 'Every non-payment or omission does not amount to wilful suppression; deliberate intent to evade must be affirmatively proved.',
      },
      {
        caseTitle: 'Cosmic Dye Chemical v. Collector of Central Excise',
        citation: '1995 (75) ELT 721 (Supreme Court)',
        court: 'Supreme Court',
        ratio: 'Mens rea is an essential ingredient to invoke extended period of limitation and 100% penalty.',
      },
      {
        caseTitle: 'Cube Construction Engineering Ltd. v. Commissioner of GST',
        citation: '2024 (4) TMI 680 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Where transactions were recorded in audited books and GSTR-9, suppression under Section 74 is legally unsustainable.',
      },
    ],
  },

  '16(4)': {
    sectionKey: '16(4)',
    sectionTitle: 'Section 16(4) / 16(5) / 16(6) - Time Bar for Availment of ITC',
    category: 'ITC & Scrutiny',
    statutoryRule:
      'Section 16(4) prescribes cut-off date for claiming ITC for an invoice. Finance (No. 2) Act 2024 inserted Section 16(5) & 16(6) with retrospective effect from 01.07.2017 relaxing ITC time limit up to 30th November 2021 for FY 2017-18, 2018-19, 2019-20, and 2020-21.',
    timeLimitOrLimitation:
      'Special Retrospective Cut-Off: 30th November 2021 for FY 17-18 through 20-21. For subsequent years: 30th November following end of financial year or annual return filing date.',
    burdenOfProof:
      'Taxpayer must demonstrate that GSTR-3B return claiming the credit was filed on or before 30.11.2021, or that credit was booked before the statutory cut-off.',
    keyMaximsAndDoctrines: [
      'Substantive Right vs Procedural Condition: Vested credit cannot be extinguished where delay was occasioned by portal non-functioning.',
      'Section 16(5) Retrospective Relief: All pending Section 73/74 proceedings for FY 17-18 to 20-21 on 16(4) time-bar are statutorily extinguished.',
      'Section 16(6) Revocation Benefit: Restores ITC for cases where registration was cancelled and later revoked.',
    ],
    mandatoryCirculars: [
      {
        number: 'Circular No. 237/31/2024-GST',
        title: 'Implementation of Section 16(5) & 16(6)',
        keyPoint: 'Pending show cause notices and appeals involving Section 16(4) disallowance for FY 17-18 to 20-21 to be dropped.',
      },
    ],
    proceduralDefenses: [
      'Availment of ITC is fully protected under newly inserted Section 16(5) of the CGST Act (Finance Act 2024).',
      'Return in Form GSTR-3B was filed on or before 30th November 2021 for the disputed FY.',
      'ITC was taken in financial ledgers within the year and reflected in audited financial statements.',
    ],
    keyDraftingClause:
      'That pursuant to the insertion of Section 16(5) in the CGST Act by the Finance (No. 2) Act 2024 with retrospective effect from 01.07.2017, the time-limit for availing ITC in Form GSTR-3B for FY 2017-18, 2018-19, 2019-20, and 2020-21 stands extended up to 30.11.2021, and hence the proposed disallowance is infructuous and liable to be dropped.',
    landmarkPrecedents: [
      {
        caseTitle: 'Safari Retreats Pvt. Ltd. v. Chief Commissioner of CGST',
        citation: '2024 (10) TMI 286 (Supreme Court)',
        court: 'Supreme Court',
        ratio: 'Interpretation of ITC provisions must promote business viability; purposive construction of credit provisions.',
      },
      {
        caseTitle: 'M.Trade Links v. Union of India',
        citation: '2024 (6) TMI 402 (Kerala High Court)',
        court: 'Kerala High Court',
        ratio: 'Section 16(4) time-limit upheld but procedural relaxations and retrospectivity must be applied to all open proceedings.',
      },
    ],
  },

  '2A vs 3B Mismatch': {
    sectionKey: '2A vs 3B Mismatch',
    sectionTitle: 'Section 16(2)(c) / 2A vs 3B - Purchasing Dealer Rights & Vendor Default',
    category: 'ITC & Scrutiny',
    statutoryRule:
      'Department cannot deny ITC to a bona fide purchasing dealer merely because the supplier failed to reflect invoice in GSTR-1 / GSTR-2A or defaulted in depositing tax, without first investigating and initiating recovery against the selling dealer.',
    timeLimitOrLimitation:
      'Circular No. 183/2022 applies to FY 2017-18 and 2018-19. Circular No. 193/2023 extends same principles up to 31.12.2021 prior to statutory introduction of GSTR-2B u/s 16(2)(aa).',
    burdenOfProof:
      'Purchasing dealer discharges initial burden by proving: (1) Valid Tax Invoice, (2) Proof of payment via banking channels (Section 16(2)(d)), (3) Physical movement proof (E-way bills, weighbridge slips, GR).',
    keyMaximsAndDoctrines: [
      'Lex Non Cogit Ad Impossibilia (The law does not compel a man to do that which he cannot possibly perform)',
      'Purchaser is not an insurer of supplier tax defaults (Arise India & On Quest Merchandising)',
      'Recovery must first be directed against the defaulting seller before penalizing the genuine buyer (Suncraft Energy & DY Beathel)',
    ],
    mandatoryCirculars: [
      {
        number: 'Circular No. 183/2022-GST',
        title: 'Mismatch between GSTR-2A & GSTR-3B',
        keyPoint: 'Discrepancies up to Rs. 5 Lakhs resolved via Supplier Certificate; above Rs. 5 Lakhs via CA Certificate with UDIN.',
      },
      {
        number: 'Circular No. 193/2023-GST',
        title: 'Extension of Circular 183 Guidelines',
        keyPoint: 'Clarifies that genuine verification procedure applies for all periods from 01.04.2019 to 31.12.2021.',
      },
    ],
    proceduralDefenses: [
      'Noticee paid full invoice value plus applicable GST through account payee banking channels.',
      'Proper Officer made zero effort or inquiry to trace or recover tax from the defaulting selling dealer.',
      'Noticee possesses valid e-way bills, transport bilties, and goods inward delivery challans.',
      'Furnished CA Certificate / Supplier Undertaking with UDIN as per CBIC Circular 183/2022.',
    ],
    keyDraftingClause:
      'That the Noticee is a bona fide purchaser who paid the full consideration along with GST via banking channels. As held by the Calcutta High Court in Suncraft Energy (affirmed by Supreme Court in SLP 27827/2023) and Delhi High Court in Arise India, the Department cannot reverse ITC of a genuine buyer without first initiating recovery proceedings against the defaulting supplier.',
    landmarkPrecedents: [
      {
        caseTitle: 'Suncraft Energy Pvt. Ltd. v. Assistant Commissioner',
        citation: '2023 (8) TMI 174 (Calcutta HC) | SLP Dismissed by Supreme Court',
        court: 'Calcutta High Court / Supreme Court',
        ratio: 'Denial of ITC to buyer without exhausting recovery against the supplier is unsustainable.',
      },
      {
        caseTitle: 'Arise India Limited v. Commissioner of Trade and Taxes',
        citation: '2017 (10) TMI 1020 (Delhi HC) | SLP Dismissed (2018)',
        court: 'Delhi High Court / Supreme Court',
        ratio: 'Purchasing dealer cannot be penalized for subsequent tax default of registered vendor.',
      },
      {
        caseTitle: 'D.Y. Beathel Enterprises v. State Tax Officer',
        citation: '2021 (3) TMI 1020 (Madras High Court)',
        court: 'Madras High Court',
        ratio: 'Omission of supplier to pay tax must be investigated; buyer cannot be summoned without examining seller.',
      },
    ],
  },

  '129': {
    sectionKey: '129',
    sectionTitle: 'Section 129 / 130 - E-Way Bill Detention & Transit Interception',
    category: 'Transit & E-Way',
    statutoryRule:
      'Section 129 provides for detention, seizure, and release of goods and conveyances in transit. Section 130 provides for confiscation ONLY upon proof of deliberate intent to evade payment of tax.',
    timeLimitOrLimitation:
      'Detention order in Form GST MOV-06 must be issued immediately upon interception. Notice in Form GST MOV-07 within 7 days, and order in MOV-09 within 7 days of service of notice.',
    burdenOfProof:
      'Proper Officer must establish active mens rea or intention to evade tax. Minor clerical typos do not justify Section 129 penalty.',
    keyMaximsAndDoctrines: [
      'Circular 64/38/2018 Protection: Minor clerical typos (1-2 digits in vehicle number, PIN code typo, minor consignment address spelling) attract only Rs. 500+500 general penalty u/s 125.',
      'Bona fide Vehicle Breakdown: Mechanical breakdown leading to e-way bill expiry without evasion intent does not attract 200% penalty.',
      'Proportionality: Confiscation u/s 130 cannot be invoked straightaway for minor procedural infractions.',
    ],
    mandatoryCirculars: [
      {
        number: 'Circular No. 64/38/2018-GST',
        title: 'Modification of Procedure for E-Way Bill Errors',
        keyPoint: 'Mandates nominal Rs. 1000 penalty under Section 125 for 6 specific minor clerical mistakes.',
      },
      {
        number: 'Circular No. 41/15/2018-GST',
        title: 'Standard Operating Procedure for Interception',
        keyPoint: 'Physical verification report in Part B of MOV-04 must be completed within 3 working days.',
      },
    ],
    proceduralDefenses: [
      'Goods were accompanied by valid tax invoice and bill of entry matching physical stock exactly.',
      'Defect is a minor clerical error covered under CBIC Circular 64/38/2018.',
      'E-way bill expired during transit due to documented truck engine breakdown / road blockage.',
      'Proper Officer failed to issue MOV-07 notice within the mandatory statutory period of 7 days.',
    ],
    keyDraftingClause:
      'That the consignment was accompanied by a genuine tax invoice, e-way bill, and transport bilty with no discrepancy in quantity or value. The minor clerical error in the vehicle number is squarely protected under CBIC Circular No. 64/38/2018-GST, and as held in Taneja Overseas (2024 Del HC), imposition of 200% penalty u/s 129 without intent to evade is disproportionate and illegal.',
    landmarkPrecedents: [
      {
        caseTitle: 'Taneja Overseas v. Commissioner of GST Delhi North',
        citation: '2024 (1) TMI 890 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'E-way bill expiry during transit due to genuine vehicle breakdown without evasion intent does not attract Section 129 penalty.',
      },
      {
        caseTitle: 'Assistant Commissioner (ST) v. Satyam Shivam Papers Pvt. Ltd.',
        citation: '2022 (1) TMI 952 (Supreme Court)',
        court: 'Supreme Court',
        ratio: 'Detaining vehicle for technical e-way bill delay caused by traffic jam without evasion intent attracts exemplary costs on officer.',
      },
    ],
  },

  '83': {
    sectionKey: '83',
    sectionTitle: 'Section 83 - Provisional Attachment of Bank Accounts & Property',
    category: 'Recovery & Attachment',
    statutoryRule:
      'Section 83 empowers Commissioner to provisionally attach property, including bank accounts, only during pendency of proceedings under Section 62, 63, 64, 67, 73, or 74, to protect revenue interest.',
    timeLimitOrLimitation:
      'Mandatory Sunset Clause: Under Section 83(2), every provisional attachment automatically ceases to have effect on expiry of one year from the date of the order.',
    burdenOfProof:
      'Commissioner must form an independent opinion based on tangible, credible, and objective material on record showing imminent danger of taxpayer dissipating assets.',
    keyMaximsAndDoctrines: [
      'Draconian Power: Cannot be used as a routine arm-twisting or recovery tool before adjudication (Radha Krishan Industries SC).',
      'No Attachment of Running Credit Facilities: Cash Credit (CC) and Overdraft (OD) limit accounts are bank advances and cannot be attached.',
      'Director Personal Accounts: Personal bank accounts of directors cannot be attached for company tax proceedings without lifting corporate veil.',
    ],
    mandatoryCirculars: [
      {
        number: 'CBIC Guidelines No. 05/2021',
        title: 'Guidelines for Provisional Attachment under Section 83',
        keyPoint: 'Emphasizes formation of opinion based on objective material and immediate disposal of objections within 7 days.',
      },
    ],
    proceduralDefenses: [
      'Attachment order has completed 12 months and has lapsed by operation of Section 83(2).',
      'Account attached is a Cash Credit / Working Capital facility essential to pay staff salaries.',
      'No tangible material on record demonstrating that taxpayer was planning to flee or dispose of assets.',
      'Objections filed in Form GST DRC-22A were not adjudicated or afforded personal hearing.',
    ],
    keyDraftingClause:
      'That the provisional attachment of the operational bank account is contrary to the landmark guidelines laid down by the Hon’ble Supreme Court in Radha Krishan Industries v. State of HP, as no objective material exists to justify invoking this draconian power. Furthermore, the attachment has expired by operation of the one-year sunset clause in Section 83(2).',
    landmarkPrecedents: [
      {
        caseTitle: 'Radha Krishan Industries v. State of Himachal Pradesh',
        citation: '2021 (4) TMI 837 (Supreme Court)',
        court: 'Supreme Court',
        ratio: 'Provisional attachment is a draconian power requiring tangible material; cannot be used to paralyze running business.',
      },
      {
        caseTitle: 'Proex Fashion Pvt. Ltd. v. Government of NCT of Delhi',
        citation: '2021 (1) TMI 250 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Attachment of Cash Credit (CC) or Overdraft (OD) bank account is ultra vires Section 83.',
      },
      {
        caseTitle: 'Santosh Kumar Gupta v. Union of India',
        citation: '2023 (10) TMI 410 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Section 83(2) contains an express sunset clause of one year; bank freeze automatically lapses upon 12 months.',
      },
    ],
  },

  '169': {
    sectionKey: '169',
    sectionTitle: 'Section 169 - Service of Show Cause Notices & Portal Notifications',
    category: 'Notices & Service',
    statutoryRule:
      'Section 169 prescribes the legal modes for service of notices. Electronic transmission under Section 169(1)(c) requires notice to be communicated to the registered email address or visible dashboard of the taxpayer.',
    timeLimitOrLimitation:
      'Service is deemed complete only when notice is accessible. Uploading in obscure portal sub-menus without transmitting email/SMS alerts deprives taxpayer of natural justice.',
    burdenOfProof:
      'Department must establish proof of delivery (RPAD acknowledgment, email delivery receipt, or SMS dispatch logs).',
    keyMaximsAndDoctrines: [
      'Hidden Tab Defect: Uploading DRC-01 solely under "View Additional Notices and Orders" without email/SMS alert does not constitute valid service.',
      'Prejudice Rule: Failure to serve notice causes grave prejudice, rendering ex-parte orders vulnerable to writ remands.',
      'Substituted Service: Affixing notice under Section 169(1)(d) can only be resorted to after primary modes are exhausted.',
    ],
    mandatoryCirculars: [
      {
        number: 'CBIC Advisory on Portal Notices',
        title: 'Integration of Additional Notices Tab',
        keyPoint: 'System mandated automated email alerts to prevent taxpayer missing notices in sub-menus.',
      },
    ],
    proceduralDefenses: [
      'Show Cause Notice was placed solely in "Additional Notices" sub-menu with zero email or SMS communication.',
      'Notice was dispatched to an obsolete email address updated before GST cancellation.',
      'Ex-parte assessment order was passed without physical service or tender to authorized representative.',
    ],
    keyDraftingClause:
      'That the impugned ex-parte assessment order was passed without valid service of DRC-01, as the SCN was uploaded solely under the obscure "View Additional Notices and Orders" tab without any email or SMS alert, in gross violation of Section 169 of the CGST Act and the law laid down in Sabharwal Enterprises (2024 Del HC) and Murugesan Jayalakshmi (2024 Mad HC).',
    landmarkPrecedents: [
      {
        caseTitle: 'Sabharwal Enterprises v. Sales Tax Officer',
        citation: '2024 (2) TMI 980 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Notices uploaded solely under Additional Notices tab without email/SMS alert do not constitute effective service under Section 169.',
      },
      {
        caseTitle: 'Murugesan Jayalakshmi v. State Tax Officer',
        citation: '2024 (3) TMI 412 (Madras High Court)',
        court: 'Madras High Court',
        ratio: 'Ex-parte assessment order set aside and remitted where SCN was hidden in portal sub-menu without email intimation.',
      },
    ],
  },

  '29': {
    sectionKey: '29',
    sectionTitle: 'Section 29 - Cancellation & Retrospective Cancellation of GSTIN',
    category: 'ITC & Scrutiny',
    statutoryRule:
      'Proper Officer may cancel registration from such date, including any retrospective date, as he may deem fit, but ONLY upon recording objective reasons and giving prior notice of such retrospective intent.',
    timeLimitOrLimitation:
      'Taxpayer may apply for revocation under Section 30 / Rule 23. High Courts consistently condone delay in filing revocation upon payment of tax dues (Mohanty Enterprises).',
    burdenOfProof:
      'Department must establish why retrospective cancellation is necessary rather than prospective cancellation from date of business closure.',
    keyMaximsAndDoctrines: [
      'Retrospective cancellation cannot be done with a mechanical stroke of pen (Best Crop Science LLP).',
      'SCN must specifically state proposed retrospective date, failing which retrospective order is invalid (Balaji Enterprises).',
      'Protection of Genuine Buyers: Retrospective cancellation cannot be used to penalize innocent purchasers who availed credit when GSTIN was active.',
    ],
    mandatoryCirculars: [
      {
        number: 'Circular No. 191/03/2023-GST',
        title: 'Revocation of Cancellation of Registration',
        keyPoint: 'Standard procedure for processing pending revocation applications.',
      },
    ],
    proceduralDefenses: [
      'SCN for cancellation did not specify that retrospective cancellation was intended.',
      'Business was closed on a specific date, but registration was cancelled retrospectively from inception.',
      'Premises was temporarily locked during surprise visit, which was misconstrued as non-existence.',
      'Taxpayer is ready to deposit all arrears and seeks restoration for business livelihood under Article 19(1)(g).',
    ],
    keyDraftingClause:
      'That the retrospective cancellation of the GST registration is arbitrary and contrary to the Delhi High Court ruling in Best Crop Science LLP and Balaji Enterprises, as the SCN failed to provide reasons for retrospective effect. The cancellation ought to be made prospective from the date of business closure.',
    landmarkPrecedents: [
      {
        caseTitle: 'Best Crop Science LLP v. Principal Commissioner of CGST',
        citation: '2024 (2) TMI 310 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'GST registration cannot be cancelled retrospectively with a mechanical stroke of pen without recorded objective satisfaction.',
      },
      {
        caseTitle: 'Mohanty Enterprises v. Commissioner of CT & GST',
        citation: '2024 (5) TMI 890 (Orissa High Court)',
        court: 'Orissa High Court',
        ratio: 'Delay in filing revocation of cancellation application condoned on condition of payment of admitted tax dues.',
      },
    ],
  },

  '54': {
    sectionKey: '54',
    sectionTitle: 'Section 54 / 56 - GST Refunds & Inverted Duty Structure',
    category: 'Appeals & Refunds',
    statutoryRule:
      'Taxpayer is entitled to refund of unutilized ITC on zero-rated supplies (exports) or inverted duty structure under Section 54(3). Refund must be sanctioned within 60 days of application.',
    timeLimitOrLimitation:
      'Section 54(1) requires refund application within 2 years from relevant date. Section 56 mandates payment of 6% interest if refund not sanctioned within 60 days.',
    burdenOfProof:
      'Applicant must show receipt of foreign convertible exchange (FIRC/BRC) for export of services or proof of higher input tax rates for inverted duty.',
    keyMaximsAndDoctrines: [
      'Intermediary Label Barred: Professional BPO/consulting on principal-to-principal basis is zero-rated export, not intermediary service (Ernst & Young).',
      'VKC Footwear Rule: Formula in Rule 89(5) applies for refund of input goods in inverted duty structure.',
      'Mandatory Interest u/s 56: Statutory interest of 6% is automatic upon 60 days delay (Orient Craft).',
    ],
    mandatoryCirculars: [
      {
        number: 'Circular No. 125/44/2019-GST',
        title: 'Master Circular on GST Refunds',
        keyPoint: 'Comprehensive guidelines on electronic refund processing and deficiency memo timelines.',
      },
      {
        number: 'Circular No. 161/17/2021-GST',
        title: 'Clarification on Intermediary Services',
        keyPoint: 'Sub-contracted back-office or IT software development does not fall under intermediary category.',
      },
    ],
    proceduralDefenses: [
      'Services rendered directly to foreign client on principal-to-principal basis (eligible export u/s 2(6) IGST).',
      'Deficiency memo in RFD-03 issued after the statutory 15 days period is invalid.',
      'Department failed to pay mandatory 6% interest under Section 56 despite 6 months delay in sanction.',
    ],
    keyDraftingClause:
      'That the rejection of export refund under Section 54 by labelling the service as "intermediary" under Section 2(13) of IGST Act is contrary to the Delhi High Court ruling in Ernst & Young LLP and McFadyen Digital LLC, as the Noticee rendered professional services directly on its own account.',
    landmarkPrecedents: [
      {
        caseTitle: 'Ernst & Young LLP v. Additional Commissioner CGST',
        citation: '2023 (3) TMI 1117 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Professional services to overseas clients qualify as zero-rated export of services and not intermediary services.',
      },
      {
        caseTitle: 'Orient Craft Ltd. v. Union of India',
        citation: '2024 (6) TMI 215 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Statutory 6% interest under Section 56 is mandatory and automatic once 60-day refund sanction window is breached.',
      },
    ],
  },

  '50': {
    sectionKey: '50',
    sectionTitle: 'Section 50 - Interest on Delayed Payment & Net Cash Liability',
    category: 'ITC & Scrutiny',
    statutoryRule:
      'Section 50(1) proviso mandates interest only on the net tax paid through Electronic Cash Ledger. Section 50(3) restricts interest on wrongly availed ITC strictly to cases where credit was both wrongly availed AND utilised.',
    timeLimitOrLimitation:
      'Interest rate: 18% per annum under Section 50(1). Retrospective amendment from 01.07.2017 applies net cash rule for all past periods.',
    burdenOfProof:
      'Department must prove actual debit/utilization of input tax credit to set off output tax liability before demanding interest u/s 50(3).',
    keyMaximsAndDoctrines: [
      'Net Cash Liability Proviso: No interest on tax discharged by debiting accumulated Electronic Credit Ledger.',
      'Availed and Utilised Test: Unutilized credit lying idle in credit ledger causes no revenue loss; interest is not leviable (Tata Projects & Pratibha Processors).',
    ],
    mandatoryCirculars: [
      {
        number: 'Circular No. 192/04/2023-GST',
        title: 'Interest on Wrongly Availed & Utilised ITC',
        keyPoint: 'Clarifies that balance in credit ledger is determined on the date of utilization when minimum balance dips.',
      },
    ],
    proceduralDefenses: [
      'Interest is wrongly computed on gross tax liability instead of net cash liability.',
      'Disputed ITC remained unutilised in the Electronic Credit Ledger with closing balance always higher than disputed amount.',
      'Interest demanded exceeds the statutory 18% cap.',
    ],
    keyDraftingClause:
      'That pursuant to the retrospective proviso to Section 50(1) and amended Section 50(3) of the CGST Act, interest is leviable only on the net cash liability and on ITC that is both wrongly availed and utilised. As the Noticee had continuous surplus balance in its credit ledger, no interest is payable, as held in Schneider Electric and Tata Projects.',
    landmarkPrecedents: [
      {
        caseTitle: 'Schneider Electric India Pvt. Ltd. v. Commissioner of CGST',
        citation: '2024 (3) TMI 215 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Interest under Section 50(1) proviso can only be levied on net cash liability paid via Electronic Cash Ledger.',
      },
      {
        caseTitle: 'Tata Projects Ltd. v. Commissioner of Central Tax',
        citation: '2024 (5) TMI 710 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Interest under Section 50(3) on wrongly availed ITC is leviable only when such credit has been both wrongly availed and utilised.',
      },
    ],
  },

  '107': {
    sectionKey: '107',
    sectionTitle: 'Section 107 - Statutory Appeals & Mandatory Pre-Deposit',
    category: 'Appeals & Refunds',
    statutoryRule:
      'Any person aggrieved by an adjudication order may appeal to the Appellate Authority within 3 months (extendable by 1 month upon sufficient cause). Filing appeal with 10% pre-deposit stays remaining 90% recovery automatically under Section 107(7).',
    timeLimitOrLimitation:
      '3 months from date of order + 1 month condonable period under Section 107(4). Pre-deposit: 10% of disputed tax amount (max Rs. 25 Cr CGST / Rs. 25 Cr SGST).',
    burdenOfProof:
      'Appellant must show proof of electronic debit of pre-deposit amount in Form GST APL-01 / DRC-03.',
    keyMaximsAndDoctrines: [
      'Automatic Stay: Payment of 10% pre-deposit stays the entire balance 90% recovery; bank attachment must be lifted immediately.',
      'Form GST APL-02 Deficiency Memo: Appellate Authority cannot dismiss appeal on technical defects without issuing deficiency memo to cure.',
      'Gaurav Jain (2026 Del HC): Appeals from pre-01.10.2025 proceedings follow earlier pre-deposit rules.',
    ],
    mandatoryCirculars: [
      {
        number: 'CBIC Circular No. 157/13/2021-GST',
        title: 'Exclusion of Limitation Period for Appeals',
        keyPoint: 'Appeals cannot be rejected on technicalities where portal glitched during upload.',
      },
    ],
    proceduralDefenses: [
      'Pre-deposit of 10% was duly discharged and recovery of balance demand is statutorily stayed under Section 107(7).',
      'Appellate Authority dismissed appeal without issuing Form GST APL-02 deficiency notice.',
      'Delay in filing appeal was within the condonable period of 30 days under Section 107(4) with valid medical grounds.',
    ],
    keyDraftingClause:
      'That the Appellant has deposited the requisite 10% pre-deposit as prescribed under Section 107(6) of the CGST Act. In terms of Section 107(7), recovery proceedings for the remaining 90% balance stand automatically stayed, and any consequential bank attachment or garnishee proceedings under Section 79 are illegal and liable to be withdrawn.',
    landmarkPrecedents: [
      {
        caseTitle: 'Gaurav Jain v. Joint Commissioner (Appeals-II)',
        citation: '2026 (7) TMI 890 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Pre-deposit requirement for appeals arising from SCNs issued before 01.10.2025 is governed by unamended provisions; physical appeals must be accepted if portal blocks.',
      },
      {
        caseTitle: 'A.B. Infrabuild Pvt. Ltd. v. Commissioner (Appeals)',
        citation: '2024 (4) TMI 750 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Appellate Authority cannot dismiss appeal in limine without issuing Form GST APL-02 deficiency memo with opportunity to cure.',
      },
    ],
  },

  '67': {
    sectionKey: '67',
    sectionTitle: 'Section 67 / 70 - Search, Inspection, Seizure & Summons Safeguards',
    category: 'Recovery & Attachment',
    statutoryRule:
      'Search under Section 67 requires "reasons to believe" in writing by officer of Joint Commissioner rank. Summons under Section 70 are deemed judicial proceedings for inquiry.',
    timeLimitOrLimitation:
      'Seized documents must be returned within 30 days if not relied upon. SCN must be issued within 6 months of seizure of goods, extendable by 6 months under Section 67(7).',
    burdenOfProof:
      'Department must record reasons to believe on file prior to search authorization in Form GST INS-01.',
    keyMaximsAndDoctrines: [
      'No Coerced DRC-03 Deposit (CBIC Instruction 01/2022-23): Officers cannot force tax payment during search/midnight raids; coerced deposits must be refunded with interest.',
      'Summons Restraint: Top management (MD, CEO, CFO) cannot be summoned routinely when authorized representatives have submitted books.',
      'Presence of Advocate: Interrogation may be permitted within visible (non-audible) distance of counsel.',
    ],
    mandatoryCirculars: [
      {
        number: 'CBIC Instruction No. 01/2022-23 (GST-Investigation)',
        title: 'Deposit of Tax During Search / Inspection',
        keyPoint: 'Strictly prohibits officers from forcing taxpayers to make tax deposits during search or investigation.',
      },
      {
        number: 'CBIC Instruction No. 03/2022-23',
        title: 'Guidelines for Issuance of Summons u/s 70',
        keyPoint: 'Summons to senior management must be issued only when personal presence is genuinely necessary with written approval of DC/JC.',
      },
    ],
    proceduralDefenses: [
      'DRC-03 deposit was coerced during midnight search operation in violation of CBIC Instruction 01/2022-23.',
      'Summons issued repeatedly to Managing Director despite authorized representative furnishing all books of accounts.',
      'Inspection conducted without valid INS-01 authorization or recorded reasons to believe.',
    ],
    keyDraftingClause:
      'That the recovery of tax via Form DRC-03 during search operations was extracted under coercion and duress, in direct contravention of CBIC Instruction No. 01/2022-23 (GST-Investigation) and the Delhi High Court ruling in Kashish Impex and Bhumi Syndicate. The said amount is liable to be refunded with interest.',
    landmarkPrecedents: [
      {
        caseTitle: 'Kashish Impex Pvt. Ltd. v. Directorate General of GST Intelligence',
        citation: '2024 (3) TMI 890 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Forced cash recovery or DRC-03 deposits extracted during search under Section 67 is illegal; refund directed with interest.',
      },
      {
        caseTitle: 'Shyam Sunder v. Superintendent, CGST Anti-Evasion',
        citation: '2024 (5) TMI 612 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Summons power under Section 70 must be exercised with restraint; top management should not be summoned routinely for basic records.',
      },
    ],
  },

  '86A': {
    sectionKey: '86A',
    sectionTitle: 'Rule 86A - Blocking of Electronic Credit Ledger (ECL)',
    category: 'Recovery & Attachment',
    statutoryRule:
      'Commissioner or authorized officer not below Assistant Commissioner may block debit of amount from Electronic Credit Ledger if reasons exist to believe credit was fraudulently availed or ineligible.',
    timeLimitOrLimitation:
      'Mandatory Sunset Clause: Under Rule 86A(3), ledger blocking automatically ceases to have effect after expiry of ONE YEAR from the date of imposing such restriction.',
    burdenOfProof:
      'Officer must have recorded objective reasons to believe on file based on specific fraudulent invoices or non-existent suppliers.',
    keyMaximsAndDoctrines: [
      'No Negative Balance: Rule 86A only permits blocking credit currently available in the ledger; creating a negative balance or blocking future credits is illegal.',
      'Automatic Unblocking: Officer cannot continue credit freeze beyond 365 days without issuing a fresh reasoned order.',
    ],
    mandatoryCirculars: [
      {
        number: 'CBIC Guidelines on Rule 86A',
        title: 'Standard Operating Procedure for Credit Blocking',
        keyPoint: 'Requires specific reason recording and restricts blocking only to tainted credit value.',
      },
    ],
    proceduralDefenses: [
      'Electronic Credit Ledger has been blocked for more than 12 months in violation of Rule 86A(3).',
      'Officer inserted a negative balance in the credit ledger, which is ultra vires Rule 86A.',
      'No reasons to believe were recorded or communicated to the taxpayer.',
    ],
    keyDraftingClause:
      'That the blocking of the Electronic Credit Ledger under Rule 86A has exceeded the statutory period of one year prescribed under Rule 86A(3) and stands automatically unblocked. Furthermore, creating a negative balance in the credit ledger is ultra vires Rule 86A as held in Best Crop Science LLP and Shanti Enterprises.',
    landmarkPrecedents: [
      {
        caseTitle: 'Best Crop Science LLP v. Principal Commissioner of CGST',
        citation: '2023 (6) TMI 210 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Rule 86A ledger blocking cannot result in a negative balance; restricted strictly to available credit.',
      },
      {
        caseTitle: 'Shanti Enterprises v. Commissioner of DGST',
        citation: '2024 (1) TMI 780 (Delhi High Court)',
        court: 'Delhi High Court',
        ratio: 'Rule 86A credit blocking automatically lapses after one year under Rule 86A(3); continuation beyond 1 year is illegal.',
      },
    ],
  },
};

/**
 * Fallback / General Legal Tips for any GST Section
 */
export const DEFAULT_GENERAL_LEGAL_TIPS: LegalTipItem = {
  sectionKey: 'GENERAL',
  sectionTitle: 'General GST Statutory Principles & Defense Checklist',
  category: 'Natural Justice',
  statutoryRule:
    'All GST adjudication orders must comply with principles of natural justice (Audi Alteram Partem), speaking order mandates, and must not travel beyond the specific allegations framed in Form DRC-01.',
  timeLimitOrLimitation:
    'Strict statutory time-limits govern SCN issuance and order passing under Section 73 (3 years), Section 74 (5 years), Section 107 (3 months appeal), and Section 54 (2 years refund).',
  burdenOfProof:
    'Initial burden lies on the Department to establish tax liability with documentary evidence; for fraud / suppression (Section 74), Department must affirmatively prove conscious mens rea.',
  keyMaximsAndDoctrines: [
    'Audi Alteram Partem (No adverse order without personal hearing)',
    'Lex Non Cogit Ad Impossibilia (Law does not compel the impossible on genuine taxpayers)',
    'Speaking Order Mandate: Reasoned adjudication dealing with each taxpayer objection',
    'No Demand Beyond SCN: Order cannot confirm tax on grounds not raised in DRC-01',
  ],
  mandatoryCirculars: [
    {
      number: 'CBIC Master Circular 1053/02/2017-CX',
      title: 'Principles of Natural Justice in Indirect Taxes',
      keyPoint: 'Mandates minimum 3 personal hearing opportunities and reasoned speaking orders.',
    },
  ],
  proceduralDefenses: [
    'Verify if DRC-01 was formally issued with DIN (Document Identification Number).',
    'Check whether opportunity of personal hearing u/s 75(4) was granted.',
    'Examine if notice was served via valid mode u/s 169 (not hidden in portal tab).',
    'Confirm if demand is barred by statutory limitation.',
  ],
  keyDraftingClause:
    'That the impugned proceedings suffer from incurable procedural defects, breach of principles of natural justice, and non-application of mind, rendering the proposed demand unsustainable in law as settled by the Hon’ble Supreme Court and High Courts.',
  landmarkPrecedents: [
    {
      caseTitle: 'Union of India v. Kamlakshi Finance Corporation Ltd.',
      citation: '1991 (55) ELT 433 (Supreme Court)',
      court: 'Supreme Court',
      ratio: 'Judicial discipline mandates lower adjudicating authorities to strictly follow binding High Court and Supreme Court precedents.',
    },
    {
      caseTitle: 'Oryx Fisheries Pvt. Ltd. v. Union of India',
      citation: '2010 (260) ELT 180 (Supreme Court)',
      court: 'Supreme Court',
      ratio: 'Show cause notice must demonstrate an open mind; a predetermined mind vitiates the entire proceedings.',
    },
  ],
};

/**
 * Helper to resolve legal tips based on user section
 */
export function getLegalTipsForSection(section: string): LegalTipItem {
  if (!section) return DEFAULT_GENERAL_LEGAL_TIPS;

  const normalized = section.trim().toUpperCase();

  if (normalized.includes('75') || normalized.includes('HEARING') || normalized.includes('NATURAL JUSTICE')) {
    return GST_LEGAL_TIPS['75(4)'];
  }
  if (normalized.includes('74') || normalized.includes('FRAUD') || normalized.includes('SUPPRESSION')) {
    return GST_LEGAL_TIPS['74'];
  }
  if (normalized.includes('73') || normalized.includes('128A') || normalized.includes('AMNESTY')) {
    return GST_LEGAL_TIPS['73'];
  }
  if (normalized.includes('16(4)') || normalized.includes('16(5)') || normalized.includes('16(6)')) {
    return GST_LEGAL_TIPS['16(4)'];
  }
  if (
    normalized.includes('2A') ||
    normalized.includes('3B') ||
    normalized.includes('SUNCRAFT') ||
    normalized.includes('ARISE') ||
    normalized.includes('VENDOR') ||
    normalized.includes('16(2)')
  ) {
    return GST_LEGAL_TIPS['2A vs 3B Mismatch'];
  }
  if (normalized.includes('129') || normalized.includes('130') || normalized.includes('E-WAY') || normalized.includes('TRANSIT')) {
    return GST_LEGAL_TIPS['129'];
  }
  if (normalized.includes('83') || normalized.includes('BANK') || normalized.includes('ATTACHMENT') || normalized.includes('RADHA KRISHAN')) {
    return GST_LEGAL_TIPS['83'];
  }
  if (normalized.includes('169') || normalized.includes('SERVICE') || normalized.includes('PORTAL') || normalized.includes('TAB')) {
    return GST_LEGAL_TIPS['169'];
  }
  if (normalized.includes('29') || normalized.includes('CANCEL') || normalized.includes('RETROSPECTIVE') || normalized.includes('REVOCATION')) {
    return GST_LEGAL_TIPS['29'];
  }
  if (normalized.includes('54') || normalized.includes('56') || normalized.includes('REFUND') || normalized.includes('EXPORT') || normalized.includes('INTERMEDIARY')) {
    return GST_LEGAL_TIPS['54'];
  }
  if (normalized.includes('50') || normalized.includes('INTEREST') || normalized.includes('NET CASH')) {
    return GST_LEGAL_TIPS['50'];
  }
  if (normalized.includes('107') || normalized.includes('APPEAL') || normalized.includes('PRE-DEPOSIT')) {
    return GST_LEGAL_TIPS['107'];
  }
  if (normalized.includes('67') || normalized.includes('70') || normalized.includes('SEARCH') || normalized.includes('SUMMONS')) {
    return GST_LEGAL_TIPS['67'];
  }
  if (normalized.includes('86A') || normalized.includes('LEDGER') || normalized.includes('BLOCK')) {
    return GST_LEGAL_TIPS['86A'];
  }

  // Direct key lookup
  if (GST_LEGAL_TIPS[section]) {
    return GST_LEGAL_TIPS[section];
  }

  return DEFAULT_GENERAL_LEGAL_TIPS;
}
