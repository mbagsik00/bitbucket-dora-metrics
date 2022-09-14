import Layout from '../modules/Layout';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import LoggedInUserContainer from '../modules/LoggedInUserContainer';
import DeploymentMetric from '../modules/DeploymentMetric';
import PullRequestContainer from '../modules/PullRequestContainer';
import EnvironmentsDropdown from '../components/EnvironmentsDropdown';
import { useEnvironments } from '../apis/environments';
import { useEffect, useState } from 'react';

// TODO: Add date range here
export default function Dashboard() {
  const { workspaceSlug, repositorySlug } = useParams();
  const [environmentList, setEnvironmentList] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<
    { name: string; uuid: string } | undefined
  >(undefined);

  const { data } = useEnvironments({
    workspaceSlug: workspaceSlug!,
    repositorySlug: repositorySlug!
  });

  useEffect(() => {
    setEnvironmentList(data?.values.map((env: any) => ({ name: env.name, uuid: env.uuid })));
  }, [data]);

  useEffect(() => {
    const prodEnvironment = environmentList?.find((env: any) =>
      ['production', 'prod'].includes(env.name.toLowerCase())
    );

    setSelectedEnvironment(prodEnvironment);
  }, [environmentList]);

  const header = (
    <>
      <h1 className='text-xl tracking-tight text-gray-900'>
        <span className='font-bold'>Workspace: </span>
        <span>{workspaceSlug}</span>
      </h1>
      <h2 className='text-xl tracking-tight text-gray-900'>
        <span className='font-bold'>Repository: </span>
        <span>{repositorySlug}</span>
      </h2>
    </>
  );

  return (
    <LoggedInUserContainer>
      <Layout headerText={header}>
        <>
          <div className='flex flex-wrap overflow-hidden'>
            <div className='w-1/2 overflow-hidden m-auto'>
              <Breadcrumbs
                history={[
                  { name: 'Workspaces', href: '/' },
                  {
                    name: 'Repositories',
                    href: `/${workspaceSlug}/repositories`
                  },
                  { name: repositorySlug! }
                ]}
              />
            </div>

            <div className='w-1/2 overflow-hidden'>
              <div className='float-right'>
                <EnvironmentsDropdown
                  environmentList={environmentList}
                  environment={selectedEnvironment}
                  setSelectedEnvironment={setSelectedEnvironment}
                />
              </div>
            </div>
          </div>

          {selectedEnvironment && (
            <DeploymentMetric
              workspaceSlug={workspaceSlug!}
              repositorySlug={repositorySlug!}
              environment={{ name: selectedEnvironment.name, uuid: selectedEnvironment.uuid }}
            />
          )}
          <PullRequestContainer workspaceSlug={workspaceSlug!} repositorySlug={repositorySlug!} />
        </>
      </Layout>
    </LoggedInUserContainer>
  );
}
