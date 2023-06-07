import { Octokit } from "@octokit/core";
const token = "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";

const validateQueryStatus = (status: number) => {
  if (status === 200) return;
  if (status === 304) return;
  if (status === 422) throw "查詢過於頻繁，請稍後再試";
  if (status === 503) throw "伺服器發生錯誤，請稍後再試";
  return;
};

export const getGitHubRepos = async (query: string, page: number) => {
  const octokit = new Octokit({
    auth: token,
  });

  const response = await octokit.request("GET /search/repositories", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    q: query,
    page: page,
  });

  validateQueryStatus(response.status);

  return response.data;
};
