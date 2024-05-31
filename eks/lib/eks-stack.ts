import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from  'aws-cdk-lib/aws-ecs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as eks from 'aws-cdk-lib/aws-eks'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // refering to existing vpc 
    const vpc = ec2.Vpc.fromLookup(this,'existing-vpc', {
      vpcId: 'vpc-063afa0c24ec80cb8'
      availabilityZones: ['us-east-1a','us-east-1b','us-east-1c'],
      publicSubnetIds: ['subnet-030435708c307f60c','subnet-0e1900e176370c252','subnet-0a3e4ba627e65ea53']
    });

    // creating security group 
    const secgroup = new ec2.SecurityGroup(this,'security-group2',{
      vpc: vpc,
      description: 'allow ingress rules for 8080 port'
    });
    secgroup.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(8080),'allow http traffic');

    // // adding Fargate Service
    // const service = new ecs.FargateService(this,'fargate-service1',{
    //   cluster: cluster,
    //   taskDefinition: taskDef,
    //   serviceName: 'calvin-svc-by-cdk',
    //   desiredCount: 1,
    //   assignPublicIp: true,
    //   securityGroups: [secgroup]   // attaching security group 
    // });

    // creating IAM role for EKS cluster -- control plane 
    const iamRole = new iam.Role(this,'iam-role1',{
      assumedBy: new iam.AccountRootPrincipal(),
    });

    // creating EKS cluster
    const cluster = new eks.Cluster(this,'calvin-eks-clustercdk',{
      vpc: vpc,
      version: eks.KubernetesVersion.V1_29,
      clusterName: 'calvin-cdk-eks-cluster',
      mastersRole: iamRole,
      endpointAccess: eks.EndpointAccess.PUBLIC_AND_PRIVATE,
      defaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.T3,ec2.InstanceSize.MEDIUM),
      defaultCapacity: 1,
      vpcSubnets: [{ subnetType: ec2.SubnetType.PUBLIC}],
      securityGroup: secgroup
      
    });

  }
}
