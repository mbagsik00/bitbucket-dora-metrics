import { PullRequestState } from './pullrequest';

export interface IWorkspace {
  id: string;
  slug: string;
  name: string;
  isPrivate: boolean;
}

export interface IRepository {
  id: string;
  name: string;
  description: string;
  slug: string;
  updatedOn: string;
  workspaceSlug: string;
}

export interface IPullRequest {
  id: string;
  title: string;
  created: string;
  state: PullRequestState;
}

export interface IPullRequestMetrics {
  open: string;
  merged: string;
  declined: string;
}

export interface IPullRequestWithActivity extends IPullRequest {
  comment: string;
  approval: string;
  merged: string;
}

export enum DeploymentStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
}
