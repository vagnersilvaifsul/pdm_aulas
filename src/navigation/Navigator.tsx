/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import Home from '../telas/Home';
import SignIn from '../telas/SignIn';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

function AppStack() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon source="account-group" color={theme.colors.primary} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  const theme = useTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.background,
          text: theme.colors.primary,
          border: theme.colors.primary,
          notification: theme.colors.error,
        },
        dark: theme.dark,
      }}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
