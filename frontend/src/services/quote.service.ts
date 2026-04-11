import { api } from './api';

interface QuoteFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

/**
 * Submit quote request
 */
export const submitQuoteRequest = async (data: QuoteFormData): Promise<ApiResponse> => {
  return api.post<ApiResponse>('/api/quote', data);
};
