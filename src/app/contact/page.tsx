'use client';

import PageHero from '@/components/ui/PageHero';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { CONTACT_INFO } from '@/lib/constants';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PageHero
        breadcrumbCurrent="Contact"
        label="GET IN TOUCH"
        title="Start a Conversation."
        subheading="Ready to build? Drop us a line. We promise a technical engineer will read it, not a salesperson."
      />

      <section className="py-24 bg-canvas relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-24">
            
            {/* Left 40% - Stark Info Block */}
            <div className="lg:col-span-4 flex flex-col pt-4">
              <h2 className="font-display text-2xl font-bold text-white mb-8">
                Manglam Technical Agency
              </h2>
              
              <div className="flex flex-col gap-6 text-[15px] text-[#525252]">
                <div className="flex gap-4 items-start group">
                  <MapPin className="w-5 h-5 mt-1 text-[#2A2A2A] group-hover:text-white transition-colors" />
                  <p className="leading-relaxed">
                    {CONTACT_INFO.address.street}<br/>
                    {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.pincode}<br/>
                    {CONTACT_INFO.address.country}
                  </p>
                </div>
                
                <div className="flex gap-4 items-center group">
                  <Mail className="w-5 h-5 text-[#2A2A2A] group-hover:text-white transition-colors" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors" data-cursor="link">
                    {CONTACT_INFO.email}
                  </a>
                </div>
                
                <div className="flex gap-4 items-center group">
                  <Phone className="w-5 h-5 text-[#2A2A2A] group-hover:text-white transition-colors" />
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors" data-cursor="link">
                    {CONTACT_INFO.phone}
                  </a>
                </div>

                <div className="flex gap-4 items-center pt-2">
                  <div className="w-5 h-5 flex items-center justify-center bg-[#25D366]/10 rounded-full">
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  </div>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="text-[#25D366] hover:text-[#25D366]/80 transition-colors font-medium" data-cursor="link">
                    WhatsApp Us
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-[#1F1F1F]">
                  <p className="text-violet text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                    ⚡ 2–4 hour response
                  </p>
                </div>
              </div>
            </div>

            {/* Right 60% - Floating Label Form */}
            <div className="lg:col-span-6 border-l lg:border-[#1F1F1F] lg:pl-24 pt-4 lg:pt-0 border-t border-[#1F1F1F] lg:border-t-0 mt-12 lg:mt-0 pt-12">
              <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-transparent border-b border-[#1F1F1F] py-3 text-white focus:outline-none focus:border-violet transition-colors peer placeholder-transparent"
                      placeholder="Name"
                      required
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-0 -top-5 text-[12px] font-mono tracking-wider text-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:font-sans peer-placeholder-shown:text-[#525252] peer-focus:-top-5 peer-focus:text-[12px] peer-focus:font-mono peer-focus:text-violet pointer-events-none"
                    >
                      Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-transparent border-b border-[#1F1F1F] py-3 text-white focus:outline-none focus:border-violet transition-colors peer placeholder-transparent"
                      placeholder="Email"
                      required
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-0 -top-5 text-[12px] font-mono tracking-wider text-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:font-sans peer-placeholder-shown:text-[#525252] peer-focus:-top-5 peer-focus:text-[12px] peer-focus:font-mono peer-focus:text-violet pointer-events-none"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full bg-transparent border-b border-[#1F1F1F] py-3 text-white focus:outline-none focus:border-violet transition-colors peer placeholder-transparent"
                      placeholder="Phone"
                    />
                    <label 
                      htmlFor="phone" 
                      className="absolute left-0 -top-5 text-[12px] font-mono tracking-wider text-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:font-sans peer-placeholder-shown:text-[#525252] peer-focus:-top-5 peer-focus:text-[12px] peer-focus:font-mono peer-focus:text-violet pointer-events-none"
                    >
                      Phone (Optional)
                    </label>
                  </div>

                  <div className="relative group">
                    <select 
                      id="service" 
                      className="w-full bg-transparent border-b border-[#1F1F1F] py-3 text-white focus:outline-none focus:border-violet transition-colors peer appearance-none"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-surface text-muted">Select Service</option>
                      <option value="web" className="bg-surface">Web Development</option>
                      <option value="social" className="bg-surface">Social Media</option>
                      <option value="security" className="bg-surface">Cybersecurity</option>
                      <option value="ai" className="bg-surface">AI Automation</option>
                      <option value="other" className="bg-surface">Other</option>
                    </select>
                    <label 
                      htmlFor="service" 
                      className="absolute left-0 -top-5 text-[12px] font-mono tracking-wider text-violet transition-all pointer-events-none"
                    >
                      Service Required
                    </label>
                  </div>
                </div>

                <div className="relative group mt-2">
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full bg-transparent border-b border-[#1F1F1F] py-3 text-white focus:outline-none focus:border-violet transition-colors peer placeholder-transparent resize-none"
                    placeholder="Message"
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 -top-5 text-[12px] font-mono tracking-wider text-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:font-sans peer-placeholder-shown:text-[#525252] peer-focus:-top-5 peer-focus:text-[12px] peer-focus:font-mono peer-focus:text-violet pointer-events-none"
                  >
                    Message / Project Details
                  </label>
                </div>

                <div className="pt-4">
                  <MagneticButton>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-white text-black font-display font-bold text-lg hover:bg-violet hover:text-white transition-colors"
                      data-cursor="pointer"
                    >
                      Submit Inquiry
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Large Decorative MTA */}
        <div className="absolute -bottom-20 -left-20 pointer-events-none select-none -z-10">
          <span className="font-display font-black text-[200px] leading-none text-[#0E0E0E] opacity-50">
            MTA
          </span>
        </div>
      </section>
    </main>
  );
}
