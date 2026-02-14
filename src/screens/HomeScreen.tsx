import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
  PermissionsAndroid,
  Vibration,
  StatusBar,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SMSModule from '../components/SMSModule';

const {width, height} = Dimensions.get('window');

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const HomeScreen = ({navigation}: any) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadContacts();
    requestLocationPermission();
    startPulseAnimation();
    
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadContacts();
    });
    return unsubscribe;
  }, [navigation]);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const loadContacts = async () => {
    try {
      const savedContacts = await AsyncStorage.getItem('emergencyContacts');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'ResQLink needs access to your location for emergency alerts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Location error:', error);
        Alert.alert(
          'Location Error',
          'Unable to get your current location. Emergency alerts will be sent without location data.',
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    );
  };

  const startEmergencyCountdown = () => {
    if (contacts.length === 0) {
      Alert.alert(
        'No Emergency Contacts',
        'Please add emergency contacts before sending an alert.',
        [
          {text: 'Add Contacts', onPress: () => navigation.navigate('ContactsManager')},
          {text: 'Cancel', style: 'cancel'},
        ]
      );
      return;
    }

    setIsCountingDown(true);
    setCountdown(5);
    Vibration.vibrate(100);

    let count = 5;
    countdownTimerRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      Vibration.vibrate(100);

      if (count === 0) {
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
        }
        sendEmergencyAlert();
        setIsCountingDown(false);
      }
    }, 1000);
  };

  const cancelCountdown = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    setIsCountingDown(false);
    setCountdown(5);
    Vibration.vibrate(200);
  };

  const sendEmergencyAlert = async () => {
    try {
      // Refresh location before sending
      getCurrentLocation();

      const timestamp = new Date().toLocaleString();
      const locationText = currentLocation
        ? `https://maps.google.com/?q=${currentLocation.latitude},${currentLocation.longitude}`
        : 'Location unavailable';

      const message = `🚨 EMERGENCY ALERT from ResQLink 🚨\n\nI need immediate help!\n\nTime: ${timestamp}\nLocation: ${locationText}\n\nThis is an automated emergency message.`;

      let successCount = 0;
      
      for (const contact of contacts) {
        try {
          await SMSModule.sendSMS(contact.phone, message);
          successCount++;
        } catch (error) {
          console.error(`Failed to send SMS to ${contact.name}:`, error);
        }
      }

      Vibration.vibrate([0, 200, 100, 200]);

      Alert.alert(
        'Emergency Alert Sent',
        `Alert sent to ${successCount} of ${contacts.length} emergency contacts.`,
        [{text: 'OK'}]
      );

      // Save alert history
      saveAlertHistory(timestamp, successCount);

    } catch (error) {
      console.error('Error sending emergency alert:', error);
      Alert.alert(
        'Alert Failed',
        'There was an error sending the emergency alert. Please try again.',
        [{text: 'OK'}]
      );
    }
  };

  const saveAlertHistory = async (timestamp: string, contactCount: number) => {
    try {
      const history = await AsyncStorage.getItem('alertHistory');
      const historyArray = history ? JSON.parse(history) : [];
      historyArray.unshift({
        timestamp,
        contactCount,
        location: currentLocation,
      });
      // Keep only last 10 alerts
      if (historyArray.length > 10) {
        historyArray.pop();
      }
      await AsyncStorage.setItem('alertHistory', JSON.stringify(historyArray));
    } catch (error) {
      console.error('Error saving alert history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ResQLink</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('ContactsManager')}>
            <Text style={styles.settingsIcon}>👥</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {!isCountingDown ? (
          <>
            <Text style={styles.infoText}>Press and hold for emergency</Text>
            
            <TouchableOpacity
              activeOpacity={0.9}
              onLongPress={startEmergencyCountdown}
              delayLongPress={500}>
              <Animated.View
                style={[
                  styles.emergencyButton,
                  {transform: [{scale: pulseAnim}]},
                ]}>
                <Text style={styles.emergencyIcon}>🚨</Text>
                <Text style={styles.emergencyText}>SOS</Text>
              </Animated.View>
            </TouchableOpacity>

            <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Emergency Contacts</Text>
                <Text style={styles.statusValue}>{contacts.length}</Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Location</Text>
                <Text style={styles.statusValue}>
                  {currentLocation ? '✓' : '✗'}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.countdownLabel}>Sending alert in</Text>
            <View style={styles.countdownCircle}>
              <Text style={styles.countdownNumber}>{countdown}</Text>
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelCountdown}
              activeOpacity={0.8}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Instructions */}
      {!isCountingDown && (
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Long press the SOS button to send emergency alerts to all your contacts
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#DC2626',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 10,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 30,
    fontWeight: '500',
  },
  emergencyButton: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  emergencyIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 30,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  countdownLabel: {
    fontSize: 24,
    color: '#6B7280',
    marginBottom: 30,
    fontWeight: '500',
  },
  countdownCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#DC2626',
  },
  countdownNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  cancelButton: {
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#6B7280',
    borderRadius: 25,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructions: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
