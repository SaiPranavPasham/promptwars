import { spawn } from 'node:child_process';

const childOptions = { stdio: 'inherit' };

function start(script) {
  if (process.platform === 'win32') {
    return spawn(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `npm run ${script}`], childOptions);
  }

  return spawn('npm', ['run', script], childOptions);
}

const processes = [
  start('server'),
  start('client')
];

let stopping = false;

function stop(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  processes.forEach((child) => child.kill());
  process.exit(exitCode);
}

processes.forEach((child) => {
  child.on('error', (error) => {
    console.error(`Failed to start development server: ${error.message}`);
    stop(1);
  });
  child.on('exit', (code) => {
    if (!stopping && code && code !== 0) stop(code);
  });
});

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
