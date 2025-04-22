const { spawn } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');
const iotPath = path.join(__dirname, 'pc-monitor-iot');

console.log('Démarrage de l\'application Todo-CICD...');
console.log('-------------------------------------------');

const backend = spawn('npm', ['start'], {
  cwd: backendPath,
  stdio: 'inherit',
  shell: true
});

console.log('Backend démarré!');

setTimeout(() => {
  console.log('-------------------------------------------');
  console.log('Démarrage du simulateur IoT...');
  
  const iot = spawn('node', ['iot-Simulator.js'], {
    cwd: iotPath,
    stdio: 'inherit',
    shell: true
  });

  console.log('Simulateur IoT démarré!');

  process.on('SIGINT', () => {
    console.log('-------------------------------------------');
    console.log('Arrêt des services...');
    backend.kill('SIGINT');
    iot.kill('SIGINT');
    process.exit(0);
  });
}, 5000);