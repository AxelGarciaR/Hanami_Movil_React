import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Cuenta from './views/Cuenta';
import Inicio from './views/Inicio';
import Recuperacion from './views/Recuperacion';
import NuevaContra from './views/NuevaContra';
import CodigoContra from './views/CodigoContra';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Registro';

const Stack = createStackNavigator();

export default function App() {
  const theme = {
    // Configura tu tema de react-native-paper si es necesario
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cuenta">
          <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
          <Stack.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
          <Stack.Screen name="Recuperacion" component={Recuperacion} options={{ headerShown: false }} />
          <Stack.Screen name="NuevaContra" component={NuevaContra} options={{ headerShown: false }} />
          <Stack.Screen name="CodigoContra" component={CodigoContra} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
