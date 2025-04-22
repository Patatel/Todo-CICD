const axios = require('axios');
const fs = require('fs');

const BACKEND_URL = 'http://localhost:3000/system-info';
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
    systemInfo: {
      brand: pcBrands[Math.floor(Math.random() * pcBrands.length)],
      graphicsCard: gpuModels[Math.floor(Math.random() * gpuModels.length)],
      ram: {
        size: ramSize
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
        health: batteryHealth
      }
    }
  };
}

// Pour stocker les données sous forme de tableau JSON
let allData = [];

// Vérifier si le fichier existe et contient des données valides
try {
  if (fs.existsSync(LOG_FILE)) {
    const fileContent = fs.readFileSync(LOG_FILE, 'utf8');
    if (fileContent) {
      try {
        allData = JSON.parse(fileContent);
        if (!Array.isArray(allData)) {
          allData = [];
        }
      } catch (e) {
        console.log('Le fichier de log existe mais n\'est pas un JSON valide. Création d\'un nouveau fichier.');
        allData = [];
      }
    }
  }
} catch (err) {
  console.log('Erreur lors de la lecture du fichier de log:', err);
  allData = [];
}

// Fonction pour envoyer les données au backend
async function sendDataToBackend() {
  try {
    const data = generatePCData();
    
    // Afficher les données générées dans la console (timestamp juste pour le log console)
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Données générées:`, JSON.stringify(data, null, 2));
    
    // Ajouter les données au tableau
    allData.push(data);
    
    // Enregistrer le tableau complet dans le fichier
    fs.writeFileSync(LOG_FILE, JSON.stringify(allData, null, 2));
    
    // Envoyer les données au backend
    try {
      const response = await axios.post(BACKEND_URL, data);
      console.log(`[${timestamp}] Données envoyées au backend, statut:`, response.status);
    } catch (error) {
      console.error(`Erreur lors de l'envoi des données au backend:`, error.message);
      // L'erreur d'envoi est déjà gérée et les données sont déjà enregistrées localement
    }
  } catch (error) {
    console.error(`Erreur lors de la génération des données:`, error.message);
    
    // En cas d'erreur, enregistrer l'erreur (sans timestamp dans les données)
    const errorData = {
      error: true,
      message: error.message
    };
    allData.push(errorData);
    fs.writeFileSync(LOG_FILE, JSON.stringify(allData, null, 2));
  }
}

// Initialiser le fichier de logs
console.log(`Initialisation du simulateur IoT de surveillance PC...`);
fs.writeFileSync(LOG_FILE, JSON.stringify(allData, null, 2));

// Démarrer la simulation
console.log(`Simulateur IoT démarré! Intervalle: ${SIMULATION_INTERVAL/1000} secondes`);
console.log(`Envoi des données à: ${BACKEND_URL}`);

// Exécuter immédiatement une première fois
sendDataToBackend();

// Puis configurer l'intervalle régulier
setInterval(sendDataToBackend, SIMULATION_INTERVAL);