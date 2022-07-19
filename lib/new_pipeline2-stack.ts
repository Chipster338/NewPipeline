import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

export class NewPipeline2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Chipster338/NewPipeline', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
    pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "451255536186", region: "us-east-1" }
    }));
    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, 'testing', {
      env: { account: '451255536186', region: 'us-east-1' }
    }));
    testingStage.addPost(new ManualApprovalStep('approval'));
  }
}