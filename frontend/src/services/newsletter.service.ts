import { api } from './api';

interface SubscribeData {
  email: string;
  name?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

/**
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (data: SubscribeData): Promise<ApiResponse> => {
  return api.post<ApiResponse>('/api/newsletter/subscribe', data);
};

/**
 * Unsubscribe from newsletter
 */
export const unsubscribeFromNewsletter = async (email: string): Promise<ApiResponse> => {
  return api.delete<ApiResponse>(`/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`);
};
