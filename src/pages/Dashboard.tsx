import Layout from '../modules/Layout';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import LoggedInUserContainer from '../modules/LoggedInUserContainer';
import DeploymentMetric from '../modules/DeploymentMetric';
import PullRequestContainer from '../modules/PullRequestContainer';

export default function Dashboard() {
  const { workspaceSlug, repositorySlug } = useParams();

  const header = (
    <>
      <h1 className="text-xl tracking-tight text-gray-900">
        <span className="font-bold">Workspace: </span>
        <span>{workspaceSlug}</span>
      </h1>
      <h2 className="text-xl tracking-tight text-gray-900">
        <span className="font-bold">Repository: </span>
        <span>{repositorySlug}</span>
      </h2>
    </>
  );

  return (
    <LoggedInUserContainer>
      <Layout headerText={header}>
        <>
          <Breadcrumbs
            history={[
              { name: 'Workspaces', href: '/' },
              {
                name: 'Repositories',
                href: `/${workspaceSlug}/repositories`,
              },
              { name: repositorySlug! },
            ]}
          />

          <DeploymentMetric
            workspaceSlug={workspaceSlug!}
            repositorySlug={repositorySlug!}
          />

          <PullRequestContainer
            workspaceSlug={workspaceSlug!}
            repositorySlug={repositorySlug!}
          />
        </>
      </Layout>
    </LoggedInUserContainer>
  );
}
