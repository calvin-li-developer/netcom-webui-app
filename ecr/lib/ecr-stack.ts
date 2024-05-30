import { aws_ecr as ecr, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cfnRepository = new ecr.CfnRepository(this, 'MyCfnRepository', /* all optional props */ {
      emptyOnDelete: false,
      imageScanningConfiguration: {
        scanOnPush: true,
      },
      repositoryName: 'calvinrepo',
    });
  }
} 
