// Fichier: App.js
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  RefreshControl, 
  ActivityIndicator, 
  StatusBar,
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Constantes de l'application
const API_URL = 'http://172.20.10.5:3000/system-info'; // Utilise 10.0.2.2 pour Android Emulator, ou 'localhost' pour web ou iOS
// Si tu exécutes sur un appareil physique, tu devras utiliser l'adresse IP de ton ordinateur

export default function App() {
  const [systemData, setSystemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);

  // Fonction pour récupérer les données du backend
  const fetchData = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setSystemData(data.reverse()); // Pour afficher les plus récentes en premier
      
      // Si aucun système n'est sélectionné, sélectionne le premier
      if (data.length > 0 && !selectedSystem) {
        setSelectedSystem(data[0]);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Récupérer les données au chargement de l'app
  useEffect(() => {
    fetchData();
  }, []);

  // Fonction pour rafraîchir les données
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Fonction pour sélectionner un système
  const selectSystem = (system) => {
    setSelectedSystem(system);
  };

  // Rendu de l'interface
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Moniteur PC IoT</Text>
        <TouchableOpacity onPress={fetchData} style={styles.refreshButton}>
          <MaterialIcons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Affichage de l'erreur s'il y en a une */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Erreur: {error}. Vérifiez que le backend est bien lancé.
          </Text>
        </View>
      )}
      
      {/* Indicateur de chargement */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066ff" />
          <Text style={styles.loadingText}>Chargement des données...</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {/* Liste des systèmes (dernier relevé de chaque PC) */}
          <View style={styles.systemListContainer}>
            <Text style={styles.sectionTitle}>Relevés ({systemData.length})</Text>
            <ScrollView 
              horizontal 
              style={styles.systemList}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {systemData.map((system, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.systemCard,
                    selectedSystem === system && styles.selectedSystemCard
                  ]}
                  onPress={() => selectSystem(system)}
                >
                  <Text style={styles.systemCardTitle}>{system.brand || 'PC'}</Text>
                  <Text style={styles.systemCardSubtitle}>
                    {system.os?.name || 'OS non spécifié'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Détails du système sélectionné */}
          {selectedSystem ? (
            <ScrollView 
              style={styles.detailsContainer}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {/* Information sur le PC */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <MaterialIcons name="computer" size={24} color="#0066ff" />
                  <Text style={styles.sectionCardTitle}>Informations PC</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Marque:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.brand || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Carte graphique:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.graphicsCard || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>RAM:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.ram?.size || 'N/A'} Go</Text>
                </View>
              </View>
              
              {/* Section CPU */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <MaterialIcons name="memory" size={24} color="#0066ff" />
                  <Text style={styles.sectionCardTitle}>Processeur</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Modèle:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.cpu?.model || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cœurs:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.cpu?.cores || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Température:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.cpu?.temperature ? `${selectedSystem.cpu.temperature}°C` : 'N/A'}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Utilisation:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.cpu?.usage !== undefined ? `${selectedSystem.cpu.usage}%` : 'N/A'}
                  </Text>
                </View>
              </View>
              
              {/* Section Système d'exploitation */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <FontAwesome5 name="windows" size={22} color="#0066ff" />
                  <Text style={styles.sectionCardTitle}>Système d'exploitation</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>OS:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.os?.name || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Build:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.os?.buildNumber || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Dernière MAJ:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.os?.lastUpdate || 'N/A'}</Text>
                </View>
              </View>
              
              {/* Section Réseau */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <MaterialIcons name="wifi" size={24} color="#0066ff" />
                  <Text style={styles.sectionCardTitle}>Réseau</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.network?.type || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Vitesse:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.network?.speed ? 
                      `${selectedSystem.network.speed} ${selectedSystem.network.unit || 'Mbps'}` : 
                      'N/A'}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>État:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.network?.connected !== undefined ? 
                      (selectedSystem.network.connected ? 'Connecté' : 'Déconnecté') : 
                      'N/A'}
                  </Text>
                </View>
              </View>
              
              {/* Section Bluetooth */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <FontAwesome5 name="bluetooth" size={20} color="#0066ff" />
                  <Text style={styles.sectionCardTitle}>Bluetooth</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Version:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.bluetooth?.version || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>État:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.bluetooth?.enabled !== undefined ? 
                      (selectedSystem.bluetooth.enabled ? 'Activé' : 'Désactivé') : 
                      'N/A'}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Appareils connectés:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.bluetooth?.connectedDevices !== undefined ? 
                      selectedSystem.bluetooth.connectedDevices : 
                      'N/A'}
                  </Text>
                </View>
              </View>
              
              {/* Section Batterie */}
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <MaterialIcons name="battery-full" size={24} color="#0066ff" />
                  <Text style={styles.sectionCardTitle}>Batterie</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Niveau:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.battery?.level !== undefined ? 
                      `${selectedSystem.battery.level}%` : 
                      'N/A'}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>État:</Text>
                  <Text style={styles.infoValue}>{selectedSystem.battery?.status || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Santé:</Text>
                  <Text style={styles.infoValue}>
                    {selectedSystem.battery?.health !== undefined ? 
                      `${selectedSystem.battery.health}%` : 
                      'N/A'}
                  </Text>
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={styles.noSystemContainer}>
              <Text style={styles.noSystemText}>
                Aucun système sélectionné ou aucune donnée disponible.
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

// Styles de l'application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#0066ff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 5,
  },
  errorContainer: {
    backgroundColor: '#ffeeee',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff3333',
  },
  errorText: {
    color: '#cc0000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  contentContainer: {
    flex: 1,
  },
  systemListContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  systemList: {
    flexDirection: 'row',
  },
  systemCard: {
    backgroundColor: 'white',
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedSystemCard: {
    borderWidth: 2,
    borderColor: '#0066ff',
  },
  systemCardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  systemCardSubtitle: {
    color: '#666',
    fontSize: 12,
  },
  detailsContainer: {
    flex: 1,
    padding: 15,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontWeight: '500',
    color: '#333',
    flex: 2,
  },
  noSystemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noSystemText: {
    color: '#999',
    textAlign: 'center',
  },
});