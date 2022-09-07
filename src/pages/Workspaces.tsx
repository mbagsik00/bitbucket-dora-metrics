import { useEffect, useState } from 'react';
import { useWorkspaces } from '../apis/workspaces';
import ErrorToastr from '../components/ErrorToastr';
import LoadingSpinner from '../components/LoadingSpinner';
import Layout from '../modules/Layout';
import LoggedInUserContainer from '../modules/LoggedInUserContainer';
import WorkspaceList from '../modules/WorkspaceList';
import { IWorkspace } from '../types';

export default function Workspaces() {
  const { status, data, error } = useWorkspaces();
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);

  useEffect(() => {
    const mappedWorkspaces = data
      ? data.map((workspace: any) => ({
          id: workspace.id,
          slug: workspace.slug,
          name: workspace.name,
          isPrivate: workspace.is_private,
        }))
      : [];

    setWorkspaces(mappedWorkspaces);
  }, [data]);

  return (
    <LoggedInUserContainer>
      <Layout
        headerText={
          <h1 className='text-xl tracking-tight font-bold text-gray-900'>
            Workspaces
          </h1>
        }
      >
        {status === 'loading' ? (
          <LoadingSpinner />
        ) : status === 'error' ? (
          <ErrorToastr message={error instanceof Error ? error.message : ''} />
        ) : (
          <WorkspaceList workspaces={workspaces} />
        )}
      </Layout>
    </LoggedInUserContainer>
  );
}
