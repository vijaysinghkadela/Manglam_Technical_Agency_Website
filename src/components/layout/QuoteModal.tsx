'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Globe, Share2, Shield, Brain, Key, Database, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useQuoteStore } from '@/stores/useQuoteStore';
import { useToast } from '@/hooks/useToast';
import { BUDGET_RANGES, TIMELINES } from '@/lib/constants';

const serviceOptions = [
  { slug: 'web-development', name: 'Web Development', icon: Globe },
  { slug: 'social-media-marketing', name: 'Social Media', icon: Share2 },
  { slug: 'cybersecurity', name: 'Cybersecurity', icon: Shield },
  { slug: 'ai-automation', name: 'AI Automation', icon: Brain },
  { slug: 'saas-licensing', name: 'SaaS Licensing', icon: Key },
  { slug: 'data-processing', name: 'Data Processing', icon: Database },
  { slug: 'contractor-management', name: 'Contractor Mgmt', icon: Users },
];

export default function QuoteModal() {
  const { isOpen, close, step, setStep, selectedServices, toggleService, setField, budget, timeline, description, name, email, phone, company, reset } = useQuoteStore();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: selectedServices, budget, timeline, description, name, email, phone, company }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const canNext = () => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return budget && description.length >= 10;
    if (step === 3) return name.length >= 2 && /\S+@\S+\.\S+/.test(email);
    return false;
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
        onClick={() => { close(); setSuccess(false); }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg glass-card p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
      >
        <button onClick={() => { close(); setSuccess(false); }} className="absolute top-4 right-4 text-text-muted hover:text-text-primary" aria-label="Close quote modal">
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-heading font-bold text-text-primary mb-2">Quote Request Sent!</h3>
            <p className="text-sm text-text-muted mb-6">We&apos;ll review your requirements and get back to you within 24 hours.</p>
            <Button onClick={() => { reset(); setSuccess(false); }}>Close</Button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-heading font-bold gradient-text mb-1">Get a Quote</h2>
            <p className="text-sm text-text-muted mb-6">Step {step} of 3</p>

            {/* Progress bar */}
            <div className="w-full h-1 bg-surface-2 rounded-full mb-6">
              <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-sm font-semibold text-text-primary mb-4">Select Services</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceOptions.map((s) => {
                      const selected = selectedServices.includes(s.slug);
                      return (
                        <button
                          key={s.slug}
                          onClick={() => toggleService(s.slug)}
                          className={`p-3 rounded-xl border text-left text-sm transition-all flex items-center gap-2.5 ${
                            selected ? 'bg-brand/10 border-brand/40 text-brand-light' : 'bg-surface border-border text-text-muted hover:border-brand/20'
                          }`}
                        >
                          <s.icon className="w-4 h-4 shrink-0" />
                          <span className="text-xs">{s.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block">Budget Range *</label>
                    <select value={budget} onChange={(e) => setField('budget', e.target.value)} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand">
                      <option value="">Select budget</option>
                      {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block">Timeline</label>
                    <select value={timeline} onChange={(e) => setField('timeline', e.target.value)} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand">
                      <option value="">Select timeline</option>
                      {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block">Project Description *</label>
                    <textarea value={description} onChange={(e) => setField('description', e.target.value)} rows={4} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand resize-none" placeholder="Tell us about your project..." />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block">Full Name *</label>
                    <input value={name} onChange={(e) => setField('name', e.target.value)} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block">Email *</label>
                    <input type="email" value={email} onChange={(e) => setField('email', e.target.value)} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block">Phone</label>
                    <input type="tel" value={phone} onChange={(e) => setField('phone', e.target.value)} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="+91 XXXXXXXXXX" />
                  </div>
                  <div>
                    <label className="text-sm text-text-muted mb-1.5 block">Company</label>
                    <input value={company} onChange={(e) => setField('company', e.target.value)} className="w-full bg-dark border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand" placeholder="Optional" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              {step > 1 ? (
                <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(step - 1)}>Back</Button>
              ) : <div />}
              {step < 3 ? (
                <Button size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" onClick={() => setStep(step + 1)} disabled={!canNext()}>Next</Button>
              ) : (
                <Button size="sm" loading={submitting} onClick={handleSubmit} disabled={!canNext()}>Submit Quote</Button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
