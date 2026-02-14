import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const OnboardingOne = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      
      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationIcon}>🚨</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Instant Emergency Alerts</Text>
          <Text style={styles.description}>
            Send SOS alerts to all your emergency contacts with just one tap. 
            Your location is automatically shared so help can find you quickly.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('OnboardingTwo')}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('SetupContacts')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  illustration: {
    marginBottom: 60,
  },
  illustrationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationIcon: {
    fontSize: 100,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#DC2626',
    width: 30,
  },
  nextButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#DC2626',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipButtonText: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OnboardingOne;
