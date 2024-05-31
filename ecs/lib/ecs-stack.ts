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

    const IMAGE_TAG = process.env.IMAGE_TAG as string;

    if (!IMAGE_TAG) {
      throw new Error("IMAGE TAG MISSING");
    }
    // adding container info 
    const container = taskDef.addContainer('container-def1',{
      image: ecs.ContainerImage.fromRegistry(`calvinlideveloper/netcomwebuiapp:${ IMAGE_TAG }`),
      memoryLimitMiB: 256,
    });

    // creating security group 
    const secgroup = new ec2.SecurityGroup(this,'security-group1',{
      vpc: vpc,
      description: 'allow ingress rules for 80 port'
    });
    secgroup.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(80),'allow http traffic');

    // adding Fargate Service
    const service = new ecs.FargateService(this,'fargate-service1',{
      cluster: cluster,
      taskDefinition: taskDef,
      serviceName: 'calvin-svc-by-cdk',
      desiredCount: 1,
      assignPublicIp: true,
      securityGroups: [secgroup]   // attaching security group 
    });

  }
}
