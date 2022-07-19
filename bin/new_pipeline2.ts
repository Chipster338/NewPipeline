#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NewPipeline2Stack } from '../lib/new_pipeline2-stack';

const app = new cdk.App();
new NewPipeline2Stack(app, 'NewPipeline2Stack', {
  env: {
    account: '451255536186',
    region: 'us-east-1',
  }
});

app.synth();