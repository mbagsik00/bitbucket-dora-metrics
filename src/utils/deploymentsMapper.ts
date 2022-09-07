import isAfter from 'date-fns/isAfter';
import format from 'date-fns/format';
import { DeploymentStatus } from '../types';

interface IDeployment {
  startedOn: string;
}

export const deploymentMapper = ({ deployments, environments }: any): any => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 14);

  const successfulDeploymentDict: Record<string, IDeployment[]> = {};
  const failedDeploymentDict: Record<string, IDeployment[]> = {};

  const environmentMap = new Map<string, string>();

  environments.forEach((env: any) => environmentMap.set(env.uuid, env.name));

  deployments
    // Filter only within the last 2 weeks
    ?.filter((deployment: any) => {
      const deploymentDate = new Date(deployment.state.started_on);
      deploymentDate.setHours(24, 0, 0, 0);

      return isAfter(deploymentDate, startDate);
    })
    // group by environment uuid
    .forEach((deployment: any) => {
      // Only record successful deployments
      if (deployment.state.status.name !== DeploymentStatus.SUCCESSFUL) {
        return;
      }

      const deploymentStatus = deployment.state.status.name;
      const deploymentEnv = environmentMap.get(deployment.environment.uuid);

      if (deploymentEnv) {
        if (deploymentStatus === DeploymentStatus.SUCCESSFUL) {
          if (successfulDeploymentDict[deploymentEnv]) {
            const deploymentData = successfulDeploymentDict[deploymentEnv];

            deploymentData.push({
              startedOn: format(
                new Date(deployment.state.started_on),
                'dd/MM/yyyy'
              ),
            });
          } else {
            successfulDeploymentDict[deploymentEnv] = [
              {
                startedOn: format(
                  new Date(deployment.state.started_on),
                  'dd/MM/yyyy'
                ),
              },
            ];
          }
        }

        if (deploymentStatus === DeploymentStatus.FAILED) {
          if (failedDeploymentDict[deploymentEnv]) {
            const deploymentData = failedDeploymentDict[deploymentEnv];

            deploymentData.push({
              startedOn: format(
                new Date(deployment.state.started_on),
                'dd/MM/yyyy'
              ),
            });
          } else {
            failedDeploymentDict[deploymentEnv] = [
              {
                startedOn: format(
                  new Date(deployment.state.started_on),
                  'dd/MM/yyyy'
                ),
              },
            ];
          }
        }
      }
    });

  return {
    startDate: new Date(startDate),
    endDate: new Date(),
    successfulDeployments: successfulDeploymentDict,
    failedDeployments: failedDeploymentDict,
  };
};
