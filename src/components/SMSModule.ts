// SMSModule.ts
// This module provides SMS functionality for emergency alerts
// Note: This requires the native module implementation in Android/iOS

import {NativeModules, Platform} from 'react-native';

const {RNSMSModule} = NativeModules;

interface SMSModuleInterface {
  sendSMS: (phoneNumber: string, message: string) => Promise<boolean>;
  sendMultipleSMS: (recipients: string[], message: string) => Promise<number>;
}

const SMSModule: SMSModuleInterface = {
  /**
   * Send SMS to a single phone number
   * @param phoneNumber - The recipient's phone number
   * @param message - The SMS message content
   * @returns Promise<boolean> - Success status
   */
  sendSMS: async (phoneNumber: string, message: string): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        // On Android, we use the native SMS module
        if (RNSMSModule && RNSMSModule.sendSMS) {
          await RNSMSModule.sendSMS(phoneNumber, message);
          return true;
        } else {
          // Fallback: Open default SMS app
          console.warn('Native SMS module not available, using fallback');
          return false;
        }
      } else if (Platform.OS === 'ios') {
        // iOS implementation would go here
        // Note: iOS has restrictions on automated SMS sending
        console.warn('iOS SMS sending requires user interaction');
        return false;
      }
      return false;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  },

  /**
   * Send SMS to multiple recipients
   * @param recipients - Array of phone numbers
   * @param message - The SMS message content
   * @returns Promise<number> - Number of successfully sent messages
   */
  sendMultipleSMS: async (recipients: string[], message: string): Promise<number> => {
    let successCount = 0;
    
    for (const phoneNumber of recipients) {
      try {
        const success = await SMSModule.sendSMS(phoneNumber, message);
        if (success) {
          successCount++;
        }
        // Add small delay between messages to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to send SMS to ${phoneNumber}:`, error);
      }
    }
    
    return successCount;
  },
};

export default SMSModule;
