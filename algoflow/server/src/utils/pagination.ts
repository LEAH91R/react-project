import { PaginatedQuery } from '../types';

export const buildPagination = (query: Record<string, unknown>): PaginatedQuery => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 20);
  const correctedPage = Number.isNaN(page) || page < 1 ? 1 : page;
  const correctedLimit = Number.isNaN(limit) || limit < 1 ? 20 : limit;

  return {
    page: correctedPage,
    limit: correctedLimit,
    skip: (correctedPage - 1) * correctedLimit,
  };
};
