import { Octokit } from "@octokit/core";
const token = "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";

export const getGitHubRepos = async (query: string, page: number) => {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    return await octokit.request("GET /search/repositories", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      q: query,
      page: page,
    });
  } catch (error) {
    console.error(error);
    throw "發生錯誤，請稍後再試";
  }
};
