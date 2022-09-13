import { FaCheck, FaPencilAlt, FaThumbsUp } from 'react-icons/fa';
import { TiCloudStorage } from 'react-icons/ti';
import { IPullRequestWithActivity } from '../types';
import { convertToHour12, durationShortener, getDateTimeInterval } from '../utils/dateFormat';

interface IProps {
  pullRequest: IPullRequestWithActivity;
}

export default function spanline({ pullRequest }: IProps) {
  const { created, approval, comment, merged } = pullRequest;

  const commentDuration = comment && getDateTimeInterval(created, comment);
  const approvalDuration = approval && getDateTimeInterval(created, approval);
  const mergedDuration = merged && getDateTimeInterval(created, merged);

  const generateLeadTimeContent = (value: string) => {
    const valueColor = value.includes('days') ? 'text-red-600' : 'text-green-600';

    return (
      <span className={`block text-xs font-bold leading-none pt-1 ${valueColor}`}>
        {durationShortener(value)}
      </span>
    );
  };

  return (
    <ol className='items-center sm:flex'>
      <li className='relative mb-6 sm:mb-0'>
        <div className='flex items-center'>
          <div className='flex z-10 justify-center items-center w-6 h-6 bg-gray-800 rounded-full ring-0 ring-white shrink-0'>
            <FaCheck color='white' size={10} />
          </div>
          <div className='hidden sm:flex w-full bg-gray-200 h-0.5'></div>
        </div>
        <div className='mt-3 sm:pr-8 mb-3'>
          <h3 className='text-xs font-semibold text-gray-900 pb-1'>Created</h3>
          <span className='block text-xs font-normal leading-none text-gray-400'>
            {convertToHour12(created)}
          </span>
        </div>
      </li>

      {comment && (
        <li className='relative mb-6 sm:mb-0'>
          <div className='flex items-center'>
            <div className='flex z-10 justify-center items-center w-6 h-6 bg-gray-800 rounded-full ring-0 ring-white shrink-0'>
              <FaPencilAlt color='white' size={10} />
            </div>
            <div className='hidden sm:flex w-full bg-gray-200 h-0.5'></div>
          </div>
          <div className='mt-3 sm:pr-8'>
            <h3 className='text-xs font-semibold text-gray-900 pb-1'>First comment</h3>
            <span className='block text-xs font-normal leading-none text-gray-400'>
              {convertToHour12(comment)}
            </span>
            {generateLeadTimeContent(commentDuration)}
          </div>
        </li>
      )}

      {approval && (
        <li className='relative mb-6 sm:mb-0'>
          <div className='flex items-center'>
            <div className='flex z-10 justify-center items-center w-6 h-6 bg-gray-800 rounded-full ring-0 ring-white shrink-0'>
              <FaThumbsUp color='white' size={10} />
            </div>
            <div className='hidden sm:flex w-full bg-gray-200 h-0.5'></div>
          </div>
          <div className='mt-3 sm:pr-8'>
            <h3 className='text-xs font-semibold text-gray-900 pb-1'>First approval</h3>
            <span className='block text-xs font-normal leading-none text-gray-400'>
              {convertToHour12(approval)}
            </span>
            {generateLeadTimeContent(approvalDuration)}
          </div>
        </li>
      )}

      {merged && (
        <li className='relative mb-6 sm:mb-0'>
          <div className='flex items-center'>
            <div className='flex z-10 justify-center items-center w-6 h-6 bg-gray-800 rounded-full ring-0 ring-white shrink-0'>
              <TiCloudStorage color='white' size={15} />
            </div>
          </div>
          <div className='mt-3 sm:pr-8'>
            <h3 className='text-xs font-semibold text-gray-900 pb-1'>Merged</h3>
            <span className='block text-xs font-normal leading-none text-gray-400'>
              {convertToHour12(merged)}
            </span>
            {generateLeadTimeContent(mergedDuration)}
          </div>
        </li>
      )}
    </ol>
  );
}
