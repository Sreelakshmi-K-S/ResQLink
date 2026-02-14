# ResQLink - Feature Documentation

## Overview

ResQLink implements two core emergency features that work together to provide a comprehensive safety solution. This document provides detailed information about each feature and how they work.

---

## Feature 1: Quick Emergency Alert System 🚨

### Description
The Quick Emergency Alert System allows users to send instant SOS alerts to all configured emergency contacts with a single long-press of the emergency button.

### How It Works

#### 1. Emergency Button Activation
- **Location**: Center of home screen
- **Appearance**: Large red circular button with SOS text and emergency icon
- **Activation**: Long press (500ms minimum)
- **Visual Feedback**: Pulsing animation to indicate it's interactive

#### 2. Safety Countdown
Once activated, a 5-second countdown begins:
- **Purpose**: Prevents accidental alerts
- **Display**: Large countdown timer (5, 4, 3, 2, 1)
- **Cancellation**: Touch "Cancel" button at any time
- **Feedback**: Vibration every second during countdown

#### 3. Alert Transmission
After countdown completes:
- SMS sent to ALL emergency contacts simultaneously
- Each message includes:
  - Emergency header with alert emoji
  - Timestamp of when alert was sent
  - Your current GPS location (if available)
  - Google Maps link for quick navigation
  - Automated message indicator
- Vibration pattern confirms sending

#### 4. Confirmation
- Success message shows how many contacts received the alert
- Alert saved to history for future reference
- Can immediately send another alert if needed

### Alert Message Format
```
🚨 EMERGENCY ALERT from ResQLink 🚨

I need immediate help!

Time: [Date and Time]
Location: https://maps.google.com/?q=[latitude],[longitude]

This is an automated emergency message.
```

### Technical Implementation

#### Permissions Required
- `SEND_SMS`: Send text messages
- `VIBRATE`: Provide haptic feedback

#### Key Components
- **HomeScreen.tsx**: Main UI and coordination
- **SMSModule.ts**: SMS sending interface
- **SMSModule.java**: Native Android SMS functionality

#### Error Handling
- Network failures: SMS works offline via cellular network
- Permission denied: User prompted to grant permissions
- Empty contact list: Warning shown, user directed to add contacts
- SMS sending failure: Individual failures logged, success count shown

### Best Practices

#### For Users
1. **Test with trusted contacts first** - Send a test alert to make sure it works
2. **Keep contacts updated** - Regularly verify phone numbers are current
3. **Understand countdown** - Know you have 5 seconds to cancel
4. **Don't panic** - The system will work even if you're stressed

#### For Developers
1. **Rate limiting**: Small delay between each SMS to avoid carrier blocking
2. **Message splitting**: Long messages automatically divided into multiple SMS
3. **Battery optimization**: Efficient code to preserve battery during emergencies
4. **Accessibility**: Large buttons and clear feedback for all users

---

## Feature 2: Real-Time Location Sharing 📍

### Description
Automatic GPS location tracking and sharing that embeds your precise coordinates in every emergency alert, helping rescuers find you quickly.

### How It Works

#### 1. Location Detection
- **Automatic**: Location fetched when app starts
- **Technology**: Native GPS and network positioning
- **Accuracy**: High accuracy mode enabled (typically 5-10 meters)
- **Refresh**: Updated before each alert is sent

#### 2. Location Permission
First time setup:
- App requests location permission
- User grants "While Using App" or "Always" access
- Permission status displayed on home screen
- Location icon shows ✓ when available, ✗ when unavailable

#### 3. Location Caching
- **Last Known Location**: Saved locally for offline scenarios
- **Fallback**: If GPS unavailable, uses last cached location
- **Notification**: User informed if location unavailable

#### 4. Location Integration in Alerts
Emergency alerts automatically include:
- **Latitude & Longitude**: Precise coordinates
- **Google Maps Link**: One-tap navigation for rescuers
- **Timestamp**: When location was captured
- **Fallback Message**: "Location unavailable" if GPS fails

### Location Accuracy Factors

#### Best Accuracy
- ✅ Clear sky view
- ✅ Outdoors
- ✅ Recent location permission granted
- ✅ Location services enabled

#### Reduced Accuracy
- ⚠️ Inside buildings
- ⚠️ Dense urban areas (tall buildings)
- ⚠️ Bad weather
- ⚠️ Old device hardware

#### No Location
- ❌ Location services disabled
- ❌ Permission denied
- ❌ Airplane mode
- ❌ GPS hardware failure

### Technical Implementation

#### Permissions Required
- `ACCESS_FINE_LOCATION`: Precise GPS coordinates
- `ACCESS_COARSE_LOCATION`: Network-based positioning (fallback)

#### Key Components
- **Geolocation**: React Native Community Geolocation
- **Permission Handling**: Platform-specific permission requests
- **Location Caching**: AsyncStorage for offline fallback

#### Platform Differences

**Android:**
- Runtime permission requests
- Background location with user consent
- Battery optimization considerations

**iOS:**
- "When In Use" vs "Always" permissions
- Background location requires additional setup
- Privacy labels required for App Store

### Google Maps Integration

#### Map Link Format
```
https://maps.google.com/?q=[latitude],[longitude]
```

#### What Recipients See
1. Click link in SMS
2. Opens Google Maps (or default map app)
3. Shows your exact location
4. Can get directions immediately

#### Benefits
- Works on any smartphone
- No app installation required
- Real-time navigation
- Works offline (if maps cached)

### Privacy & Security

#### What We Collect
- ✅ GPS coordinates (only during emergency alert)
- ✅ Timestamp of alert

#### What We DON'T Collect
- ❌ Location history
- ❌ Continuous tracking
- ❌ Location uploads to cloud
- ❌ Third-party analytics

#### Storage
- All data stored locally on device
- No cloud synchronization
- Location cleared when app uninstalled

### Best Practices

#### For Users
1. **Test location accuracy** - Check if location shows correctly before emergency
2. **Keep GPS enabled** - Disable battery optimization for ResQLink
3. **Grant permissions** - "Always Allow" for best results
4. **Verify in SMS** - Check location link works before emergencies

#### For Developers
1. **High accuracy mode** - Best precision for emergencies
2. **Timeout handling** - Don't wait forever for GPS lock
3. **Battery efficient** - Only fetch when needed
4. **Error messages** - Clear communication if location fails

---

## Feature Integration

### How Features Work Together

1. **User presses emergency button**
   ↓
2. **5-second countdown begins**
   ↓
3. **Location is fetched/refreshed**
   ↓
4. **SMS composed with location link**
   ↓
5. **Alert sent to all contacts**
   ↓
6. **Confirmation shown to user**

### Offline Capabilities

Both features work without internet:
- ✅ **SMS**: Uses cellular network (no data needed)
- ✅ **GPS**: Satellite-based (no internet needed)
- ✅ **Contact Storage**: All local
- ⚠️ **Map Link**: Needs internet to open, but coordinates still sent

### Edge Cases Handled

1. **No emergency contacts**: Warning before activation
2. **Location unavailable**: Alert sent anyway with notification
3. **SMS send failure**: Partial success reported
4. **Permission denied**: User prompted to grant
5. **Battery critically low**: Function still works

---

## Future Enhancements

While not currently implemented, potential additions could include:

- 🔮 **Voice Activation**: "Hey ResQLink, send emergency alert"
- 🔮 **Check-in Timers**: Automatic alert if you don't check in
- 🔮 **Medical Info**: Share medical conditions in alerts
- 🔮 **Photo Sharing**: Attach photos to emergency alerts
- 🔮 **Two-way Communication**: Receive responses from contacts

---

## Testing Guidelines

### Before Emergencies

#### Test Emergency Alert
1. Add a trusted contact (your own other number works)
2. Enable all permissions
3. Long press emergency button
4. Let countdown complete
5. Verify SMS received with location

#### Test Location Accuracy
1. Check location icon on home screen
2. Send test alert
3. Click location link in SMS
4. Verify it shows your actual location
5. Try indoors and outdoors

### During Development

#### Unit Tests
- SMS sending logic
- Location permission handling
- Contact validation
- Alert message formatting

#### Integration Tests
- End-to-end alert flow
- Permission request flow
- Location + SMS integration
- Error scenarios

---

## Support & Documentation

For more information:
- **Installation**: See INSTALLATION.md
- **README**: See README.md
- **Issues**: Submit on GitHub
- **Questions**: Contact support

---

**Remember**: ResQLink is a supplement to emergency services, not a replacement. Always call 911 or your local emergency number in life-threatening situations.
