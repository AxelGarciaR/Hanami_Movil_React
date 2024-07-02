// ProductDetail.js
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.descriptionTitle}>Descripción</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="❤️" onPress={() => {}} />
        <Button title="Añadir al carrito" onPress={() => {}} color="#E91E63" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginVertical: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#E91E63',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default ProductDetail;
