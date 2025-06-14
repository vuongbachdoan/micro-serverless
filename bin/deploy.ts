#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ConfigParser } from '../lib/config/parser';
import { MicroserviceStack } from '../lib/stacks/microservice-stack';
import { IngressStack } from '../lib/stacks/ingress-stack';

async function main() {
  // Parse command line arguments
  const argv = process.argv.slice(2);
  const serviceArg = argv.find(arg => arg.startsWith('--service='));
  const ingressArg = argv.find(arg => arg.startsWith('--ingress='));
  const specificService = serviceArg ? serviceArg.split('=')[1] : undefined;
  const specificIngress = ingressArg ? ingressArg.split('=')[1] : undefined;
  
  // Parse provider configuration
  const configParser = new ConfigParser();
  const providerConfig = await configParser.parseProvider();
  
  // Create CDK app with environment from provider config
  const app = new cdk.App();
  
  // Set environment for stacks
  const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: providerConfig.region
  };
  
  // Parse all service configurations
  const serviceConfigs = await configParser.parseAllServices(specificService);
  
  // Create a map to store Lambda functions by service name
  const serviceMap = new Map<string, lambda.Function>();
  
  // Create a stack for each service
  for (const serviceConfig of serviceConfigs) {
    const stackName = `${providerConfig.stackName}-${serviceConfig.name}`;
    const stack = new MicroserviceStack(app, stackName, {
      stackName,
      serviceConfig,
      providerConfig,  // Pass provider config to the stack
      env,
      description: `Stack for ${serviceConfig.name} microservice`,
      tags: providerConfig.tags
    });
    
    // Store the Lambda function in the map
    serviceMap.set(serviceConfig.name, stack.lambdaFunction);
  }
  
  // Parse all ingress configurations
  const ingressConfigs = await configParser.parseAllIngresses(specificIngress);
  
  // Create a stack for each ingress
  for (const ingressConfig of ingressConfigs) {
    const stackName = `${providerConfig.stackName}-${ingressConfig.name}-ingress`;
    new IngressStack(app, stackName, {
      stackName,
      ingressConfig,
      services: serviceMap,
      env,
      description: `Stack for ${ingressConfig.name} ingress`,
      tags: providerConfig.tags
    });
  }
  
  app.synth();
}

main().catch(error => {
  console.error('Deployment failed:', error);
  process.exit(1);
});