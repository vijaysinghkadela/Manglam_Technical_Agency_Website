import { Metadata } from 'next';
import MotionWrapper from '@/components/ui/MotionWrapper';
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy Policy for Manglam Technical Agency.' };

export default function PrivacyPolicyPage() {
  return (
    <article className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <MotionWrapper>
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">Privacy Policy</h1>
          <p className="text-sm text-text-muted mb-8">Last updated: March 2026</p>
          <GlassCard hover={false}>
            <div className="space-y-6 text-sm text-text-muted leading-relaxed">
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">1. Introduction</h2>
                <p>Manglam Technical Agency (&ldquo;MTA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and protect personal data in compliance with the Information Technology Act, 2000 (India) and the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">2. Information We Collect</h2>
                <p>We collect information you provide directly: name, email, phone, company name, project details, and any messages you send via our contact or quote forms. We also collect technical data: IP address, browser type, pages visited, and device information through standard web analytics.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">3. How We Use Your Information</h2>
                <p>Your data is used to: respond to inquiries, prepare project proposals, deliver contracted services, send project updates, improve our website, and comply with legal obligations. We do not sell or rent your personal information to third parties.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">4. Data Security</h2>
                <p>We implement reasonable security practices as required under Section 43A of the IT Act 2000. This includes encryption, access controls, and secure data transmission. Despite these measures, no method of transmission over the Internet is 100% secure.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">5. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at info@manglamtechnicalagency.com.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">6. Grievance Officer</h2>
                <p>In accordance with the IT Act 2000, our Grievance Officer can be contacted at info@manglamtechnicalagency.com. Complaints will be addressed within 30 days of receipt.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">7. Changes to This Policy</h2>
                <p>We may update this policy from time to time. Changes will be posted on this page with an updated effective date.</p>
              </div>
            </div>
          </GlassCard>
        </MotionWrapper>
      </div>
    </article>
  );
}
