# ResQLink - Quick Start Guide

## Get Up and Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)
```bash
cd ResQLink
npm install
```

### Step 2: Run on Android (1 minute)
```bash
npx react-native run-android
```

### Step 3: Complete Setup (2 minutes)
1. Swipe through onboarding screens
2. Add 2-3 emergency contacts
3. Grant location and SMS permissions
4. You're ready!

## Quick Test
1. Long press the red SOS button
2. Wait for 5-second countdown
3. Check that your contact received the SMS with your location

---

## What's Included

### ✅ Feature 1: Quick Emergency Alert System
- One-tap SOS button
- 5-second safety countdown
- Sends SMS to all emergency contacts
- Works offline via cellular network

### ✅ Feature 2: Real-Time Location Sharing  
- Automatic GPS tracking
- Location embedded in alerts
- Google Maps link for rescuers
- Works without internet

---

## File Structure

```
ResQLink/
├── README.md                 # Main documentation
├── INSTALLATION.md           # Detailed setup guide
├── FEATURES.md              # Feature documentation
├── package.json             # Dependencies
├── src/
│   ├── App.tsx              # Main app component
│   ├── screens/             # All screens
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingOne.tsx
│   │   ├── OnboardingTwo.tsx
│   │   ├── OnboardingThree.tsx
│   │   ├── SetupContacts.tsx
│   │   ├── HomeScreen.tsx   # Main emergency screen
│   │   ├── ContactsManager.tsx
│   │   └── SettingsScreen.tsx
│   └── components/
│       └── SMSModule.ts     # SMS functionality
├── android/
│   └── app/src/main/
│       ├── AndroidManifest.xml
│       └── java/com/resqlink/
│           ├── SMSModule.java    # Native SMS
│           └── SMSPackage.java
└── index.js                 # Entry point
```

---

## Key Differences from Mayday

### What's Different
1. **Name**: ResQLink (not Mayday)
2. **Design**: Clean, minimalist UI with red theme
3. **Features**: Focused on 2 core features (not all features)
4. **Code**: Completely rewritten, original implementation
5. **Structure**: Different file organization
6. **UX Flow**: Unique onboarding and user experience

### What's Similar
1. **Concept**: Emergency alert application
2. **Technology**: React Native
3. **Platform**: iOS and Android support

---

## Troubleshooting

### Issue: App won't start
**Solution**: Clear cache and rebuild
```bash
npx react-native start --reset-cache
```

### Issue: SMS not sending
**Solution**: Check permissions in device settings

### Issue: Location not working
**Solution**: Enable location services and grant permission

---

## Next Steps

1. ✅ Read INSTALLATION.md for detailed setup
2. ✅ Read FEATURES.md for feature documentation
3. ✅ Test with trusted contacts
4. ✅ Customize settings to your preference

---

## Support

- 📖 Full docs: README.md
- 🔧 Setup help: INSTALLATION.md
- 📱 Features: FEATURES.md

**Stay Safe with ResQLink!** 🚨
