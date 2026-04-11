# Global Privacy Laws Comparison

> Comprehensive comparison of DPDP (India), LGPD (Brazil), GDPR (EU), and CCPA/CPRA (California) for MTA.

---

## Executive Summary

MTA operates under multiple jurisdictions. Key compliance priorities:
1. **DPDP Act 2023 (India)**: Primary, enforcement 13 May 2027
2. **LGPD (Brazil)**: Active, health/biometric = sensitive data (FitNexora)
3. **GDPR (EU)**: If serving EU clients
4. **CCPA/CPRA (California)**: If serving CA residents

**Critical**: FitNexora handles health/biometric data, triggering LGPD sensitive data rules.

---

## Quick Comparison Matrix

| Aspect | DPDP (India) | LGPD (Brazil) | GDPR (EU) | CCPA/CPRA (CA) |
|--------|--------------|---------------|-----------|----------------|
| **Effective Date** | 13 May 2027 | Sept 2020 (active) | May 2018 | Jan 2020 / Jan 2023 |
| **Scope** | Digital data only | All personal data | All personal data | CA residents' data |
| **Consent Model** | Explicit opt-in | Explicit opt-in | Multiple bases | Opt-out for sale/sharing |
| **Sensitive Data** | No category | Strict category | Special categories | Defined (health, biometrics) |
| **Breach Timeline** | "Without undue delay" | "Reasonable time" | 72 hrs (high risk) | To AG + consumers |
| **Max Penalty** | ₹250 crore | R$50M (~₹8-9 Cr) | €20M or 4% turnover | $7,500 per violation |
| **Private Action** | No | No | Limited | Yes (breaches) |
| **Cross-Border** | Allowed | Restricted | Restricted | No restriction |
| **Children** | Under 18 parental | Under 18 parental | Under 16 (or 13+) | Under 16 |
| **DPO Required** | For SDFs | Most controllers | Most controllers | No |

---

## DPDP Act 2023 (India)

### Overview
- **Enacted**: August 2023
- **Rules**: November 2025
- **Full Enforcement**: **13 May 2027**
- **Regulator**: Data Protection Board of India

### Scope
- Digital personal data only
- Includes digitized offline records
- Excludes: Personal/domestic, publicly available, offline-only

### Key Definitions
| Term | Definition |
|------|------------|
| Data Principal | Individual whose data is processed |
| Data Fiduciary | Entity determining purpose/means (MTA) |
| Data Processor | Subcontractor processing on behalf |
| Significant Data Fiduciary | Designated based on volume/sensitivity/risk |

### Consent Requirements
| Requirement | Details |
|-------------|---------|
| Free | No coercion or conditioning |
| Specific | Tied to disclosed purposes |
| Informed | Clear notice before consent |
| Unconditional | Not bundled with unrelated services |
| Unambiguous | Clear affirmative action |
| Standalone | Itemised notice listing each purpose |
| Withdrawal | As easy as giving consent |

### Breach Notification
- **Timeline**: "Without undue delay" to Board + affected principals
- **Report**: Within 72 hours (detailed)
- **Content**: Nature, data affected, mitigation

### Penalties
| Violation | Max Penalty |
|-----------|-------------|
| Security safeguards failure | ₹250 crore |
| Breach notification failure | ₹200 crore |
| Children's data non-compliance | ₹200 crore |
| Other violations | ₹50 crore |

### Implementation Checklist
- [ ] Map all personal data flows
- [ ] Update privacy notices
- [ ] Implement explicit consent
- [ ] Create breach playbook
- [ ] Build deletion workflows
- [ ] Review processor contracts
- [ ] Establish grievance mechanism

---

## LGPD (Brazil)

### Overview
- **Enacted**: August 2018
- **Effective**: September 2020
- **Regulator**: ANPD (Autoridade Nacional de Proteção de Dados)

### Scope
- All personal data (digital + offline)
- Extraterritorial: Applies if targeting Brazilians
- FitNexora health/biometric data = sensitive

### Sensitive Data Categories
| Category | FitNexora Examples |
|----------|-------------------|
| Health/sex life | Diet plans, workout metrics, body measurements |
| Biometric | Facial recognition check-in, wearables |
| Genetic | Not typically collected |

### Explicit Consent Requirements
| Requirement | Implementation |
|-------------|----------------|
| Form | Active opt-in, no pre-ticked boxes |
| Specific | Granular for each purpose |
| Highlighted | Visually distinct |
| Standalone | Separate from other consents |
| Revocable | Withdrawal as easy as giving consent |
| Burden of Proof | Controller (MTA) must prove consent |

### ANPD Enforcement (2023–2026)
| Metric | Value |
|--------|-------|
| Total Fines | BRL 98 million+ (~₹1,600 crore) |
| 2025 Proceedings | 3× higher than 2024 |
| Priority Sectors | Healthcare, AI/biometrics, children's data |

**Key Cases**:
- **Telekall** (2023): First private fine (R$14,400)
- **IAMSPE** (2024): Health breach, delayed notification
- **Meta** (2024): AI training without consent → processing ban
- **Healthcare Sector** (2024–25): Aggregate ~BRL 12 million

### Fine Calculation (Resolução 4/2023)
**Formula**: `V_multa = V_base × (1 + Agravantes − Atenuantes)`

| Component | Details |
|-----------|---------|
| V_base | Based on severity + revenue + damage |
| Maximum | 2% of Brazilian revenue OR R$50 million |
| Aggravating | Recidivism, bad faith, systematic violations |
| Mitigating | Immediate cessation, cooperation |

### Implementation Checklist
- [ ] Map FitNexora sensitive data
- [ ] Update consent forms (highlighted, standalone)
- [ ] Implement one-click withdrawal
- [ ] Log all consent with proof
- [ ] Prepare breach template (ANPD + subjects)
- [ ] Designate DPO if scaling in Brazil

---

## GDPR (EU)

### Overview
- **Effective**: May 2018
- **Regulators**: EU Supervisory Authorities
- **Scope**: All personal data (digital + offline)

### Key Differences from DPDP
| Aspect | GDPR | DPDP |
|--------|------|------|
| Scope | All data | Digital only |
| Legal Bases | 6 bases (incl. legitimate interests) | Consent + 6 narrow uses |
| Sensitive Data | Special categories | No category |
| Rights | Broader (portability, objection) | Access, correction, erasure |
| Breach | 72 hrs (high risk) | All breaches, "without undue delay" |
| Cross-Border | Restricted (SCCs) | Allowed |
| Penalties | €20M or 4% | ₹250 crore |

### GDPR-Only Rights
- **Portability**: Data in machine-readable format
- **Objection**: Object to legitimate interest processing
- **Automated Decisions**: Not subject to solely automated decisions with significant effects

### Implementation
- Only required if serving EU clients
- DPDP compliance covers ~80% of GDPR
- Add portability and objection mechanisms

---

## CCPA/CPRA (California)

### Overview
- **CCPA Effective**: January 2020
- **CPRA Effective**: January 2023
- **Regulator**: California Privacy Protection Agency (CPPA)

### Key Differences
| Aspect | CCPA/CPRA | DPDP |
|--------|-----------|------|
| Model | Opt-out (sale/sharing) | Opt-in (consent) |
| Threshold | $26.6M revenue OR 100k CA consumers | All fiduciaries |
| Sensitive Data | Requires limit + opt-out | No category |
| Rights | Know, delete, opt-out, correct | Access, correction, erasure |
| Private Action | Yes (breaches) | No |

### 2026 CPRA Updates
- Mandatory cybersecurity audits
- Risk assessments for sensitive data
- ADMT (Automated Decision-Making) transparency

### Implementation
- Only required if processing CA residents' data
- Monitor FitNexora CA user count
- Add "Do Not Sell/Share" link if applicable

---

## Detailed Comparison Tables

### Consent Models

| Requirement | DPDP | LGPD | GDPR | CCPA |
|-------------|------|------|------|------|
| Default | Opt-in | Opt-in | Multiple | Opt-out |
| Form | Clear affirmative | Active opt-in | Affirmative | Notice |
| Specificity | Itemised notice | Granular | Specific | N/A |
| Withdrawal | As easy | As easy | As easy | Easy |
| Pre-ticked | No | No | No | N/A |
| Silence | Not consent | Not consent | Not consent | Implied |

### Sensitive Data Treatment

| Law | Category Definition | Consent Required | Additional Safeguards |
|-----|-------------------|------------------|----------------------|
| DPDP | No separate category | Standard consent | Standard security |
| LGPD | Strict (health, biometrics) | Explicit + emphatic | Higher security, logs |
| GDPR | Special categories | Explicit | DPIA, DPO |
| CCPA | Sensitive PI defined | Opt-out | Limit use, risk assessment |

### Breach Notification

| Law | Timeline | Recipient | Content |
|-----|----------|-----------|---------|
| DPDP | "Without undue delay" | Board + principals | Nature, data, mitigation |
| LGPD | "Reasonable time" | ANPD + subjects | Nature, consequences |
| GDPR | 72 hours (high risk) | SA + subjects | Nature, consequences |
| CCPA | "Without unreasonable delay" | AG + consumers | Nature, steps taken |

### Penalties

| Law | Max Fine | Calculation | Private Action |
|-----|----------|-------------|----------------|
| DPDP | ₹250 crore | Per violation | No |
| LGPD | R$50 million (~₹8-9 Cr) | 2% revenue OR cap | No |
| GDPR | €20M or 4% | Global turnover | Limited |
| CCPA | $7,500 per violation | Per violation | Yes (breaches) |

### Cross-Border Transfers

| Law | Mechanism | Restrictions |
|-----|-----------|--------------|
| DPDP | Allowed | Unless country blacklisted |
| LGPD | Restricted | Adequacy, safeguards, consent |
| GDPR | Restricted | Adequacy, SCCs, BCRs |
| CCPA | Allowed | Notice required |

### Children's Data

| Law | Threshold | Consent |
|-----|-----------|---------|
| DPDP | Under 18 | Verifiable parental |
| LGPD | Under 18 | Verifiable parental |
| GDPR | Under 16 (or 13+ parental) | Explicit |
| CCPA | Under 16 | Verifiable parental |

---

## MTA-Specific Compliance Strategy

### Immediate Actions

#### DPDP (Primary)
1. Update contact forms with explicit consent
2. Create breach playbook (72-hour SLA)
3. Implement consent logging
4. Review processor agreements

#### LGPD (FitNexora Priority)
1. Map health/biometric data flows
2. Add explicit consent for sensitive data
3. Implement one-click withdrawal
4. Prepare ANPD breach template

#### GDPR (If EU Clients)
1. Add data portability
2. Add objection mechanism
3. Update privacy notice for EU

#### CCPA (Monitor)
1. Track CA user count
2. Add opt-out if thresholds met

### Long-term Strategy

#### Dual Compliance (DPDP + LGPD)
- Single consent form capturing both
- Highlighted sensitive data section for LGPD
- ANPD-style breach playbook
- Quarterly compliance audit

#### Competitive Advantage
- Market as "DPDP + LGPD ready by design"
- Use in iStart QRate application
- Differentiate from Jaipur agencies
- Attract international FitNexora clients

---

## Templates

### Dual Consent Notice (DPDP + LGPD)

```
I explicitly consent to Manglam Technical Agency processing my personal data
for the purpose of [specific service] under the Digital Personal Data Protection
Act, 2023 (India).

For FitNexora users (health/fitness services):
I explicitly and emphatically consent to the processing of my sensitive health
and biometric data (diet plans, workout metrics, body measurements) under the
Lei Geral de Proteção de Dados (LGPD - Brazil).

This consent is:
- Free, specific, informed, and unambiguous
- Granular and standalone from other consents
- Revocable at any time via [one-click link]
- Withdrawal is as easy as giving consent

I understand that:
- My data will be protected under industry-standard security
- Breaches will be notified "without undue delay"
- I have rights to access, correct, and erase my data
- FitNexora data is treated as sensitive under LGPD
```

### Breach Notification Template (DPDP)

```
To: Data Protection Board of India
From: Manglam Technical Agency (UDYAM-RJ-15-0094091)
Date: [Date of discovery]

BREACH NOTIFICATION

1. Nature of Breach: [Description]
2. Data Affected: [Categories, approximate volume]
3. Data Principals Affected: [Number, categories]
4. Likely Consequences: [Harm assessment]
5. Measures Taken: [Containment, mitigation]
6. Contact: [DPO/Responsible person]

Detailed report to follow within 72 hours.
```

### Breach Notification Template (LGPD/ANPD)

```
To: Autoridade Nacional de Proteção de Dados (ANPD)
From: Manglam Technical Agency
Date: [Date of discovery]

NOTIFICAÇÃO DE VIOLAÇÃO DE DADOS PESSOAIS

1. Natureza da violação: [Descrição]
2. Dados pessoais afetados: [Categorias, volume]
3. Titulares afetados: [Número, categorias]
4. Prováveis consequências: [Avaliação de risco]
5. Medidas adotadas: [Contenção, mitigação]
6. Contato: [DPO/Responsável]

Relatório detalhado em breve.
```

---

## Integration with MTA Pipeline

### Stage 2–3: Discovery + Paid Workshop
- Add DPDP/LGPD consent notice
- Include data mapping questionnaire
- Explicit consent for health/biometric (FitNexora)
- Breach notification checklist

### Stage 4–6: Proposal → Agreement
- Include dual privacy clause
- E-stamped SOW with compliance language
- DPO contact (if applicable)
- ANPD-style breach SLA

### Stage 7–9: Delivery
- Supabase encryption + access logs
- 72-hour breach playbook
- Document consent withdrawal process
- Compliance runbooks

### Stage 10: Retention
- Quarterly compliance review
- Automated consent withdrawal
- LGPD self-audit
- Privacy rights workflow

---

## Key Takeaways

1. **DPDP is primary**: Full enforcement 13 May 2027
2. **LGPD is active**: FitNexora health data = sensitive
3. **Explicit consent**: Required under both DPDP and LGPD
4. **Breach playbook**: 72-hour internal SLA minimum
5. **Competitive advantage**: Market compliance readiness
6. **Documentation**: Log everything, prove consent
7. **Withdrawal**: Must be as easy as giving consent
8. **Penalties**: Significant (₹250 Cr / R$50M)
9. **Proactive**: Don't wait for enforcement
10. **Differentiator**: Most Jaipur agencies non-compliant

---

*Document Version: April 2026*
*Last Updated: 06 April 2026*
*Prepared for: Manglam Technical Agency, UDYAM-RJ-15-0094091*
