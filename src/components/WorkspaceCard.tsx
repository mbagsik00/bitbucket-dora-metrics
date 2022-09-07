import { GoDatabase } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { IWorkspace } from '../types';

interface IProps {
  workspace: IWorkspace;
}

export default function WorkspaceCard({ workspace }: IProps) {
  const { slug, name, isPrivate } = workspace;

  return (
    <div className='shadow-lg rounded-2xl w-full p-4 bg-gray-50 relative overflow-hidden'>
      <GoDatabase
        className='absolute -right-4 -bottom-4 h-20 w-20 mb-4'
        color='#0052cc'
      />
      <div className='w-4/6'>
        <Link to={`/${slug}/repositories`}>
          <p className='text-gray-800 text-lg font-medium mb-2 hover:text-blue-500'>
            {name}
          </p>
        </Link>
        <p className='text-gray-400 text-xs'>
          <span className='px-1 py-1 text-sm rounded text-white  bg-blue-500'>
            {isPrivate ? 'Private' : 'Public'}
          </span>
        </p>
      </div>
    </div>
  );
}
