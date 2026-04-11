# MTA Compliance Guide — DPDP, LGPD, GDPR, CCPA

> Comprehensive data protection compliance reference for Manglam Technical Agency.

---

## Executive Summary

MTA operates under multiple data protection frameworks:
- **DPDP Act 2023 (India)**: Enforcement 13 May 2027
- **LGPD (Brazil)**: Active; health/biometric = sensitive data
- **GDPR (EU)**: If serving EU clients
- **CCPA/CPRA (California)**: If serving CA residents

**Critical**: FitNexora handles health/biometric data, triggering LGPD sensitive data rules and DPDP consent requirements.

---

## DPDP Act 2023 (India)

### Timeline
| Phase | Date | Status |
|-------|------|--------|
| Enactment | August 2023 | ✓ Complete |
| Rules Notification | November 2025 | ✓ Complete |
| Full Enforcement | **13 May 2027** | ⏳ Active preparation |

### Key Definitions
| Term | Definition |
|------|------------|
| **Data Principal** | Individual whose data is processed (gym members, website users) |
| **Data Fiduciary** | Entity determining purpose/means (MTA) |
| **Data Processor** | Subcontractor processing on behalf (Supabase, Razorpay) |
| **Significant Data Fiduciary (SDF)** | Designated based on volume/sensitivity |

### Core Obligations for MTA

#### 1. Consent Requirements
- **Free**: No coercion or conditioning service on consent
- **Specific**: Tied to disclosed purposes
- **Informed**: Clear notice before consent
- **Unconditional**: Not bundled with unrelated services
- **Unambiguous**: Clear affirmative action required
- **Standalone**: Itemised notice listing each purpose

**Example Consent Language**:
```
"I consent to Manglam Technical Agency processing my personal data 
for the purpose of [specific service]. I understand I can withdraw 
this consent at any time via [contact method]."
```

#### 2. Data Principal Rights
| Right | Implementation |
|-------|----------------|
| Access | Request copy of personal data |
| Correction | Update inaccurate data |
| Erasure | Request deletion |
| Grievance Redressal | 90-day response SLA |
| Nomination | Designate representative for death/incapacity |

#### 3. Security Safeguards (Rule 6)
- Encryption in transit and at rest
- Access controls (RBAC)
- Monitoring and audit logs
- Regular backups
- Incident response plan

#### 4. Breach Notification
- **Timeline**: "Without undue delay" to Data Protection Board + affected principals
- **Detailed Report**: Within 72 hours
- **Content**: Nature of breach, data affected, mitigation measures

#### 5. Children's Data
- **Threshold**: Under 18 years
- **Requirement**: Verifiable parental consent
- **Relevance**: FitNexora youth gym programs

### Penalty Structure (Section 33 + Schedule)

| Violation | Maximum Penalty |
|-----------|-----------------|
| Failure to implement reasonable security | ₹250 crore |
| Failure to notify breach | ₹200 crore |
| Children's data non-compliance | ₹200 crore |
| Other violations (consent, notice, rights) | ₹50 crore |

### Implementation Checklist

- [ ] Map all personal data flows (FitNexora + client projects)
- [ ] Update privacy notices with DPDP-compliant language
- [ ] Implement explicit consent flows (checkboxes, not pre-ticked)
- [ ] Create breach response playbook (72-hour SLA)
- [ ] Build data deletion workflows on withdrawal
- [ ] Train team on DPDP obligations
- [ ] Review processor contracts (Supabase, Razorpay)
- [ ] Establish grievance redressal mechanism

---

## LGPD (Brazil) — Lei Geral de Proteção de Dados

### Enforcement Status
- **Effective**: September 2020
- **Full Enforcement**: Active since 2021
- **ANPD**: Active regulator with accelerating sanctions

### Key Cases (2023–2026)

| Case | Year | Violation | Penalty |
|------|------|-----------|---------|
| Telekall Infoservice | 2023 | No lawful basis, no DPO, no records | R$14,400 (first private fine) |
| IAMSPE (public health) | 2024 | Delayed breach notification, no documentation | Warnings + corrective measures |
| SES-SC | 2023 | Delayed breach notification, poor security | Warnings + corrective actions |
| Meta Platforms | 2024 | AI training without valid consent | Processing ban |
| Healthcare sector (15 institutions) | 2024–2025 | Inadequate security for patient records | ~BRL 12 million aggregate |
| Facial recognition cases | 2025 | Biometric misuse, inadequate consent | Ongoing investigations |

**2026 Trends**: 3× increase in proceedings vs 2024. Priority: healthcare, AI/biometrics, children's data, DPO compliance.

### Sensitive Personal Data (Article 5, II)

| Category | FitNexora Examples |
|----------|-------------------|
| Racial/ethnic origin | Not typically collected |
| Religious belief | Not typically collected |
| Political opinion | Not typically collected |
| **Health or sex life** | **Diet plans, workouts, fitness metrics, body measurements** |
| **Genetic or biometric data** | **Facial recognition check-in, wearable data** |

**Critical**: FitNexora health/biometric data = sensitive under LGPD

### Article 11 — Lawful Bases for Sensitive Data

Processing **prohibited** unless:
1. **Explicit consent** (primary basis for MTA)
2. Compliance with legal/regulatory obligation
3. Public policy execution (public entities only)
4. Regular exercise of rights in proceedings
5. Protection of life/physical safety
6. Health protection (health professionals only)
7. Legitimate interest (limited cases)
8. Credit protection

**MTA must rely on #1: Explicit consent**

### Explicit Consent Requirements (Article 8 + ANPD Guidance)

| Requirement | Implementation |
|-------------|----------------|
| Form | Active opt-in, no pre-ticked boxes |
| Informed | Clear explanation of purpose |
| Specific | Granular, separate for each purpose |
| Highlighted | Visually distinct from other text |
| Standalone | Separate from other consents |
| Revocable | Withdrawal as easy as giving consent |
| Burden of Proof | Controller (MTA) must prove consent |

### ANPD Fine Calculation (Resolução 4/2023)

**Formula**: `V_multa = V_base × (1 + Agravantes − Atenuantes)`

| Component | Description |
|-----------|-------------|
| V_base | Based on offense severity + revenue band + damage degree |
| Maximum | 2% of Brazilian revenue OR R$50 million (whichever is lower) |
| Aggravating | Recidivism, bad faith, systematic violations |
| Mitigating | Immediate cessation, corrective measures, cooperation |

**Payment**: Within 20 business days of notification

### LGPD Consent Template (Paste-Ready)

```
I explicitly and emphatically consent to the processing of my sensitive 
health and biometric data (including diet plans, workout metrics, and 
body measurements) by Manglam Technical Agency and FitNexora for the 
specific purposes of personalised fitness coaching and membership management. 
This consent is granular and may be withdrawn at any time via [one-click link] 
without affecting other services.
```

### Implementation Checklist

- [ ] Map FitNexora data flows against LGPD sensitive data rules
- [ ] Update discovery workshop with LGPD explicit consent language
- [ ] Implement highlighted, standalone consent checkboxes
- [ ] Create one-click withdrawal mechanism
- [ ] Log all consent with timestamp, purpose, IP address
- [ ] Add LGPD clauses to processor agreements (Supabase/Razorpay)
- [ ] Prepare breach notification template (ANPD + data subjects)
- [ ] Designate DPO if Brazilian user base grows
- [ ] Quarterly LGPD self-audit

---

## GDPR (EU) Comparison

### Key Differences from DPDP

| Aspect | GDPR | DPDP |
|--------|------|------|
| Scope | All personal data (digital + offline) | Digital only |
| Legal Bases | 6 bases including legitimate interests | Consent + 6 narrow "legitimate uses" |
| Sensitive Data | Special categories with stricter rules | No separate category |
| Rights | Broader (portability, objection) | Access, correction, erasure |
| Breach Notification | 72 hours (high risk only) | All breaches, "without undue delay" |
| Cross-Border | Restricted (SCCs/adequacy) | Allowed unless blacklisted |
| Penalties | €20M or 4% turnover | ₹250 crore |

### GDPR-Only Rights
- **Portability**: Receive data in machine-readable format
- **Objection**: Object to processing based on legitimate interests
- **Automated Decision-Making**: Not subject to solely automated decisions with significant effects

**Relevance for MTA**: Only if serving EU clients. DPDP compliance covers ~80% of GDPR.

---

## CCPA/CPRA (California) Comparison

### Key Differences

| Aspect | CCPA/CPRA | DPDP |
|--------|-----------|------|
| Model | Opt-out (sale/sharing) | Opt-in (consent) |
| Threshold | $26.6M revenue OR 100k CA consumers | All data fiduciaries |
| Sensitive Data | Requires limit + opt-out | No separate category |
| Rights | Know, delete, opt-out, correct | Access, correction, erasure |
| Penalties | $2,500 per violation ($7,500 intentional) | Up to ₹250 crore |
| Private Action | Possible for breaches | No private right of action |

### 2026 CPRA Updates (Effective 1 Jan 2026)
- Mandatory cybersecurity audits for high-volume processors
- Risk assessments for sensitive data processing
- ADMT (Automated Decision-Making Technology) transparency requirements

**Relevance for MTA**: Low immediate risk. Monitor FitNexora CA user count.

---

## Global Privacy Comparison Matrix

| Aspect | DPDP (India) | LGPD (Brazil) | GDPR (EU) | CCPA/CPRA (CA) |
|--------|--------------|---------------|-----------|----------------|
| **Consent Model** | Opt-in, explicit | Opt-in, explicit | Multiple bases | Opt-out |
| **Sensitive Data** | No category | Strict category | Special categories | Limited definition |
| **Breach Timeline** | Without undue delay | Reasonable time | 72 hrs (high risk) | To AG + consumers |
| **Max Penalty** | ₹250 crore | R$50M (~₹8-9 crore) | €20M/4% | $7,500 per violation |
| **Cross-Border** | Allowed | Restricted | Restricted | No restriction |
| **Children** | Parental consent (under 18) | Same | 16 (or 13+ parental) | Under 16 |
| **DPO Required** | For SDFs | Most controllers | Most controllers | No |

---

## MTA 10-Stage Pipeline Integration

### Stage 2–3: Discovery + Paid Workshop
- Add DPDP/LGPD consent notice
- Include explicit consent for health/biometric data (FitNexora)
- Data mapping questionnaire
- Breach notification checklist

### Stage 4–6: Proposal → Agreement
- Include DPDP standalone privacy clause
- LGPD explicit consent template
- E-stamped SOW with compliance language
- DPO contact (if applicable)

### Stage 7–9: Delivery
- Supabase encryption + access logs
- 72-hour breach playbook
- Documentation of consent withdrawal process
- Compliance runbooks

### Stage 10: Retention
- Quarterly compliance review
- Automated consent withdrawal handling
- LGPD self-audit
- Privacy rights request workflow

---

## Code Implementation Requirements

### Contact Forms
```typescript
// Required: Explicit consent checkbox
// - Not pre-ticked
// - Granular purpose description
// - Link to privacy policy
// - One-click withdrawal link in confirmation email

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  // ... other fields
  consent: z.boolean().refine(val => val === true, {
    message: 'Explicit consent required'
  }),
  consentTimestamp: z.string(), // ISO 8601
  consentPurpose: z.string(), // Granular description
})
```

### Consent Logging (Supabase)
```typescript
// Store consent with:
// - User ID
// - Timestamp (ISO 8601)
// - Purpose (granular)
// - Method (checkbox, etc.)
// - IP address
// - User agent
// - Withdrawal status
```

### Withdrawal Mechanism
```typescript
// Must be as easy as giving consent
// One-click link in:
// - Confirmation email
// - Footer of all communications
// - User dashboard (if applicable)

const withdrawalLink = `${baseUrl}/withdraw-consent?token=${jwt}`
```

### Breach Notification
```typescript
// 72-hour internal SLA
// Auto-notify Data Protection Board (DPDP) + ANPD (LGPD)
// Notify affected users
// Document all actions
```

---

## Templates & Resources

### DPDP Consent Notice
```
[Paste-ready DPDP-compliant consent notice]
```

### LGPD Explicit Consent
```
[Paste-ready LGPD-compliant explicit consent]
```

### Breach Playbook
```
[72-hour breach response checklist]
```

### Processor Agreement Clauses
```
[DPDP + LGPD clauses for Supabase/Razorpay]
```

---

## Action Plan

### Immediate (Next 48 Hours)
1. [ ] Update contact form with explicit consent checkbox
2. [ ] Implement consent logging in Supabase
3. [ ] Create one-click withdrawal link

### Short-term (Next 2 Weeks)
1. [ ] Update all legal pages with DPDP/LGPD language
2. [ ] Add processor agreement clauses
3. [ ] Create breach notification playbook

### Medium-term (Next 3 Months)
1. [ ] Quarterly compliance review process
2. [ ] Team training on DPDP/LGPD
3. [ ] External audit (if budget allows)

---

## References

- DPDP Act, 2023: https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf
- DPDP Rules, 2025: https://www.meity.gov.in/content/notification-digital-personal-data-protection-rules-2025
- LGPD (English): https://www.lgpdbrasil.com.br/
- ANPD: https://www.gov.br/anpd/
- GDPR: https://gdpr.eu/
- CCPA/CPRA: https://oag.ca.gov/privacy/ccpa

---

*Document Version: April 2026*
*Last Updated: 06 April 2026*
*Prepared for: Manglam Technical Agency, UDYAM-RJ-15-0094091*
