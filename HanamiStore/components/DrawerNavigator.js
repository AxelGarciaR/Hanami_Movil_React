import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Productos from './views/Productos';
import DetalleProducto from './views/DetalleProducto';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Productos">
        <Drawer.Screen name="Categoria 1" component={Productos} />
        <Drawer.Screen name="Categoria 2" component={Productos} />
        <Drawer.Screen name="Categoria 3" component={Productos} />
        <Drawer.Screen name="Categoria 4" component={Productos} />
        <Drawer.Screen name="DetalleProducto" component={DetalleProducto} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
