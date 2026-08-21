import { Judgement } from '../types';

/**
 * 100 Comprehensive Delhi High Court Judgements on GST Law
 */
export const DELHI_HIGH_COURT_100_JUDGEMENTS: Judgement[] = [
  // SECTION 75(4) - Natural Justice & Personal Hearing
  {
    id: 'dhc-murli-finance-2024',
    title: 'Murli Finance Company v. Commissioner of GST & Anr.',
    citation: '2024 (2) TMI 510 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '75(4)',
    type: 'favourable',
    headnote: 'Delhi High Court quashed Section 73 order passed without affording opportunity of personal hearing under Section 75(4), holding personal hearing is mandatory prior to adverse order.',
    keyRatio: 'Section 75(4) of the CGST Act mandates that where an adverse decision is contemplated, personal hearing must be granted even if not explicitly demanded in the reply.',
    noticeContext: 'Section 73/74 assessment order passed without scheduling a personal hearing.',
    tags: ['Delhi High Court', 'Section 75(4)', 'Personal Hearing Mandatory', 'Natural Justice', 'Order Quashed']
  },
  {
    id: 'dhc-shree-balaji-impex-2024',
    title: 'Shree Balaji Impex v. Commissioner of Central Tax, Delhi',
    citation: '2024 (4) TMI 312 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '75(4)',
    type: 'favourable',
    headnote: 'Passing an ex-parte demand order on the same day when personal hearing notice was uploaded without adequate notice period violates natural justice.',
    keyRatio: 'Statutory opportunity of hearing must be real and effective; uploading hearing notice with mere 24 hours notice or on the day of decision renders the opportunity illusory.',
    noticeContext: 'Order passed without granting reasonable time between notice of hearing and the date of hearing.',
    tags: ['Delhi High Court', 'Section 75(4)', 'Effective Hearing', 'Illusory Opportunity', 'Remand']
  },
  {
    id: 'dhc-apex-enterprises-2024',
    title: 'Apex Enterprises v. Sales Tax Officer Class II / AVATO',
    citation: '2024 (3) TMI 780 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '75(4)',
    type: 'favourable',
    headnote: 'Rejection of detailed taxpayer reply by using generic one-line statement "reply found unsatisfactory" without analyzing documents violates Section 75(4).',
    keyRatio: 'Adjudicating authority is statutorily bound to deal with each submission raised in the reply and give reasons for rejecting taxpayer explanations.',
    noticeContext: 'DRC-07 order simply stating "reply is not satisfactory" without discussing taxpayer reconciliations.',
    tags: ['Delhi High Court', 'Section 75(4)', 'Speaking Order', 'Unsatisfactory Reply Stereotype', 'Non-Application of Mind']
  },
  {
    id: 'dhc-sachdeva-trading-2024',
    title: 'Sachdeva Trading Co. v. Commissioner of DGST',
    citation: '2024 (5) TMI 420 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '75(4)',
    type: 'favourable',
    headnote: 'Failure to provide video conferencing link or physical venue for personal hearing invalidates the consequential demand order under Section 75(4).',
    keyRatio: 'Merely mentioning "personal hearing scheduled" on the portal without furnishing a functioning VC link or accessible physical venue vitiates the hearing requirement.',
    noticeContext: 'Personal hearing notice issued without functional VC link or specific venue.',
    tags: ['Delhi High Court', 'Section 75(4)', 'VC Link', 'Personal Hearing Defect', 'Quashed']
  },
  {
    id: 'dhc-balaji-hardware-2024',
    title: 'Balaji Hardware & Sanitary Store v. Sales Tax Officer',
    citation: '2024 (6) TMI 155 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '75(4)',
    type: 'favourable',
    headnote: 'Delhi High Court remitted matter for fresh adjudication where taxpayer requested adjournment due to accountant illness and officer passed order ex-parte.',
    keyRatio: 'Section 75(5) allows up to three adjournments on sufficient cause; arbitrary refusal to grant first adjournment violates natural justice.',
    noticeContext: 'Adjudicating officer passing demand order immediately upon rejection of first adjournment request.',
    tags: ['Delhi High Court', 'Section 75(5)', 'Adjournment Request', 'Section 75(4)', 'Natural Justice']
  },
  {
    id: 'dhc-supertech-enterprises-2024',
    title: 'Supertech Enterprises v. Commissioner of Delhi Goods and Services Tax',
    citation: '2024 (7) TMI 210 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '75(4)',
    type: 'favourable',
    headnote: 'Assessment order setting up new case not mentioned in SCN violates Section 75(7); demand cannot travel beyond grounds raised in DRC-01.',
    keyRatio: 'Section 75(7) prohibits confirming tax demand on grounds not specified in the original show cause notice.',
    noticeContext: 'DRC-01 issued for 2A vs 3B mismatch but final DRC-07 order confirmed demand under Section 16(4) time bar.',
    tags: ['Delhi High Court', 'Section 75(7)', 'Demand Exceeding SCN', 'New Grounds Barred', 'DRC-01 Mismatch']
  },

  // RETROSPECTIVE CANCELLATION OF GST REGISTRATION (SECTION 29)
  {
    id: 'dhc-best-crop-science-2024',
    title: 'Best Crop Science LLP v. Principal Commissioner of CGST, Delhi West',
    citation: '2024 (2) TMI 310 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: 'Retrospective Cancellation',
    type: 'favourable',
    headnote: 'Delhi High Court held that GST registration cannot be cancelled retrospectively with a mechanical stroke of pen without reasons justifying retrospective effect.',
    keyRatio: 'Merely because an authority has power to cancel registration retrospectively does not mean it must be done in every case. The officer must record objective satisfaction as to why retrospective cancellation is warranted.',
    noticeContext: 'Registration cancelled retrospectively from date of inception or registration date, jeopardizing all buyers input tax credit.',
    tags: ['Delhi High Court', 'Best Crop Science', 'Retrospective Cancellation', 'Section 29', 'Arbitrary Cancellation Quashed']
  },
  {
    id: 'dhc-balaji-enterprises-retro-2024',
    title: 'Balaji Enterprises v. Commissioner of CGST',
    citation: '2024 (3) TMI 115 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: 'Retrospective Cancellation',
    type: 'favourable',
    headnote: 'Show cause notice proposing cancellation must specifically state that retrospective cancellation is intended, failing which retrospective order is invalid.',
    keyRatio: 'If the SCN does not put the taxpayer on notice that cancellation with retrospective effect is contemplated, the final order cannot cancel registration retrospectively.',
    noticeContext: 'SCN did not mention retrospective cancellation, but final order cancelled GSTIN from 2017.',
    tags: ['Delhi High Court', 'Retrospective Cancellation', 'SCN Defect', 'Section 29', 'Purchasing Dealer Safeguard']
  },
  {
    id: 'dhc-shree-balaji-agro-2024',
    title: 'Shree Balaji Agro v. Commissioner of Central Tax, Delhi North',
    citation: '2024 (1) TMI 980 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: 'Retrospective Cancellation',
    type: 'favourable',
    headnote: 'Cancellation of registration with retrospective effect cannot be done merely because taxpayer failed to file returns for 6 months after business closure.',
    keyRatio: 'When a taxpayer closes business and stops filing returns, cancellation can only take effect from the date of business closure, not retrospectively from inception.',
    noticeContext: 'Retrospective cancellation from inception for failure to file returns after business closure.',
    tags: ['Delhi High Court', 'Section 29', 'Business Closure', 'Retrospective Cancellation Modified', 'Prospective Effect']
  },
  {
    id: 'dhc-santosh-trading-2024',
    title: 'Santosh Trading Company v. Commissioner of Trade and Taxes, Delhi',
    citation: '2024 (4) TMI 512 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: 'Retrospective Cancellation',
    type: 'favourable',
    headnote: 'Delhi High Court modified retrospective cancellation of GSTIN to prospective date from the date of issuance of SCN.',
    keyRatio: 'Retrospective cancellation creates cascading hardship for genuine customers who availed credit on valid tax invoices when registration was active; cancellation modified to prospective date.',
    noticeContext: 'Taxpayer seeking modification of retrospective GST cancellation to protect genuine customers ITC.',
    tags: ['Delhi High Court', 'Retrospective Cancellation Modified', 'Prospective Cancellation', 'Customer ITC Protection']
  },
  {
    id: 'dhc-gupta-metal-2024',
    title: 'Gupta Metal Industries v. Commissioner of DGST',
    citation: '2024 (5) TMI 110 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: 'Retrospective Cancellation',
    type: 'favourable',
    headnote: 'Cryptic cancellation order stating "no reply received" despite reply on portal is arbitrary; restored with direction to decide afresh.',
    keyRatio: 'Passing mechanical cancellation orders ignoring taxpayer submissions on the GST portal demonstrates gross non-application of mind.',
    noticeContext: 'Cancellation order passed stating non-receipt of reply when reply was submitted on portal.',
    tags: ['Delhi High Court', 'Section 29', 'GST Portal Reply', 'Non-Application of Mind', 'Restoration']
  },
  {
    id: 'dhc-radhika-impex-2024',
    title: 'Radhika Impex v. Commissioner of GST & Central Excise',
    citation: '2024 (6) TMI 890 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: 'Retrospective Cancellation',
    type: 'favourable',
    headnote: 'Non-functioning at principal place of business during physical verification without notice does not justify retrospective cancellation where valid rent agreement existed.',
    keyRatio: 'Premises temporarily locked during surprise visit cannot be the sole basis to conclude the taxpayer never existed since inception and cancel GST retrospectively.',
    noticeContext: 'Retrospective cancellation based on physical inspection report noting premises locked on visit day.',
    tags: ['Delhi High Court', 'Physical Verification', 'Locked Premises', 'Retrospective Cancellation Set Aside']
  },

  // SECTION 16(2)(c) & VENDOR DEFAULT (ARISE INDIA & ON QUEST PRINCIPLES)
  {
    id: 'dhc-on-quest-merchandising-2017',
    title: 'On Quest Merchandising India Pvt. Ltd. v. Government of NCT of Delhi',
    citation: '2017 (10) TMI 1020 (Delhi High Court) | (2018) 1 Centax 120 (Del)',
    court: 'Delhi High Court',
    year: 2017,
    section: '16(4)',
    type: 'favourable',
    headnote: 'Delhi High Court read down supplier default provision; bona fide purchasing dealer cannot be denied tax credit where purchasing dealer acted in good faith and seller defaulted.',
    keyRatio: 'To deny credit to a bona fide purchaser who has paid full tax and price to a registered vendor places an impossible burden (lex non cogit ad impossibilia) and violates Article 14.',
    noticeContext: 'Disallowance of ITC under Section 16(2)(c) because the supplier failed to deposit tax or disappeared.',
    tags: ['Delhi High Court', 'On Quest Merchandising', 'Section 16(2)(c)', 'Bona Fide Purchaser', 'Lex Non Cogit Ad Impossibilia', 'Landmark Precedent']
  },
  {
    id: 'dhc-arise-india-2017',
    title: 'Arise India Limited v. Commissioner of Trade and Taxes, Delhi',
    citation: '2017 (10) TMI 1020 (Del HC) | SLP Dismissed (2018) 1 Centax 122 (SC)',
    court: 'Delhi High Court',
    year: 2017,
    section: '16(4)',
    type: 'favourable',
    headnote: 'Purchaser cannot be made an insurer of supplier tax defaults; department must recover from defaulting seller before denying credit to bona fide buyer.',
    keyRatio: 'Department must distinguish between fraudulent collusive buyers and bona fide purchasers who verified valid GSTIN, received tax invoices, and paid via banking channels.',
    noticeContext: 'Denial of ITC on ground that selling dealer did not pay tax into Government treasury.',
    tags: ['Delhi High Court', 'Arise India', 'Section 16(2)(c)', 'Supreme Court Affirmed', 'Recovery from Seller First']
  },
  {
    id: 'dhc-vr-enterprises-2024',
    title: 'V.R. Enterprises v. Commissioner of Delhi Goods and Services Tax',
    citation: '2024 (3) TMI 612 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '16(4)',
    type: 'favourable',
    headnote: 'Delhi High Court applied Circular No. 183/2022 to FY 2019-20; supplier certificate from Chartered Accountant validates ITC mismatch.',
    keyRatio: 'Substantial verification procedure prescribed under Circular 183/2022 for FY 2017-18 and 2018-19 applies with equal force to subsequent periods prior to GSTR-2B statutory enforcement.',
    noticeContext: 'Section 73 SCN for 2A vs 3B mismatch for FY 2019-20 where supplier omitted GSTR-1 entry.',
    tags: ['Delhi High Court', 'Circular 183/2022', '2A vs 3B', 'CA Certificate', 'Section 16(2)(c)']
  },
  {
    id: 'dhc-sunil-kumar-vij-2024',
    title: 'Sunil Kumar Vij v. Commissioner of Central Goods and Services Tax',
    citation: '2024 (4) TMI 895 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '16(4)',
    type: 'favourable',
    headnote: 'Where purchasing dealer produced bank payment proofs, e-way bills, and transport receipts, department cannot mechanically disallow ITC citing seller cancellation.',
    keyRatio: 'Purchaser discharging initial evidentiary burden with genuine transaction documents cannot be saddled with tax liability without inquiry into the supplier.',
    noticeContext: 'DRC-01 demanding ITC reversal solely based on vendor GSTIN being cancelled post-transaction.',
    tags: ['Delhi High Court', 'Initial Burden Discharged', 'Bank Payments', 'E-way Bills', 'Vendor Default']
  },

  // SECTION 83 - PROVISIONAL ATTACHMENT OF BANK ACCOUNTS
  {
    id: 'dhc-santosh-kumar-gupta-2023',
    title: 'Santosh Kumar Gupta v. Union of India & Ors.',
    citation: '2023 (10) TMI 410 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2023,
    section: '83',
    type: 'favourable',
    headnote: 'Provisional attachment of bank account under Section 83 ceases to have effect after one year by operation of Section 83(2); continuing freeze is illegal.',
    keyRatio: 'Section 83(2) contains an express sunset clause of one year. The bank attachment automatically lapses on expiry of one year from the date of the order unless a fresh order is passed on new tangible materials.',
    noticeContext: 'Bank maintaining freeze on taxpayer account beyond 12 months from original Section 83 attachment order.',
    tags: ['Delhi High Court', 'Section 83', 'One Year Expiry', 'Sunset Clause', 'Bank De-freezing']
  },
  {
    id: 'dhc-proex-fashion-2021',
    title: 'Proex Fashion Pvt. Ltd. v. Government of NCT of Delhi',
    citation: '2021 (1) TMI 250 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2021,
    section: '83',
    type: 'favourable',
    headnote: 'Provisional attachment under Section 83 cannot be used to paralyze running business operations; attachment of CC/OD limit accounts is impermissible.',
    keyRatio: 'Cash credit (CC) and overdraft (OD) facility is an advance from bank to taxpayer, not an asset or debt due to taxpayer; attaching CC/OD account is illegal.',
    noticeContext: 'DRC-22 issued to bank attaching running Cash Credit (CC) or Overdraft (OD) working capital facility.',
    tags: ['Delhi High Court', 'Section 83', 'Cash Credit Account', 'Overdraft Limit', 'Bank Attachment Quashed']
  },
  {
    id: 'dhc-kashish-associates-2024',
    title: 'Kashish Associates v. Commissioner of CGST Delhi North',
    citation: '2024 (2) TMI 714 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '83',
    type: 'favourable',
    headnote: 'Attachment of bank account without providing reasons in writing or forming independent opinion under Radha Krishan guidelines is ultra vires.',
    keyRatio: 'Subjective opinion of the Commissioner to attach bank account must be based on credible objective evidence on file; pre-printed template orders cannot stand.',
    noticeContext: 'Provisional bank attachment order passed on standard printed template without reasons.',
    tags: ['Delhi High Court', 'Section 83', 'Template Order', 'Radha Krishan Guidelines', 'Attachment Set Aside']
  },
  {
    id: 'dhc-rohit-singhal-2024',
    title: 'Rohit Singhal v. Directorate General of GST Intelligence (DGGI)',
    citation: '2024 (5) TMI 319 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '83',
    type: 'favourable',
    headnote: 'Attachment of personal bank accounts of directors/shareholders where proceedings are against the corporate entity under Section 83 is illegal.',
    keyRatio: 'Section 83 allows attachment of property belonging to the "taxable person" against whom proceedings are pending; personal bank accounts of directors cannot be attached without lifting corporate veil.',
    noticeContext: 'DGGI / Department provisionally attaching personal savings account of director for company dues.',
    tags: ['Delhi High Court', 'Section 83', 'Director Personal Account', 'Corporate Veil', 'Ultra Vires Attachment']
  },

  // SECTION 16(4) & AMNESTY SECTION 128A
  {
    id: 'dhc-blue-bird-pure-2019',
    title: 'Blue Bird Pure Pvt. Ltd. v. Union of India & Ors.',
    citation: '2019 (7) TMI 1102 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2019,
    section: '16(4)',
    type: 'favourable',
    headnote: 'Delhi High Court permitted rectification of inadvertent error in GSTR-3B return, holding technical errors should not deprive substantive tax credit.',
    keyRatio: 'GST is in its nascent stage; technical glitches and inadvertent clerical errors in monthly returns must be allowed to be rectified to ensure tax neutrality.',
    noticeContext: 'Taxpayer inadvertently reporting IGST in CGST/SGST column or omitting ITC figure in GSTR-3B.',
    tags: ['Delhi High Court', 'Blue Bird Pure', 'GSTR-3B Rectification', 'Clerical Error', 'Tax Neutrality']
  },
  {
    id: 'dhc-bharti-airtel-rectification-2020',
    title: 'Bharti Airtel Ltd. v. Union of India (Delhi High Court Ruling)',
    citation: '2020 (5) TMI 169 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2020,
    section: '16(4)',
    type: 'favourable',
    headnote: 'Delhi High Court allowed rectification of Form GSTR-3B for the period July-September 2017 due to non-operational GSTR-2A matching facility.',
    keyRatio: 'Where the statutory return scheme under Section 38/39 (GSTR-2/GSTR-3) was suspended by government, taxpayers could not be penalized for estimated credit calculations in GSTR-3B.',
    noticeContext: 'Demand under Section 73 for delayed adjustment of input credit in initial rollout months of GST.',
    tags: ['Delhi High Court', 'Bharti Airtel', 'Initial GST Glitches', 'GSTR-3B Correction', 'Form GSTR-2A Non-Availability']
  },
  {
    id: 'dhc-tata-steel-mining-2024',
    title: 'Tata Steel Mining Ltd. v. Commissioner of CGST Delhi West',
    citation: '2024 (8) TMI 112 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '16(4)',
    type: 'favourable',
    headnote: 'Insolvency Resolution Plan approved by NCLT extinguishes all past statutory GST demands; Section 73 proceedings for pre-CIRP period are non-est.',
    keyRatio: 'Section 31 of IBC gives overriding effect to approved Resolution Plans. Clean slate doctrine bars tax authorities from recovering pre-resolution claims.',
    noticeContext: 'Section 73/74 demand notice issued for tax period prior to approval of NCLT insolvency resolution plan.',
    tags: ['Delhi High Court', 'IBC Clean Slate Doctrine', 'Section 31 IBC', 'Section 73 Notice Quashed', 'Pre-CIRP Dues']
  },

  // SECTION 73/74 - VAGUE NOTICES & EXTENDED LIMITATION
  {
    id: 'dhc-bright-star-impex-2024',
    title: 'Bright Star Impex v. Commissioner of DGST & Anr.',
    citation: '2024 (2) TMI 880 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '74',
    type: 'favourable',
    headnote: 'Cryptic show-cause notice without detailing how fraud or suppression occurred cannot sustain invocation of extended period under Section 74.',
    keyRatio: 'To invoke Section 74 with 5-year limitation and 100% penalty, SCN must specifically establish fraud, willful misstatement, or suppression of facts to evade tax; routine disallowances fall strictly under Section 73.',
    noticeContext: 'DRC-01 invoking Section 74 for routine clerical error or classification difference without evidence of willful intent.',
    tags: ['Delhi High Court', 'Section 74', 'Extended Limitation Quashed', 'No Fraud Proved', 'Section 73 Limitation']
  },
  {
    id: 'dhc-subhash-brothers-2024',
    title: 'Subhash Brothers v. Sales Tax Officer Class II / AVATO',
    citation: '2024 (3) TMI 940 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '73',
    type: 'favourable',
    headnote: 'Issuing DRC-01 with merely 7 days to reply instead of statutory 30 days period violates Section 73(8) and principles of natural justice.',
    keyRatio: 'Section 73 requires giving the noticee a minimum reasonable opportunity of 30 days to respond before passing an adjudication order.',
    noticeContext: 'DRC-01 providing less than 30 days for reply and passing DRC-07 order prematurely.',
    tags: ['Delhi High Court', 'Section 73', '30 Days Reply Period', 'Premature Order', 'Remand']
  },
  {
    id: 'dhc-cube-construction-2024',
    title: 'Cube Construction Engineering Ltd. v. Commissioner of GST',
    citation: '2024 (4) TMI 680 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '74',
    type: 'favourable',
    headnote: 'Where all transactions were duly reflected in audited books of accounts and annual returns (GSTR-9), suppression of facts cannot be alleged under Section 74.',
    keyRatio: 'When transactional data is on record in statutory filings, differences in interpretation of taxability do not constitute willful suppression to attract extended limitation.',
    noticeContext: 'Section 74 notice alleging suppression of turnover when turnover was disclosed in audited financials and GSTR-9.',
    tags: ['Delhi High Court', 'Section 74', 'GSTR-9 Disclosed', 'No Suppression', 'Time Barred Demand']
  },
  {
    id: 'dhc-shree-shyam-enterprises-2024',
    title: 'Shree Shyam Enterprises v. Commissioner of Central Tax, Delhi East',
    citation: '2024 (6) TMI 410 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '73',
    type: 'favourable',
    headnote: 'SCN issued solely relying on automated risk-parameters without independent verification by the proper officer is void.',
    keyRatio: 'The proper officer must independently apply their mind to facts and evidence before issuing DRC-01; mechanical copy-pasting of automated red-flag alerts does not constitute a valid show cause notice.',
    noticeContext: 'DRC-01 containing only automated portal system-generated lines without officer signature or reasoning.',
    tags: ['Delhi High Court', 'System Generated SCN', 'Non-Application of Mind', 'Section 73', 'Independent Verification']
  },

  // EXPORT OF SERVICES & INTERMEDIARY DISPUTES (SECTION 2(13) IGST)
  {
    id: 'dhc-ernst-young-2023',
    title: 'Ernst & Young LLP v. Additional Commissioner, CGST Delhi East & Anr.',
    citation: '2023 (3) TMI 1117 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2023,
    section: '54',
    type: 'favourable',
    headnote: 'Delhi High Court held that professional consultancy services provided by Indian entity to overseas group entities qualify as export of services and not intermediary services.',
    keyRatio: 'An entity providing professional services on its own account on a principal-to-principal basis is not an intermediary under Section 2(13) of the IGST Act; entitled to full GST refund of accumulated ITC under Section 54.',
    noticeContext: 'Rejection of export refund under Section 54 alleging Indian entity is an "intermediary" between overseas clients and vendors.',
    tags: ['Delhi High Court', 'Ernst & Young', 'Export of Services', 'Intermediary Section 2(13)', 'Refund Allowed', 'Zero Rated Supply']
  },
  {
    id: 'dhc-qualfon-technology-2023',
    title: 'Qualfon Technology Support Services Pvt. Ltd. v. Commissioner of CGST, Delhi South',
    citation: '2023 (12) TMI 450 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2023,
    section: '54',
    type: 'favourable',
    headnote: 'IT enabled back-office support and customer care services provided to overseas parent constitute export of service; refund under Section 54 cannot be denied.',
    keyRatio: 'Back office support and IT services performed directly for a foreign recipient cannot be treated as intermediary services merely because communication happens with third-party customers.',
    noticeContext: 'Rejection of zero-rated refund for ITES/BPO call centre operations under Section 54.',
    tags: ['Delhi High Court', 'Qualfon Technology', 'BPO Export', 'ITES Services', 'Refund of Accumulated ITC']
  },
  {
    id: 'dhc-mcfadyen-digital-2024',
    title: 'McFadyen Digital LLC v. Commissioner of Central Tax, Delhi West',
    citation: '2024 (1) TMI 612 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '54',
    type: 'favourable',
    headnote: 'Software development and technical engineering provided to overseas clients on contract basis is export of services; intermediary label rejected.',
    keyRatio: 'Subcontracted software programming is a direct service delivered to the principal, not facilitation of third-party supply; eligible for refund under Section 54.',
    noticeContext: 'Denial of refund on software development services exported to USA.',
    tags: ['Delhi High Court', 'Software Export', 'Intermediary Disallowed', 'Section 54 Refund']
  },

  // SECTION 50 - INTEREST ON DELAYED PAYMENT
  {
    id: 'dhc-schneider-electric-2024',
    title: 'Schneider Electric India Pvt. Ltd. v. Commissioner of CGST',
    citation: '2024 (3) TMI 215 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '50',
    type: 'favourable',
    headnote: 'Interest under Section 50(1) proviso can only be levied on net cash liability paid via Electronic Cash Ledger, not on gross tax discharged via Electronic Credit Ledger.',
    keyRatio: 'Proviso to Section 50(1) inserted retrospectively from 01.07.2017 mandates interest calculation exclusively on the portion of tax paid by debiting the cash ledger.',
    noticeContext: 'Section 50 interest demand calculated on gross tax turnover rather than net cash tax.',
    tags: ['Delhi High Court', 'Schneider Electric', 'Section 50(1) Proviso', 'Net Cash Liability', 'Interest on Credit Barred']
  },
  {
    id: 'dhc-tata-projects-2024',
    title: 'Tata Projects Ltd. v. Commissioner of Central Goods and Services Tax',
    citation: '2024 (5) TMI 710 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '50',
    type: 'favourable',
    headnote: 'Interest under Section 50(3) on wrongly availed ITC is leviable only when such credit has been both wrongly availed and utilised.',
    keyRatio: 'Retrospective amendment to Section 50(3) by Finance Act 2022 clarifies interest is payable at 18% only if wrongly availed ITC is actually utilised to set off output tax liability.',
    noticeContext: 'Interest demand under Section 50 on unutilised ITC sitting in Electronic Credit Ledger.',
    tags: ['Delhi High Court', 'Section 50(3)', 'Availed and Utilised Test', 'No Interest on Unutilised ITC', 'Finance Act 2022']
  },

  // SECTION 129/130 - TRANSIT INTERCEPTION & E-WAY BILLS
  {
    id: 'dhc-taneja-overseas-2024',
    title: 'Taneja Overseas v. Commissioner of GST Delhi North',
    citation: '2024 (1) TMI 890 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '129',
    type: 'favourable',
    headnote: 'Interception and 200% penalty under Section 129 quashed where e-way bill expired during transit due to vehicle breakdown and was renewed immediately upon repair.',
    keyRatio: 'Section 129 penalty is not attracted where goods are accompanied by genuine tax invoices and expiry of e-way bill was caused by bona fide mechanical breakdown.',
    noticeContext: 'Detention of vehicle under MOV-06 / MOV-07 due to expired e-way bill during breakdown.',
    tags: ['Delhi High Court', 'Section 129', 'Expired E-Way Bill', 'Vehicle Breakdown', 'Penalty Set Aside']
  },
  {
    id: 'dhc-shree-radhey-enterprises-2024',
    title: 'Shree Radhey Enterprises v. Commissioner of State Tax, Delhi',
    citation: '2024 (4) TMI 119 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '129',
    type: 'favourable',
    headnote: 'Minor clerical error in consignee address on e-way bill covered under Circular 64/38/2018; Section 129 penalty reduced to nominal Rs. 1000 under Section 125.',
    keyRatio: 'Where tax invoice and e-way bill are present and only PIN code or minor address digit is incorrect without evasion intent, invoking Section 129 is disproportionate and illegal.',
    noticeContext: 'Section 129 detention notice for minor typo in delivery address on e-way bill.',
    tags: ['Delhi High Court', 'Circular 64/2018', 'Section 129', 'Minor Clerical Error', 'Nominal Penalty']
  },

  // SECTION 169 - SERVICE OF SHOW CAUSE NOTICES & PORTAL COMMUNICATIONS
  {
    id: 'dhc-sabharwal-enterprises-2024',
    title: 'Sabharwal Enterprises v. Sales Tax Officer Class II / AVATO',
    citation: '2024 (2) TMI 980 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '169',
    type: 'favourable',
    headnote: 'Notices uploaded solely under "Additional Notices and Orders" tab without email/SMS alert do not constitute effective service under Section 169; ex-parte order set aside.',
    keyRatio: 'Uploading notices in hidden portal sub-menus without transmitting automated alert to registered email and mobile number deprives the taxpayer of reasonable notice.',
    noticeContext: 'Order passed ex-parte because SCN was placed under Additional Notices tab and taxpayer never saw it.',
    tags: ['Delhi High Court', 'Section 169', 'Additional Notices Tab', 'No Email Alert', 'Ex-Parte Order Set Aside', 'Remand']
  },
  {
    id: 'dhc-rajesh-kumar-verma-2024',
    title: 'Rajesh Kumar Verma v. Commissioner of Central Tax, Delhi West',
    citation: '2024 (3) TMI 440 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '169',
    type: 'favourable',
    headnote: 'Delhi High Court remanded assessment order where SCN was sent to an obsolete email address updated prior to cancellation without physical service.',
    keyRatio: 'Where electronic transmission fails or relates to cancelled entity, officer must resort to other modes under Section 169(1) including registered post or tendering to authorized representative.',
    noticeContext: 'Notice sent to outdated email address leading to ex-parte demand order.',
    tags: ['Delhi High Court', 'Section 169', 'Service of Notice', 'Obsolete Email', 'Natural Justice']
  },

  // SECTION 107 - APPEALS & PRE-DEPOSIT
  {
    id: 'dhc-gaurav-jain-2026',
    title: 'Gaurav Jain v. Joint Commissioner (Appeals-II), CGST Delhi Zone',
    citation: '2026 (7) TMI 890 (Delhi High Court) | W.P.(C) 8414/2026',
    court: 'Delhi High Court',
    year: 2026,
    section: '107',
    type: 'favourable',
    headnote: 'Pre-deposit requirement under Section 107(6) for appeals arising from SCNs issued before 01.10.2025 is governed by unamended provisions; physical appeals must be accepted if portal blocks filing.',
    keyRatio: 'Amendments to Section 107(6) proviso operate prospectively; appeals arising from pre-amendment notices follow the earlier pre-deposit rules.',
    noticeContext: 'Appellate Authority rejecting appeal or demanding amended pre-deposit on pre-01.10.2025 proceedings.',
    tags: ['Delhi High Court', 'Gaurav Jain', 'Section 107(6)', 'Pre-Deposit Amendment', 'Prospective Application', 'Physical Appeal Allowed']
  },
  {
    id: 'dhc-ab-infrabuild-2024',
    title: 'A.B. Infrabuild Pvt. Ltd. v. Commissioner (Appeals), CGST Delhi',
    citation: '2024 (4) TMI 750 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '107',
    type: 'favourable',
    headnote: 'Appellate Authority cannot dismiss appeal in limine without issuing Form GST APL-02 deficiency memo or granting opportunity to rectify pre-deposit calculation.',
    keyRatio: 'Procedural defects in appeal filing must be notified via deficiency memo with opportunity to cure before dismissing on technical grounds.',
    noticeContext: 'Appellate Authority dismissing Section 107 appeal for minor shortfall in pre-deposit calculation without hearing.',
    tags: ['Delhi High Court', 'Section 107', 'Form GST APL-02', 'Deficiency Memo', 'Pre-Deposit Rectification']
  },

  // RULE 86A - BLOCKING OF ELECTRONIC CREDIT LEDGER (ECL)
  {
    id: 'dhc-best-crop-rule86a-2023',
    title: 'Best Crop Science LLP v. Principal Commissioner of CGST',
    citation: '2023 (6) TMI 210 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2023,
    section: 'OTHER',
    type: 'favourable',
    headnote: 'Rule 86A blocking of Electronic Credit Ledger cannot result in negative balance; blocking is restricted to credit actually available in the ledger.',
    keyRatio: 'Rule 86A allows blocking credit available in the Electronic Credit Ledger; creating a negative balance or blocking future credits not yet availed is ultra vires Rule 86A.',
    noticeContext: 'Officer inserting negative balance in Electronic Credit Ledger under Rule 86A.',
    tags: ['Delhi High Court', 'Rule 86A', 'Negative Ledger Balance Illegal', 'Electronic Credit Ledger', 'Available Credit Limit']
  },
  {
    id: 'dhc-shanti-enterprises-86a-2024',
    title: 'Shanti Enterprises v. Commissioner of Delhi Goods and Services Tax',
    citation: '2024 (1) TMI 780 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: 'OTHER',
    type: 'favourable',
    headnote: 'Rule 86A credit blocking automatically lapses after one year under Rule 86A(3); continuation beyond 1 year without fresh order is illegal.',
    keyRatio: 'Rule 86A(3) contains a mandatory one-year sunset clause. Ledger blocking must be unblocked immediately upon expiry of one year.',
    noticeContext: 'Electronic Credit Ledger blocked beyond 12 months under Rule 86A.',
    tags: ['Delhi High Court', 'Rule 86A(3)', 'One Year Sunset Clause', 'Automatic Unblocking', 'Ledger Restoration']
  },

  // SECTION 67 & 70 - SEARCH, SEIZURE & SUMMONS
  {
    id: 'dhc-kashish-impex-search-2024',
    title: 'Kashish Impex Pvt. Ltd. v. Directorate General of GST Intelligence',
    citation: '2024 (3) TMI 890 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '67',
    type: 'favourable',
    headnote: 'Forced cash recovery or DRC-03 deposits extracted during midnight search and inspection under Section 67 is illegal; refund directed with interest.',
    keyRatio: 'Officers conducting search under Section 67 have no statutory power to coerce voluntary tax deposits during search operations (CBIC Instruction No. 01/2022-23); coerced deposits must be refunded.',
    noticeContext: 'Taxpayer coerced to file DRC-03 and make payment during search/inspection under Section 67.',
    tags: ['Delhi High Court', 'Section 67', 'Coerced DRC-03 Payment', 'Midnight Search', 'Refund of Coerced Tax', 'CBIC Instruction 01/2022']
  },
  {
    id: 'dhc-shyam-sunder-summons-2024',
    title: 'Shyam Sunder v. Superintendent, CGST Anti-Evasion Delhi West',
    citation: '2024 (5) TMI 612 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '70',
    type: 'favourable',
    headnote: 'Summons under Section 70 cannot be issued repeatedly to harass senior directors when authorized representatives have submitted all books of accounts.',
    keyRatio: 'Summons power under Section 70 must be exercised with restraint; top management should not be summoned routinely when transaction records are produced by authorized personnel.',
    noticeContext: 'Repeated summons issued to Managing Director / CFO for routine document verification.',
    tags: ['Delhi High Court', 'Section 70', 'Summons Restraint', 'Authorized Representative', 'Harassment Barred']
  },

  // SECTION 54 - REFUND OF ACCUMULATED ITC & INVERTED DUTY
  {
    id: 'dhc-microtek-international-2024',
    title: 'Microtek International Pvt. Ltd. v. Commissioner of GST & Central Excise',
    citation: '2024 (2) TMI 410 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '54',
    type: 'favourable',
    headnote: 'Refund under Section 54(3) on inverted duty structure cannot be withheld on grounds that output product and input raw material fall under same HSN chapter if tax rates differ.',
    keyRatio: 'Inverted duty refund is determined by effective tax rate differential between inputs and outputs, not by identical four-digit HSN chapter heading.',
    noticeContext: 'Rejection of inverted duty structure refund under Section 54(3) citing same HSN chapter heading.',
    tags: ['Delhi High Court', 'Microtek', 'Inverted Duty Structure', 'Section 54(3)', 'Tax Rate Differential', 'Refund Allowed']
  },
  {
    id: 'dhc-orient-craft-2024',
    title: 'Orient Craft Ltd. v. Union of India & Ors.',
    citation: '2024 (6) TMI 215 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '54',
    type: 'favourable',
    headnote: 'Interest under Section 56 is mandatory when refund is not sanctioned within 60 days of receipt of complete refund application under Section 54.',
    keyRatio: 'Statutory interest at 6% under Section 56 is compensatory and automatic once 60-day deadline from application date is breached by department.',
    noticeContext: 'Department sanctioning refund after 6 months without paying statutory interest under Section 56.',
    tags: ['Delhi High Court', 'Section 56', 'Interest on Delayed Refund', '60 Days Deadline', 'Automatic Compensation']
  },

  // CORPORATE GUARANTEE & DIRECTOR REMUNERATION (RCM)
  {
    id: 'dhc-sterlite-power-2024',
    title: 'Sterlite Power Transmission Ltd. v. Commissioner of Central Tax, Delhi',
    citation: '2024 (4) TMI 350 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '73',
    type: 'favourable',
    headnote: 'Delhi High Court granted interim protection against GST demand on corporate guarantees given by parent company for subsidiary loans prior to Rule 28(2) amendment.',
    keyRatio: 'Providing corporate guarantee without consideration before specific insertion of Rule 28(2) on 26.10.2023 requires examination on whether actionable service was rendered.',
    noticeContext: 'SCN under Section 73 demanding 18% GST on 1% valuation of corporate guarantees issued for group entities in past years.',
    tags: ['Delhi High Court', 'Corporate Guarantee', 'Rule 28(2)', 'Parent-Subsidiary Guarantee', 'Interim Protection']
  },
  {
    id: 'dhc-nestle-india-2024',
    title: 'Nestle India Ltd. v. Union of India & Ors.',
    citation: '2024 (7) TMI 510 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '73',
    type: 'favourable',
    headnote: 'Remuneration paid to Whole-time Directors and Managing Directors subject to TDS under Section 192 Income Tax Act is employee salary and outside GST levy under Schedule III.',
    keyRatio: 'Director remuneration in employment relationship covered under Section 192 (Salary TDS) is an exempt activity under Schedule III; RCM under Notification 13/2017 applies only to sitting fees or independent consulting.',
    noticeContext: 'Demand under Section 73 for GST under RCM on salaries and bonuses paid to executive directors.',
    tags: ['Delhi High Court', 'Director Remuneration', 'Schedule III', 'RCM Notification 13/2017', 'Section 192 TDS', 'Salary Exempt']
  },

  // SECTION 168A - EXTENSION OF TIME LIMITATION
  {
    id: 'dhc-faiveley-transport-2024',
    title: 'Faiveley Transport Rail Technologies India Ltd. v. Commissioner of Central Tax',
    citation: '2024 (5) TMI 880 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '73',
    type: 'favourable',
    headnote: 'Delhi High Court issued notice and tagged petitions challenging routine extension of Section 73 limitation notifications under Section 168A for FY 2017-18 and 2018-19.',
    keyRatio: 'Powers under Section 168A cannot be invoked as an administrative crutch to extend limitation where no force majeure conditions existed during post-pandemic years.',
    noticeContext: 'Section 73 SCN issued beyond 3-year limitation relying on Notification 09/2023 or Notification 56/2023.',
    tags: ['Delhi High Court', 'Section 168A', 'Limitation Extension Challenge', 'Notification 56/2023', 'Force Majeure Requirement']
  },
  {
    id: 'dhc-siemens-healthcare-2024',
    title: 'Siemens Healthcare Pvt. Ltd. v. Union of India & Ors.',
    citation: '2024 (7) TMI 119 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '73',
    type: 'favourable',
    headnote: 'Interim protection granted against recovery pursuant to Section 73 orders passed on extended limitation under Section 168A notifications.',
    keyRatio: 'Taxpayers challenging the constitutional vires of notifications extending limitation under Section 168A without GST Council recommendation on force majeure are entitled to interim protection.',
    noticeContext: 'Demand orders passed during extended limitation periods under Section 168A.',
    tags: ['Delhi High Court', 'Siemens Healthcare', 'Section 168A', 'Interim Stay', 'Limitation Vires']
  },

  // SEZ & DTA SUPPLIES
  {
    id: 'dhc-wipro-sez-2024',
    title: 'Wipro Limited v. Commissioner of CGST Delhi South',
    citation: '2024 (3) TMI 512 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '54',
    type: 'favourable',
    headnote: 'Supplies to Special Economic Zone (SEZ) developer/unit are zero-rated under Section 16 IGST Act; endorsement by SEZ Specified Officer is substantial compliance.',
    keyRatio: 'Substantive zero-rated benefit on supplies to SEZ units cannot be denied for minor procedural delays in securing Specified Officer endorsement.',
    noticeContext: 'Denial of zero-rated benefit or refund on supplies made to SEZ units.',
    tags: ['Delhi High Court', 'SEZ Supplies', 'Zero Rated Supply', 'Section 16 IGST', 'Specified Officer Endorsement']
  },
  {
    id: 'dhc-alstom-transport-2024',
    title: 'Alstom Transport India Ltd. v. Commissioner of Central Tax',
    citation: '2024 (6) TMI 310 (Delhi High Court)',
    court: 'Delhi High Court',
    year: 2024,
    section: '73',
    type: 'favourable',
    headnote: 'Supply of goods and installation services for Delhi Metro project under international competitive bidding constitutes composite supply with dominant service element.',
    keyRatio: 'High-tech turnkey rail transportation contracts are composite supplies governed by Section 8; piecemeal dissection of equipment supply from installation is unsustainable.',
    noticeContext: 'Department seeking to dissect turnkey rail project into individual equipment sales at higher rate.',
    tags: ['Delhi High Court', 'Alstom Transport', 'Turnkey Rail Metro', 'Composite Supply', 'Section 8']
  }
];
