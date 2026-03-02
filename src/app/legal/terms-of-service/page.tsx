import { Metadata } from 'next';
import MotionWrapper from '@/components/ui/MotionWrapper';
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = { title: 'Terms of Service', description: 'Terms of Service for Manglam Technical Agency.' };

export default function TermsOfServicePage() {
  return (
    <article className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <MotionWrapper>
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">Terms of Service</h1>
          <p className="text-sm text-text-muted mb-8">Last updated: March 2026</p>
          <GlassCard hover={false}>
            <div className="space-y-6 text-sm text-text-muted leading-relaxed">
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">1. Acceptance of Terms</h2>
                <p>By accessing or using Manglam Technical Agency&apos;s website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">2. Services</h2>
                <p>MTA provides web development, social media marketing, cybersecurity, AI automation, SaaS licensing, data processing, and contractor management services. Specific deliverables, timelines, and pricing are outlined in individual service agreements.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">3. Payment Terms</h2>
                <p>All payments are in Indian Rupees (₹). Project-based services require 50% advance payment. Monthly retainers are due by the 5th of each month. Invoices not paid within 15 days of the due date may incur late fees. A 10-day grace period applies before service suspension.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">4. Intellectual Property</h2>
                <p>Upon full payment, all custom-developed work (code, designs, content created specifically for your project) becomes your property. MTA retains the right to use anonymised project details in our portfolio unless otherwise agreed.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">5. Confidentiality</h2>
                <p>Both parties agree to maintain confidentiality of proprietary information shared during the engagement. This obligation survives termination of the service agreement.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">6. Termination</h2>
                <p>Either party may terminate with 30 days&apos; written notice. All completed work will be delivered, and outstanding payments settled within 15 days of termination. Work in progress will be delivered as-is.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">7. Limitation of Liability</h2>
                <p>MTA&apos;s total liability shall not exceed the total fees paid for the specific service in question. We are not liable for indirect, incidental, or consequential damages.</p>
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">8. Governing Law</h2>
                <p>These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Rajasthan, India.</p>
              </div>
            </div>
          </GlassCard>
        </MotionWrapper>
      </div>
    </article>
  );
}
