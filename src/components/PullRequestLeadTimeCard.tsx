import { IPullRequestWithActivity } from '../types';
import { durationShortener, getDateTimeInterval } from '../utils/dateFormat';

interface IProps {
  pullRequest: IPullRequestWithActivity;
}

export default function PullRequestLeadTimeCard({ pullRequest }: IProps) {
  const { created, approval, comment, merged } = pullRequest;

  const commentDuration = comment && getDateTimeInterval(created, comment);
  const approvalDuration = approval && getDateTimeInterval(created, approval);
  const mergedDuration = merged && getDateTimeInterval(created, merged);

  const generateLeadTimeContent = (name: string, value: string) => {
    const valueColor = value.includes('days')
      ? 'text-red-600'
      : 'text-green-600';

    return (
      <>
        <div className='text-xs text-left font-bold text-black'>{name}</div>
        <div className={`text-left font-medium ${valueColor}`}>
          {durationShortener(value)}
        </div>
      </>
    );
  };

  return (
    <div className='pr-4 p-2'>
      <>
        {!commentDuration && !approvalDuration && !mergedDuration && '-'}
        {commentDuration &&
          generateLeadTimeContent('First Comment', commentDuration)}
        {approvalDuration &&
          generateLeadTimeContent('First Approval', approvalDuration)}
        {mergedDuration && generateLeadTimeContent('Merged', mergedDuration)}
      </>
    </div>
  );
}
