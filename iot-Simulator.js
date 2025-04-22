const axios = require('axios');
const fs = require('fs');

const BACKEND_URL = 'http://localhost:3000/api/system-data';
const SIMULATION_INTERVAL = 120000;
const LOG_FILE = './iot-system-logs.json';

function generatePCData() {
  const pcBrands = ["Dell", "HP", "Lenovo", "ASUS", "Acer", "Apple", "MSI", "Gigabyte"];
  const gpuModels = ["NVIDIA GeForce RTX 3080", "NVIDIA GeForce RTX 2060", "AMD Radeon RX 6800", "Intel Iris Xe Graphics", "NVIDIA GeForce GTX 1660", "AMD Radeon RX 5700 XT"];
  const cpuModels = ["Intel Core i7-11700K", "AMD Ryzen 9 5900X", "Intel Core i5-10400", "AMD Ryzen 7 3700X", "Intel Core i9-12900K", "Apple M1 Pro"];
  const osList = ["Windows 11 Pro", "Windows 10 Home", "Ubuntu 22.04 LTS", "macOS Monterey", "Fedora 36"];
  const bluetoothVersions = ["5.2", "5.0", "4.2", "4.0", "5.3"];
  
  const ramSizes = [4, 8, 16, 32, 64];
  const ramSize = ramSizes[Math.floor(Math.random() * ramSizes.length)];
  
  const networkTypes = ["Ethernet", "Wi-Fi 6", "Wi-Fi 5", "Wi-Fi 4"];
  const networkType = networkTypes[Math.floor(Math.random() * networkTypes.length)];
  const networkSpeed = Math.floor(Math.random() * 900) + 100; // entre 100 et 1000 mo la seconde 
  
  const batteryLevel = Math.floor(Math.random() * 100) + 1; // entre 1% et 100%
  const chargingStatus = Math.random() > 0.3 ? "En charge" : "Sur batterie";
  const batteryHealth = Math.floor(Math.random() * 20) + 80; // entre 80% et 100%
  
  return {
    deviceId: "pc-monitor-001",
    timestamp: new Date().toISOString(),
    systemInfo: {
      brand: pcBrands[Math.floor(Math.random() * pcBrands.length)],
      graphicsCard: gpuModels[Math.floor(Math.random() * gpuModels.length)],
      ram: {
        size: ramSize,
        unit: "GB",
        type: "DDR4",
        usage: Math.floor(Math.random() * (ramSize * 0.8))
      },
      cpu: {
        model: cpuModels[Math.floor(Math.random() * cpuModels.length)],
        cores: Math.pow(2, Math.floor(Math.random() * 3) + 2), // 4, 8 ou 16 cœurs
        temperature: Math.floor(Math.random() * 25) + 40, // Entre 40°C et 65°C
        usage: Math.floor(Math.random() * 100) // Utilisation de 0% à 100%
      },
      network: {
        type: networkType,
        speed: networkSpeed,
        unit: "Mbps",
        connected: Math.random() > 0.05 // 95% du temps connecté
      },
      bluetooth: {
        version: bluetoothVersions[Math.floor(Math.random() * bluetoothVersions.length)],
        enabled: Math.random() > 0.2, // 80% du temps activé
        connectedDevices: Math.floor(Math.random() * 3) // 0 à 2 appareils connectés
      },
      os: {
        name: osList[Math.floor(Math.random() * osList.length)],
        buildNumber: `${Math.floor(Math.random() * 500) + 19000}`,
        lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString().split('T')[0] // Date de mise à jour aléatoire dans les 30 derniers jours
      },
      battery: {
        level: batteryLevel,
        status: chargingStatus,
        health: batteryHealth,
        estimatedRuntime: chargingStatus === "Sur batterie" ? Math.floor(Math.random() * 240) + 60 : null // Minutes restantes si sur batterie
      }
    }
  };
}

// Fonction pour envoyer les données au backend
async function sendDataToBackend() {
  try {
    const data = generatePCData();
    
    // Afficher les données générées dans la console
    console.log(`[${data.timestamp}] Données générées:`, JSON.stringify(data, null, 2));
    
    // Enregistrer dans un fichier local (pour le débogage)
    fs.appendFileSync(LOG_FILE, JSON.stringify(data) + '\n');
    
    // Envoyer les données au backend
    const response = await axios.post(BACKEND_URL, data);
    console.log(`[${data.timestamp}] Données envoyées au backend, statut:`, response.status);
  } catch (error) {
    console.error(`Erreur lors de l'envoi des données:`, error.message);
    // En cas d'erreur, enregistrer quand même les données localement
    fs.appendFileSync(LOG_FILE, JSON.stringify({
      error: true,
      timestamp: new Date().toISOString(),
      message: error.message,
      data: generatePCData()
    }) + '\n');
  }
}

// Initialiser le fichier de logs
console.log(`Initialisation du simulateur IoT de surveillance PC...`);
fs.writeFileSync(LOG_FILE, '');

// Démarrer la simulation
console.log(`Simulateur IoT démarré! Intervalle: ${SIMULATION_INTERVAL/1000} secondes`);
console.log(`Envoi des données à: ${BACKEND_URL}`);

// Exécuter immédiatement une première fois
sendDataToBackend();

// Puis configurer l'intervalle régulier
setInterval(sendDataToBackend, SIMULATION_INTERVAL);