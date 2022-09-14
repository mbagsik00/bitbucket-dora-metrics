import { IPullRequestWithActivity } from '../types';

export const pullRequestWithActivityMapper = (
  pullrequest: Record<string, any>
): IPullRequestWithActivity => {
  const record = {
    id: pullrequest.id,
    title: pullrequest.title,
    created: pullrequest.created_on,
    state: pullrequest.state,
    author: pullrequest.author,
    // Data below are coming from the PR activity
    comment: '',
    approval: '',
    merged: ''
  };

  const updates: Record<string, any>[] = [];
  const approvals: Record<string, any>[] = [];
  const comments: Record<string, any>[] = [];

  pullrequest.activities.forEach((data: Record<string, any>) => {
    if (data.update) {
      updates.push(data);
    }

    if (data.comment) {
      comments.push(data);
    }

    if (data.approval) {
      approvals.push(data);
    }
  });

  const firstComment = comments[comments.length - 1]?.comment.created_on;
  const firstApproval = approvals[approvals.length - 1]?.approval.date;
  const merged = updates.find((pr) => pr.update.state === 'MERGED')?.update.date;

  record.comment = firstComment;
  // ? new Date(firstComment).toLocaleString('en-NZ', { hour12: true })
  // : '';

  record.approval = firstApproval;
  // ? new Date(firstApproval).toLocaleString('en-NZ', { hour12: true })
  // : '';

  record.merged = merged;
  // ? new Date(merged).toLocaleString('en-NZ', { hour12: true })
  // : '';

  return record;
};
