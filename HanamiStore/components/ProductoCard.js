import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import ButtonAction from './ButtonAction'; // Ajusta la ruta según sea necesario

const ProductoCard = ({ Nombre_Producto, precio_producto, navigation, idProducto }) => {
  return (
    <Card style={styles.productCard}>
      <Card.Cover style={styles.cardImage} source={require('../assets/skincare.png')} />

      <Card.Content style={styles.cardContent}>
        <Paragraph style={styles.cardText}>{Nombre_Producto}</Paragraph>
        
        <Text style={styles.price}>{`$${precio_producto}`}</Text>
      </Card.Content>

      <Card.Actions style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('DetalleProducto', { idProducto })}
        >
          <Text style={styles.buttonText}>Ver producto</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

// Estilos del componente ProductoCard
const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 10,
  },
  cardImage: {
    height: 150,
    borderRadius: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
  },
  price: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardActions: {
    justifyContent: 'center',
  },
  button: {
    width: "100%",
    borderRadius: 8,
    paddingVertical: 20,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#FF8BA7'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProductoCard;
