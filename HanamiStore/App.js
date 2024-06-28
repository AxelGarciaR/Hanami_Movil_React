import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Cuenta from './views/Cuenta'; // Asume que Cuenta.js contiene tu componente Cuenta
import Inicio from './views/Inicio';
import Recuperacion from './views/Recuperacion';

const Stack = createStackNavigator();

export default function App() {
  const theme = { // Define tu tema de react-native-paper aquí si es necesario
    // theme configuration
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
          <Stack.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
          <Stack.Screen name="Recuperacion" component={Recuperacion} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

