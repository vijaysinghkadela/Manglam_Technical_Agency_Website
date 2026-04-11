import { z } from 'zod/v4';

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  referralSource: z.string().min(1, 'Please tell us how you heard about us'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  privacyAgreed: z.boolean().refine((val) => val === true, 'You must agree to the Privacy Policy'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const quoteStep1Schema = z.object({
  services: z.array(z.string()).min(1, 'Select at least one service'),
});

export const quoteStep2Schema = z.object({
  budget: z.string().min(1, 'Select a budget range'),
  timeline: z.string().min(1, 'Select a timeline'),
  description: z.string().min(10, 'Please describe your project'),
});

export const quoteStep3Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const documentRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  company: z.string().optional(),
  requestedDocuments: z.array(z.string()).min(1, 'Select at least one document'),
  useCase: z.string().min(20, 'Use case must be at least 20 characters'),
  privacy: z.literal(true),
});

export type DocumentRequestValues = z.infer<typeof documentRequestSchema>;
