import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { Card, Button, Dialog, Portal } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';

const Carrito = ({ navigation }) => {
  const [visible, setVisible] = useState(false); // Estado para controlar la visibilidad del diálogo de confirmación

  // Lista de productos simulados
  const productos = [
    { id: 1, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 2, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 3, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 4, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
    { id: 5, name: 'Gel hidratante nivea', price: 22.00, image: require('../assets/skincare.png') },
  ];

  // Cálculo del total de los productos en el carrito
  const total = productos.reduce((sum, product) => sum + product.price, 0);

  // Función para mostrar el diálogo de confirmación
  const showDialog = () => setVisible(true);

  // Función para ocultar el diálogo de confirmación
  const hideDialog = () => setVisible(false);

  // Función para manejar el pago (aquí puedes añadir lógica adicional como realizar un pago real)
  const handlePayment = () => {
    navigation.navigate('MisProductos'); // Redirige al usuario después de pagar
    // Aquí podrías añadir lógica adicional como procesar el pago real
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Mis productos</Text>

      {productos.map((producto) => (
        <Card key={producto.id} style={styles.productCard}>
          <View style={styles.cardContent}>
            <Image source={producto.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{producto.name}</Text>
              <Text style={styles.productPrice}>Precio: {producto.price.toFixed(2)}$</Text>
            </View>
          </View>
        </Card>
      ))}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {total.toFixed(2)}$</Text>
        <ButtonAction mode="contained" style={styles.payButton} onPress={showDialog}>Pagar</ButtonAction>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirmación</Dialog.Title>
          <Dialog.Content>
            <Text>¿Desea ir a pagar sus productos?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonAction onPress={() => { hideDialog(); handlePayment(); }}>Sí</ButtonAction>
            <ButtonAction onPress={hideDialog}>No</ButtonAction>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

// Estilos para el componente Carrito
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
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
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
