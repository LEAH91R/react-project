export interface JwtPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

export interface PaginatedQuery {
  page: number;
  limit: number;
  skip: number;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: unknown;
}

export interface SubmissionTask {
  taskId: string;
  userId: string;
  payload: Record<string, unknown>;
  createdAt: number;
}
