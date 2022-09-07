export const BASE_URL = 'https://api.bitbucket.org/2.0';

export const getDeploymentsUrl = (
  workspaceSlug: string,
  repositorySlug: string
) =>
  `${BASE_URL}/repositories/${workspaceSlug}/${repositorySlug}/deployments/?`;

export const getEnvironmentsUrl = (
  workspaceSlug: string,
  repositorySlug: string
) =>
  `${BASE_URL}/repositories/${workspaceSlug}/${repositorySlug}/environments/?`;

export const getRepositoriesUrl = (workspaceSlug: string) =>
  `${BASE_URL}/repositories/${workspaceSlug}?`;

export const getWorkspaceUrl = () => `${BASE_URL}/workspaces`;
export const getUserUrl = () => `${BASE_URL}/user`;
