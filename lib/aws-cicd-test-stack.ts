import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
// import { MyPipelineAppStage } from './stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCicdTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const pipeline = new CodePipeline(this, 'Pipeline', {
    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('AndroidDoctorr/aws-cicd-test', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npm cdk synth'
        ]
      }),
    });
  }
}
