import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRepositories } from '../apis/repositories';
import Breadcrumbs from '../components/Breadcrumbs';
import ErrorToastr from '../components/ErrorToastr';
import LoadingSpinner from '../components/LoadingSpinner';
import Layout from '../modules/Layout';
import LoggedInUserContainer from '../modules/LoggedInUserContainer';
import RepositoryList from '../modules/RepositoryList';
import { IRepository } from '../types';

export default function Repositories() {
  const { workspaceSlug } = useParams();
  const { status, data, error } = useRepositories(workspaceSlug!);

  const [repositories, setRepositories] = useState<IRepository[]>([]);

  useEffect(() => {
    const mappedRepositories: IRepository[] = data
      ? data.map((repository: any) => ({
          id: repository.uuid,
          name: repository.name,
          description: repository.description,
          slug: repository.slug,
          updatedOn: repository.updated_on,
          workspaceSlug: workspaceSlug,
        }))
      : [];

    setRepositories(mappedRepositories);
  }, [data, workspaceSlug]);

  return (
    <LoggedInUserContainer>
      <Layout
        headerText={
          <h1 className='text-xl tracking-tight text-gray-900'>
            <span className='font-bold'>Workspace: </span>
            <span>{workspaceSlug}</span>
          </h1>
        }
      >
        <>
          <Breadcrumbs
            history={[
              { name: 'Workspaces', href: '/' },
              { name: 'Repositories', href: '/' },
            ]}
          />

          {status === 'loading' ? (
            <LoadingSpinner />
          ) : status === 'error' ? (
            <ErrorToastr
              message={error instanceof Error ? error.message : ''}
            />
          ) : (
            <RepositoryList repositories={repositories} />
          )}
        </>
      </Layout>
    </LoggedInUserContainer>
  );
}
