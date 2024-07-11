import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, IconButton, Button } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';

const MisProductos = ({ navigation }) => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Gel hidratante nivea', precio: 75.00, cantidad: 1, imagen: require('../assets/skincare.png') },
    { id: 2, nombre: 'Gel hidratante nivea', precio: 75.00, cantidad: 1, imagen: require('../assets/skincare.png') },
  ]);

  const incrementarCantidad = (id) => {
    setProductos(productos.map(producto => 
      producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
    ));
  };

  const disminuirCantidad = (id) => {
    setProductos(productos.map(producto => 
      producto.id === id && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
    ));
  };

  const totalOrden = productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  const descuento = 50.00; // Este puede ser calculado dinámicamente
  const envio = 0.00; // Asumiendo envío gratis

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis productos</Text>
      <Button mode="text" onPress={() => navigation.navigate('Productos')}>
        + Agregar más
      </Button>
      {productos.map(producto => (
        <Card key={producto.id} style={styles.card}>
          <Card.Content>
            <View style={styles.cardContent}>
              <Image source={producto.imagen} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text>{producto.nombre}</Text>
                <Text>bottle of 500 pellets</Text>
                <Text>${producto.precio.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <IconButton icon="minus" onPress={() => disminuirCantidad(producto.id)} />
                  <Text>{producto.cantidad}</Text>
                  <IconButton icon="plus" onPress={() => incrementarCantidad(producto.id)} />
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Resumen de pago</Text>
        <View style={styles.summaryRow}>
          <Text>Total de la orden</Text>
          <Text>${totalOrden.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Descuento</Text>
          <Text>-${descuento.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Envío</Text>
          <Text>Free</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Total</Text>
          <Text>${(totalOrden - descuento + envio).toFixed(2)}</Text>
        </View>
        <ButtonAction icon="credit-card" onPress={() => { /* Función para proceder con el pago */ }}>
          Pagar
        </ButtonAction>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  summaryContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default MisProductos;
