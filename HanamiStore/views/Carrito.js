import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';

const Carrito = () => {
  const productos = [
    { id: 1, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 2, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 3, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 4, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 5, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
  ];

  const total = productos.reduce((sum, product) => sum + product.price, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Mis productos</Text>
      {productos.map((producto) => (
        <Card key={producto.id} style={styles.productCard}>
          <View style={styles.cardContent}>
            <Image source={producto.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{producto.name}</Text>
              <Text style={styles.productPrice}>precio {producto.price.toFixed(2)}$</Text>
            </View>
          </View>
        </Card>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {total.toFixed(2)}$</Text>
        <ButtonAction mode="contained" style={styles.payButton}>Pagar</ButtonAction>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  productCard: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15, // Aumenta el padding de la tarjeta
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80, // Aumenta el tamaño de la imagen
    height: 80, // Aumenta el tamaño de la imagen
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18, // Aumenta el tamaño del texto
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16, // Aumenta el tamaño del texto
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#FF6F61',
  },
});

export default Carrito;
