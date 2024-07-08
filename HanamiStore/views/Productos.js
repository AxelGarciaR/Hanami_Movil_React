// Productos.js
import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetail from './DetalleProducto';

const ProductoCard = ({ product, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product })}>
    <Card style={styles.card}>
      <Card.Cover source={{ uri: product.image }} />
      <Card.Content>
        <Title>{product.title}</Title>
        <Paragraph>{product.price}</Paragraph>
        <View style={styles.ratingContainer}>
          <Text>{product.rating}</Text>
          <Image source={require('../assets/cheque.png')} style={styles.starIcon} />
        </View>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const Productos = ({ navigation }) => {
  const products = [
    {
      title: 'Esencia de planta té verde',
      price: '$8.19',
      rating: '4.8',
      image: 'https://via.placeholder.com/150',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec gravida nulla, nec iaculis lorem. Curabitur vestibulum.',
    },
    // ...otros productos
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product, index) => (
        <ProductoCard key={index} product={product} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const DrawerContent = (props) => (
  <Drawer.Section title="Categorias">
    <Drawer.Item label="Categoria 1" />
    <Drawer.Item label="Categoria 2" />
    <Drawer.Item label="Categoria 3" />
    <Drawer.Item label="Categoria 4" />
  </Drawer.Section>
);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Productos" component={Productos} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    width: '90%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

export default Productos;
