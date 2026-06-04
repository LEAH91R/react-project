import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface TestCase {
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  testCases: TestCase[];
  createdAt: Date;
}

export interface Submission {
  _id: string;
  userId: string;
  challengeId: string;
  code: string;
  result?: string;
  status: 'queued' | 'running' | 'passed' | 'failed';
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// Auth endpoints
export const register = (payload: { username: string; email: string; password: string }) =>
  api.post<ApiResponse<{ message: string }>>('/auth/register', payload);

export const login = (payload: { email: string; password: string }) =>
  api.post<ApiResponse<AuthResponse>>('/auth/login', payload);

// Challenge endpoints
export const listChallenges = (query?: { page?: string; limit?: string; search?: string; difficulty?: string; category?: string }) =>
  api.get<ApiResponse<PaginatedResponse<Challenge>>>('/challenges', { params: query });

export const getChallenge = (id: string) =>
  api.get<ApiResponse<Challenge>>(`/challenges/${id}`);

// Submission endpoints
export const createSubmission = (payload: { challengeId: string; code: string }) =>
  api.post<ApiResponse<Submission>>('/submissions', payload);

export const listSubmissions = (query?: { page?: string; limit?: string; search?: string; status?: string }) =>
  api.get<ApiResponse<PaginatedResponse<Submission>>>('/submissions', { params: query });

export const getSubmission = (id: string) =>
  api.get<ApiResponse<Submission>>(`/submissions/${id}`);

// Legacy code endpoints (for CodeList component)
export const fetchCodes = () => api.get('/codes');
export const runCode = (payload: { code: string; expectedTime: number }) => api.post('/codes', payload);

export default api;
