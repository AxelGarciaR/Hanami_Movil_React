import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import ButtonAction from './ButtonAction'; // Ajusta la ruta según sea necesario

const ProductoCard = ({ producto }) => {
  return (
    <Card style={styles.productCard}>
      <Card.Cover style={styles.cardImage} source={producto.imagen} />
      <Card.Content style={styles.cardContent}>
        <Paragraph style={styles.cardText}>{producto.nombre}</Paragraph>
        <Text style={styles.price}>{`$${producto.precio}`}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <ButtonAction label="+" />
      </Card.Actions>
    </Card>
  );
};

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
});

export default ProductoCard;
