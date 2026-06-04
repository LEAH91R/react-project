import { env } from '../config/env';

const githubHeaders: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'algo-flow-server',
};

if (env.GITHUB_TOKEN) {
  githubHeaders.Authorization = `token ${env.GITHUB_TOKEN}`;
}

export const fetchGitHubRepository = async (owner: string, repo: string) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    method: 'GET',
    headers: githubHeaders,
  });

  if (!response.ok) {
    throw new Error(`GitHub repo fetch failed with ${response.status}`);
  }

  return response.json();
};
