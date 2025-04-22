const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
function run() {
  // 1 Get the inputs
  const bucket = core.getInput('bucket', { required: true });
  const region = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2 Upload files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${region}`);

  const deployedUrl = `https://${bucket}.s3-website-${region}.amazonaws.com`;
  // 3 Set output
  core.setOutput('deployed-url', deployedUrl);
}

run();
