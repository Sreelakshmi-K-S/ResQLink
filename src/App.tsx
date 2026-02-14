import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';

// Import screens
import SplashScreen from './screens/SplashScreen';
import OnboardingOne from './screens/OnboardingOne';
import OnboardingTwo from './screens/OnboardingTwo';
import OnboardingThree from './screens/OnboardingThree';
import SetupContacts from './screens/SetupContacts';
import HomeScreen from './screens/HomeScreen';
import ContactsManager from './screens/ContactsManager';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error checking first launch:', error);
      setIsLoading(false);
    }
  };

  const getInitialRoute = () => {
    if (isLoading) return 'Splash';
    return isFirstLaunch ? 'OnboardingOne' : 'Home';
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={getInitialRoute()}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#DC2626',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="OnboardingOne" 
            component={OnboardingOne}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="OnboardingTwo" 
            component={OnboardingTwo}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="OnboardingThree" 
            component={OnboardingThree}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="SetupContacts" 
            component={SetupContacts}
            options={{
              title: 'Emergency Contacts',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="ContactsManager" 
            component={ContactsManager}
            options={{title: 'Manage Contacts'}}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{title: 'Settings'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
