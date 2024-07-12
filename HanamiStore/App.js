import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

// Importación de componentes y vistas
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
import DetalleProducto from './views/DetalleProducto';

// Creación de navegadores y stack
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Función para el navegador de cajón (drawer navigator)
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="SkinCare">
      {/* Definición de las pantallas del drawer navigator */}
      <Drawer.Screen name="SkinCare" component={Productos} />
      <Drawer.Screen name="Salud y Belleza" component={Productos} />
      <Drawer.Screen name="Accesorios de Belleza" component={Productos} />
      <Drawer.Screen name="Escencias" component={Productos} />
    </Drawer.Navigator>
  );
}

// Función para el navegador raíz (root navigator)
function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
      <Stack.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
      <Stack.Screen name="Recuperacion" component={Recuperacion} options={{ headerShown: false }} />
      <Stack.Screen name="NuevaContra" component={NuevaContra} options={{ headerShown: false }} />
      <Stack.Screen name="CodigoContra" component={CodigoContra} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
      <Stack.Screen name="Productos" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MisProductos" component={MisProductos} options={{ headerShown: false }} />
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      <Stack.Screen name="DetalleProducto" component={DetalleProducto} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Componente principal de la aplicación
export default function App() {
  const theme = {
    // Configura tu tema de react-native-paper si es necesario
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
