import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation}: any) => {
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [alertHistory, setAlertHistory] = useState([]);

  useEffect(() => {
    loadSettings();
    loadAlertHistory();
  }, []);

  const loadSettings = async () => {
    try {
      const vibration = await AsyncStorage.getItem('vibrationEnabled');
      if (vibration !== null) {
        setVibrationEnabled(vibration === 'true');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadAlertHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('alertHistory');
      if (history) {
        setAlertHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading alert history:', error);
    }
  };

  const toggleVibration = async (value: boolean) => {
    setVibrationEnabled(value);
    try {
      await AsyncStorage.setItem('vibrationEnabled', value.toString());
    } catch (error) {
      console.error('Error saving vibration setting:', error);
    }
  };

  const clearAlertHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all alert history?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.setItem('alertHistory', '[]');
              setAlertHistory([]);
            } catch (error) {
              console.error('Error clearing history:', error);
            }
          },
        },
      ]
    );
  };

  const resetApp = () => {
    Alert.alert(
      'Reset App',
      'This will delete all your emergency contacts and settings. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{name: 'OnboardingOne'}],
              });
            } catch (error) {
              console.error('Error resetting app:', error);
              Alert.alert('Error', 'Failed to reset app');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alert Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Vibration Feedback</Text>
            <Text style={styles.settingDescription}>
              Vibrate when sending emergency alerts
            </Text>
          </View>
          <Switch
            value={vibrationEnabled}
            onValueChange={toggleVibration}
            trackColor={{false: '#D1D5DB', true: '#FCA5A5'}}
            thumbColor={vibrationEnabled ? '#DC2626' : '#9CA3AF'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alert History</Text>
        
        {alertHistory.length === 0 ? (
          <Text style={styles.emptyText}>No emergency alerts sent yet</Text>
        ) : (
          <>
            <Text style={styles.historyCount}>
              Total alerts sent: {alertHistory.length}
            </Text>
            <TouchableOpacity
              style={styles.dangerButton}
              onPress={clearAlertHistory}>
              <Text style={styles.dangerButtonText}>Clear History</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage</Text>
        
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('ContactsManager')}>
          <Text style={styles.menuItemText}>Emergency Contacts</Text>
          <Text style={styles.menuItemIcon}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>App Name</Text>
          <Text style={styles.infoValue}>ResQLink</Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚠️ ResQLink complements emergency services. Always call your local 
            emergency number (911, 112, etc.) in life-threatening situations.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetApp}>
          <Text style={styles.resetButtonText}>Reset App</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 ResQLink. Stay Safe.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 20,
  },
  historyCount: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 15,
  },
  dangerButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 8,
  },
  dangerButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  menuItemIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  disclaimer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 18,
  },
  resetButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default SettingsScreen;
