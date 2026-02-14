import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const OnboardingThree = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      
      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationIcon}>✅</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Safe & Reliable</Text>
          <Text style={styles.description}>
            Works with or without internet. Your emergency contacts are stored 
            locally and alerts are sent via SMS. No cloud, no tracking - just safety.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SetupContacts')}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ResQLink complements emergency services. Always call 911 in 
            life-threatening situations.
          </Text>
        </View>
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
    backgroundColor: '#D1FAE5',
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
  disclaimer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default OnboardingThree;
