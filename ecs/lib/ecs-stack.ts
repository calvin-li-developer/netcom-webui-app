import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from  'aws-cdk-lib/aws-ecs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // refering to existing vpc 
    const vpc = ec2.Vpc.fromLookup(this,'existing-vpc', {
      vpcId: 'vpc-063afa0c24ec80cb8'
    });
    // defining ECS cluster info 
    const cluster = new ecs.Cluster(this,'ecs-cluster',{
      clusterName: 'calvinli-ecs-by-cdk',
      vpc: vpc,
      enableFargateCapacityProviders: true ,
      containerInsights: true // enable cloudwatch monitoring 
    });

    // task Definition of farget launch type 
    const taskDef = new ecs.FargateTaskDefinition(this,'task-def1',{
      cpu:  256,
      memoryLimitMiB: 512
    });
    // adding container info 
    const container = taskDef.addContainer('container-def1',{
      image: ecs.ContainerImage.fromRegistry('calvinlideveloper/netcompythonapp:v1717086447'),
      memoryLimitMiB: 256,
    });
  }
}
