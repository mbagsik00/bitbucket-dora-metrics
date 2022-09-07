import WorkspaceCard from '../components/WorkspaceCard';
import { IWorkspace } from '../types';

interface IProps {
  workspaces: IWorkspace[];
}

export default function WorkspaceList({ workspaces }: IProps) {
  if (workspaces.length === 0) {
    return (
      <div className='text-center'>
        <h2 className='text-lg text-blue-500 font-semibold'>
          No records found.
        </h2>
      </div>
    );
  }

  return (
    <div className='flex flex-wrap -mx-2 overflow-hidden'>
      {workspaces
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((workspace) => {
          return (
            <div
              key={workspace.slug}
              className='my-3 px-3 pb-4 w-full overflow-hidden md:w-full lg:w-1/3 xl:w-1/3'
            >
              <WorkspaceCard workspace={workspace} />
            </div>
          );
        })}
    </div>
  );
}
