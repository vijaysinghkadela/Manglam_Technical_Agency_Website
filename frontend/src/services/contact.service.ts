import { api } from './api';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

/**
 * Submit contact form
 */
export const submitContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
  return api.post<ApiResponse>('/api/contact', data);
};
