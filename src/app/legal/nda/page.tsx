import { Metadata } from 'next';
import MotionWrapper from '@/components/ui/MotionWrapper';
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = { title: 'NDA Template', description: 'Non-Disclosure Agreement template for Manglam Technical Agency engagements.' };

export default function NDAPage() {
  return (
    <article className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <MotionWrapper>
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">Non-Disclosure Agreement</h1>
          <p className="text-sm text-text-muted mb-8">Template for client engagements</p>
          <GlassCard hover={false}>
            <div className="space-y-6 text-sm text-text-muted leading-relaxed">
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">1. Parties</h2>
                <p>This Non-Disclosure Agreement (&ldquo;Agreement&rdquo;) is entered into between Manglam Technical Agency (&ldquo;Receiving Party&rdquo;) and the Client (&ldquo;Disclosing Party&rdquo;).</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">2. Confidential Information</h2>
                <p>Confidential Information includes all non-public business, technical, financial, or operational information disclosed by either party, in any form (written, oral, electronic, or visual).</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">3. Obligations</h2>
                <p>The Receiving Party agrees to: (a) use Confidential Information solely for the purpose of providing contracted services; (b) protect Confidential Information with the same degree of care as its own confidential information, but no less than reasonable care; (c) not disclose Confidential Information to any third party without prior written consent.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">4. Exceptions</h2>
                <p>This Agreement does not apply to information that: (a) becomes publicly available through no fault of the Receiving Party; (b) was already known to the Receiving Party; (c) is independently developed without use of Confidential Information; (d) is required to be disclosed by law.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">5. Return of Materials</h2>
                <p>Upon termination of the engagement, each party shall return or destroy all Confidential Information in its possession within 30 days.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">6. Duration</h2>
                <p>The obligations of confidentiality under this Agreement shall remain in effect for 2 years from the date of disclosure.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">7. Governing Law</h2>
                <p>This Agreement shall be governed by the laws of India, with jurisdiction in the courts of Rajasthan.</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-text-muted italic">This is a general template. Specific terms will be tailored to each engagement. For a customised NDA, please contact us at info@manglamtechnicalagency.com.</p>
              </div>
            </div>
          </GlassCard>
        </MotionWrapper>
      </div>
    </article>
  );
}
