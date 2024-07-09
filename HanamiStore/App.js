import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './components/Login';
import Registro from './components/Registro';
import Cuenta from './views/Cuenta';
import Inicio from './views/Inicio';
import Recuperacion from './views/Recuperacion';
import NuevaContra from './views/NuevaContra';
import CodigoContra from './views/CodigoContra';
import Dashboard from './views/Dashboard';
import Carrito from './views/Carrito';
import Productos from './views/Productos';
import Perfil from './views/Perfil';
import MisProductos from './views/MisProductos';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const theme = {
    // Configura tu tema de react-native-paper si es necesario
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
              <Stack.Navigator initialRouteName="Carrito">
                <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
                <Stack.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
                <Stack.Screen name="Recuperacion" component={Recuperacion} options={{ headerShown: false }} />
                <Stack.Screen name="NuevaContra" component={NuevaContra} options={{ headerShown: false }} />
                <Stack.Screen name="CodigoContra" component={CodigoContra} options={{ headerShown: false }} />
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
                <Stack.Screen name="Productos" component={Productos} options={{ headerShown: false }} />
                <Stack.Screen name="MisProductos" component={MisProductos} options={{ headerShown: false }} />
                <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
              </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
