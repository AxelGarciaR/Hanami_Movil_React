import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Paragraph } from 'react-native-paper';
import ButtonAction from './ButtonAction'; // Asegúrate de ajustar la ruta según sea necesario

const ProductoItem = ({ producto, onToggleFavorito, onAgregarCarrito }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={producto.imagen} style={styles.image} />
      <Card.Content>
        <Text style={styles.title}>{producto.nombre}</Text>
        <Text style={styles.price}>{producto.precio}</Text>
        <Text style={styles.weight}>{producto.peso}</Text>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        <Paragraph style={styles.description}>
          {producto.descripcion}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button 
          icon={producto.isFavorito ? "heart" : "heart-outline"} 
          onPress={onToggleFavorito} 
          style={styles.button}
          color="#FF7BAE"
        >
          Favorito
        </Button>
        <Button 
          mode="contained" 
          icon="cart" 
          onPress={onAgregarCarrito} 
          style={styles.button}
          color="#FF7BAE"
        >
          Añadir al carrito
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 16,
  },
  image: {
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: '#888',
  },
  weight: {
    fontSize: 14,
    color: '#888',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7BAE',
    marginVertical: 8,
  },
  description: {
    fontSize: 18,
    marginVertical: 16,
    color: '#666',
  },
  actions: {
    justifyContent: 'space-between',
  },
  button: {
    margin: 4,
  },
});

export default ProductoItem;
