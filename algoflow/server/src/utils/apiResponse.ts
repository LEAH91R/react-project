import { ApiResponse } from '../types';

export const successResponse = <T>(data: T, message = 'success'): ApiResponse<T> => ({
  status: 'success',
  message,
  data,
});

export const errorResponse = (message = 'Internal server error', errors?: unknown): ApiResponse<null> => ({
  status: 'error',
  message,
  errors: errors ?? null,
});
