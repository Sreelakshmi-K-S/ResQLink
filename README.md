<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# ResQLink 🎯

## Basic Details

### Team Name: EmpowHer

### Team Members
- Member 1: Akshayalakshmi K - NSS College of Engineering
- Member 2: Sreelakshmi K S - NSS College of Engineering

### Hosted Project Link
https://drive.google.com/file/d/19TsW25pMNENu9eQIT9KCmPWg_mYshy4N/view?usp=drivesdk

### Project Description
ResQLink is an offline emergency app that sends SOS alerts and location using Bluetooth mesh when there is no internet. It also triggers a loud siren to attract nearby help during emergencies.

### The Problem statement
During disasters, internet and mobile networks often fail, making it impossible for people to send SOS messages or share their location, which delays rescue and increases risk.

### The Solution
ResQLink uses Bluetooth mesh technology to send SOS alerts and location details without internet and also activates a loud siren to attract nearby help, ensuring emergency communication even in network failure situations.

## Technical Details

### Technologies/Components Used

**For Software:**
-Languages used: Dart
-Frameworks used: Flutter
-Libraries used: nearby_connections (Bluetooth Mesh / P2P), provider (State Management), geolocator (Location Services), -  permission_handler (Runtime Permissions), audioplayers (Siren Alert), json_serializable (Model Serialization)
-Tools used: Android Studio / VS Code, Flutter SDK, Git & GitHub, Gradle, Physical Android Devices for testing



## Features

Feature 1: Offline SOS Communication – Sends emergency alerts using Bluetooth mesh when internet and mobile networks are unavailable.
Feature 2: Automatic Location Sharing – Shares real-time GPS coordinates with nearby devices for accurate rescue tracking.
Feature 3: Loud Emergency Siren – Activates a high-volume siren to attract nearby attention during critical situations.
Feature 4: Rescue Authority Mode – Allows rescue teams to receive, monitor, and manage incoming distress alerts efficiently.

## Implementation

### For Software:

#### Installation
bash
flutter pub get


#### Run
bash
flutter run


## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

1. <img width="722" height="1600" alt="image" src="https://github.com/user-attachments/assets/ec93b2f5-94cc-46c7-bafa-05e2f1bafa32" />
Send an emergency SOS instantly in offline mode.

2. <img width="722" height="1600" alt="image" src="https://github.com/user-attachments/assets/af558522-2a96-4016-8a32-8f1206e8673a" />
Rescue Authority Mode actively scanning for nearby distress signals.

3. <img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/26693c58-f83a-4824-9cf2-d0d081b85e52" />
Authorities receiving real-time SOS alerts with user location details.


#### Diagrams

**System Architecture:**
![WhatsApp Image 2026-02-14 at 10 04 36 AM](https://github.com/user-attachments/assets/85a0c8f6-a5af-4e14-bce1-224b9903706d)
-The system follows a layered architecture with a Flutter UI layer, a Provider-based state management layer, and a Service layer handling core logic (SOS creation, Bluetooth mesh communication, and location fetching).
When a user triggers SOS, the app fetches GPS coordinates, creates a structured alert packet, and broadcasts it via Bluetooth mesh to nearby devices, where Authority Mode displays the received alerts — all without requiring internet connectivity.


**Application Workflow:**

![Workflow](docs/workflow.png)
*Add caption explaining your workflow*



### For Mobile Apps:
![WhatsApp Image 2026-02-14 at 10 00 59 AM](https://github.com/user-attachments/assets/43d7f0c0-2400-48e5-9fc1-71baff07e96b)
-The app starts by launching and requesting Bluetooth and location permissions.
If permissions are granted, it initializes services and begins advertising and discovery mode.
When the user presses the SOS button, the app fetches the current location and creates an SOS JSON message.
The alert is broadcast via Bluetooth mesh, received by nearby devices, displayed in Authority Mode, and optionally triggers a siren.

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]

#### Assembly Instructions

**Step 1: Prepare Components**
1. Gather all components listed in the BOM
2. Check component specifications
3. Prepare your workspace
![Step 1](images/assembly-step1.jpg)
*Caption: All components laid out*

**Step 2: Build the Power Supply**
1. Connect the power rails on the breadboard
2. Connect Arduino 5V to breadboard positive rail
3. Connect Arduino GND to breadboard negative rail
![Step 2](images/assembly-step2.jpg)
*Caption: Power connections completed*

**Step 3: Add Components**
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**

**Final Assembly:**
![Final Build](images/final-build.jpg)
*Caption: Completed project ready for testing*

---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
https://drive.google.com/file/d/1dutO9nGjvzm-P0u2s8lGO2OIGE1tutH1/view?usp=drivesdk

Disaster SOS is an offline emergency app that uses Bluetooth to broadcast your precise GPS location to nearby devices when cellular networks fail. Once the SOS button is triggered, it sounds a loud siren on receiving phones to alert people in the vicinity for an immediate rescue. This project provides a critical safety net for natural disasters or remote areas where traditional communication is unavailable.

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)
 ChatGPT, Google, Gemini, Claude, GitHub, Copilot

**Purpose:** 
Generated initial boilerplate Flutter code
Assisted in Bluetooth mesh integration using nearby_connections
Debugged permission and Android 12+ compatibility issues
Suggested architecture improvements (Service layer + Provider pattern)
Helped optimize SOS data model and JSON serialization
Improved documentation, README, and presentation content

**Key Prompts Used:**
"Implement Bluetooth P2P mesh communication in Flutter"
"Fix Nearby Devices permission issue in Android 12+"
"Design a scalable service-layer architecture for Flutter emergency app"
"Generate SOS message model with JSON serialization"
"Improve hackathon project description for evaluation"

**Percentage of AI-generated code:**
 Approximately 70–75% (primarily boilerplate, debugging guidance, and structure generation)

**Human Contributions:**
Core idea conceptualization and problem identification
Final architecture decisions and feature selection
Integration of all modules into a working system
Real-device testing and debugging
UI/UX refinements and siren behavior implementation
Final optimization and validation for hackathon demo

## Team Contributions

Team Contributions
Akshayalakshmi K : UI implementation, SOS trigger logic, siren integration, documentation and presentation preparation.
Sreelakshmi K S : Bluetooth mesh networking, location services integration, Rescue Authority Mode, testing and debugging.

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
