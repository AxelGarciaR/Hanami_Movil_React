import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
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
import Carrito from './views/Historia';
import Productos from './views/Productos';
import Perfil from './views/Perfil';
import MisProductos from './views/MisProductos';
import DetalleProducto from './views/DetalleProducto';

// Creación de navegadores y stack
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Contenido personalizado del drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}

/*
<DrawerItem
        label="Inicio"
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      <DrawerItem
        label="Productos"
        onPress={() => props.navigation.navigate('Productos')}
      />
      <DrawerItem
        label="Historia"
        onPress={() => props.navigation.navigate('Historia')}
      />
      <DrawerItem
        label="Perfil"
        onPress={() => props.navigation.navigate('Perfil')}
      />
*/

// Función para el navegador de cajón (drawer navigator)
function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Productos" component={Productos} />
      <Drawer.Screen name="Historia" component={Carrito} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="MisProductos" component={MisProductos} />
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
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MisProductos" component={MisProductos} options={{ headerShown: false }} />
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
