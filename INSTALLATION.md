# ResQLink - Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **React Native CLI** (`npm install -g react-native-cli`)
- **Java Development Kit (JDK)** 11 or higher
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)

### Android Setup
1. Install Android Studio
2. Set up Android SDK (API Level 31 or higher)
3. Configure ANDROID_HOME environment variable:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### iOS Setup (macOS only)
1. Install Xcode from App Store
2. Install CocoaPods: `sudo gem install cocoapods`
3. Configure Xcode command line tools

## Installation Steps

### 1. Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd ResQLink

# Or extract from ZIP
unzip ResQLink.zip
cd ResQLink
```

### 2. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Or using yarn
yarn install
```

### 3. Install iOS Dependencies (iOS only)
```bash
cd ios
pod install
cd ..
```

### 4. Configure Android Build

Edit `android/build.gradle` to ensure proper configuration:
```gradle
buildscript {
    ext {
        buildToolsVersion = "33.0.0"
        minSdkVersion = 21
        compileSdkVersion = 33
        targetSdkVersion = 33
    }
}
```

### 5. Link Native Modules

The SMS module needs to be linked. Edit `android/app/src/main/java/com/resqlink/MainApplication.java`:

```java
import com.resqlink.SMSPackage;

// Add to getPackages():
packages.add(new SMSPackage());
```

## Running the Application

### Android

#### Using an Android Emulator
1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. Run the app:
```bash
npx react-native run-android
```

#### Using a Physical Device
1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect device via USB
4. Run:
```bash
npx react-native run-android
```

### iOS (macOS only)

#### Using iOS Simulator
```bash
npx react-native run-ios
```

#### Using a Physical Device
1. Open `ios/ResQLink.xcworkspace` in Xcode
2. Select your device from the device menu
3. Configure code signing with your Apple ID
4. Click Run (▶️) button

## Development Mode

### Start Metro Bundler
In a separate terminal:
```bash
npx react-native start
```

### Enable Hot Reloading
- Android: Press `R` twice or shake device and select "Enable Hot Reloading"
- iOS: Press `Cmd + D` in simulator and select "Enable Hot Reloading"

## Permissions Setup

### Android Permissions
The app will automatically request these permissions on first use:
- **SEND_SMS**: To send emergency text messages
- **ACCESS_FINE_LOCATION**: To share your precise location
- **VIBRATE**: For haptic feedback

Make sure to grant all permissions for full functionality.

### iOS Permissions
Configure permissions in `ios/ResQLink/Info.plist`:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>ResQLink needs your location to share it in emergency alerts</string>
<key>NSContactsUsageDescription</key>
<string>ResQLink needs access to contacts for emergency contact selection</string>
```

Note: iOS has restrictions on automated SMS sending. The app will use alternative methods on iOS.

## Building for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

### Android App Bundle (for Play Store)
```bash
cd android
./gradlew bundleRelease
```

### iOS Archive (for App Store)
1. Open project in Xcode
2. Select "Generic iOS Device" from device menu
3. Product → Archive
4. Upload to App Store Connect

## Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear cache
npx react-native start --reset-cache
```

#### Android Build Failures
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### iOS Build Failures
```bash
# Clean pods and reinstall
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

#### Permission Issues
- Make sure all required permissions are granted in device settings
- Reinstall the app if permissions are not being requested

### Getting Help
- Check the main README.md for feature documentation
- Review the troubleshooting section
- Check device logs for error messages

## Testing the App

### Test Emergency Alert Feature
1. Add at least one emergency contact
2. Long press the SOS button
3. Wait for 5-second countdown (or cancel)
4. Check that SMS is sent to emergency contacts

### Test Location Sharing
1. Grant location permissions
2. Check that location icon shows ✓ on home screen
3. Send test emergency alert
4. Verify location link is included in SMS

## Next Steps

After successful installation:
1. Complete the onboarding flow
2. Add 2-5 emergency contacts
3. Test the emergency alert system with a trusted contact
4. Configure settings to your preference
5. Keep the app updated with latest permissions

## Important Notes

- **Always test with trusted contacts first**
- **Never rely solely on this app in true emergencies - always call 911 or local emergency services**
- **Keep your emergency contact list updated**
- **Ensure location services are enabled**
- **Check battery optimization settings to prevent app from being killed**

## Security & Privacy

- All data is stored locally on your device
- No cloud synchronization
- Emergency contacts are never transmitted except during alerts
- Location is only accessed when sending emergency alerts

---

For more information, see the main README.md file.
