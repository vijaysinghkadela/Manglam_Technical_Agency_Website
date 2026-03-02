'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, MessageCircle, Clock, ExternalLink, Zap, Shield, Lock, Check, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MotionWrapper from '@/components/ui/MotionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { contactFormSchema, ContactFormValues } from '@/lib/validations';
import { AGENCY_EMAIL, AGENCY_WHATSAPP, AGENCY_LOCATION, OFFICE_HOURS, BUDGET_RANGES, TIMELINES, REFERRAL_SOURCES } from '@/lib/constants';
import { services } from '@/lib/data/services';
import { useToast } from '@/hooks/useToast';

export default function ContactContent() {
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', referralSource: '', message: '', privacyAgreed: false },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        reset();
      } else {
        toast.error('Failed to send. Please try again.');
      }
    } catch { toast.error('Something went wrong.'); }
  };

  return (
    <section className="w-full pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left — Info */}
        <div className="lg:col-span-2 space-y-6">
          <MotionWrapper>
            <GlassCard hover={false}>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-light shrink-0 mt-0.5" />
                  <div><div className="text-text-primary font-medium">Location</div><div className="text-text-muted">{AGENCY_LOCATION}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-light shrink-0 mt-0.5" />
                  <div><div className="text-text-primary font-medium">Email</div><a href={`mailto:${AGENCY_EMAIL}`} className="text-brand-light hover:underline">{AGENCY_EMAIL}</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-light shrink-0 mt-0.5" />
                  <div><div className="text-text-primary font-medium">Office Hours</div><div className="text-text-muted">{OFFICE_HOURS.weekdays}</div><div className="text-text-muted">{OFFICE_HOURS.weekend}</div></div>
                </div>
              </div>
              <a href={AGENCY_WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-success/10 border border-success/30 text-success text-sm font-medium hover:bg-success/20 transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us Now
              </a>
              <Badge variant="accent" className="mt-3 w-full justify-center"><Zap className="w-3 h-3" /> We reply within 2–4 hours</Badge>
            </GlassCard>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <GlassCard hover={false}>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-2">Reference Project</div>
              <div className="text-sm font-semibold text-text-primary">MNSS Website — 3 Weeks • ₹50,000</div>
              <a href="https://www.marutnarayansewasansthan.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-brand-light hover:underline mt-2">
                <ExternalLink className="w-3 h-3" /> View Live Site
              </a>
            </GlassCard>
          </MotionWrapper>
        </div>

        {/* Right — Form */}
        <div className="lg:col-span-3">
          <MotionWrapper>
            {success ? (
              <GlassCard className="text-center py-12" hover={false}>
                <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-2">Message Sent!</h3>
                <p className="text-sm text-text-muted mb-6">We&apos;ll be in touch within 2–4 hours.</p>
                <Button onClick={() => setSuccess(false)}>Send Another Message</Button>
              </GlassCard>
            ) : (
              <GlassCard hover={false}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Full Name *</label>
                      <input {...register('fullName')} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="Your name" />
                      {errors.fullName && <p className="text-xs text-error mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Email *</label>
                      <input {...register('email')} type="email" className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="you@company.com" />
                      {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Phone</label>
                      <input {...register('phone')} type="tel" className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="+91 XXXXXXXXXX" />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Company</label>
                      <input {...register('company')} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="Optional" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Service *</label>
                      <select {...register('service')} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand">
                        <option value="">Select a service</option>
                        {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                        <option value="other">Other</option>
                      </select>
                      {errors.service && <p className="text-xs text-error mt-1">{errors.service.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Budget *</label>
                      <select {...register('budget')} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand">
                        <option value="">Select budget</option>
                        {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.budget && <p className="text-xs text-error mt-1">{errors.budget.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Timeline *</label>
                      <select {...register('timeline')} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand">
                        <option value="">Select timeline</option>
                        {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.timeline && <p className="text-xs text-error mt-1">{errors.timeline.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">How did you hear about us? *</label>
                      <select {...register('referralSource')} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand">
                        <option value="">Select</option>
                        {REFERRAL_SOURCES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                      {errors.referralSource && <p className="text-xs text-error mt-1">{errors.referralSource.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-text-muted mb-1 block">Message *</label>
                    <textarea {...register('message')} rows={4} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand resize-none" placeholder="Tell us about your project (min 20 chars)" />
                    {errors.message && <p className="text-xs text-error mt-1">{errors.message.message}</p>}
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input {...register('privacyAgreed')} type="checkbox" className="mt-1 accent-brand" />
                    <span className="text-xs text-text-muted">I agree to the <Link href="/legal/privacy-policy" className="text-brand-light hover:underline">Privacy Policy</Link></span>
                  </label>
                  {errors.privacyAgreed && <p className="text-xs text-error">{errors.privacyAgreed.message}</p>}
                  <Button type="submit" loading={isSubmitting} fullWidth size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Send Message
                  </Button>
                  <div className="flex flex-wrap justify-center gap-3 text-[10px] text-text-muted pt-2">
                    {['SSL Encrypted', 'No Spam', 'GDPR-Aligned', 'Data Safe'].map((b) => (
                      <span key={b} className="flex items-center gap-1"><Lock className="w-2.5 h-2.5" />{b}</span>
                    ))}
                  </div>
                </form>
              </GlassCard>
            )}
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
