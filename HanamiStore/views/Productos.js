import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const productos = [
  { id: '1', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 1', precio: '$8.19', calificacion: 4.8, imagen: require('../assets/skincare.png') },
  { id: '2', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 2', precio: '$6.29', calificacion: 4.5, imagen: require('../assets/skincare.png') },
  { id: '3', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 3', precio: '$6.29', calificacion: 4.5, imagen: require('../assets/skincare.png') },
  { id: '4', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 4', precio: '$7.19', calificacion: 4.7, imagen: require('../assets/skincare.png') },
  { id: '5', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 5', precio: '$5.99', calificacion: 4.6, imagen: require('../assets/skincare.png') },
];

const Productos = () => {
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(2);
  const windowWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetalleProducto', { productId: item.id })} style={styles.touchable}>
      <Card style={styles.card}>
        <Image source={item.imagen} style={styles.image} />
        <Card.Content>
          <Title style={styles.title}>{item.nombre}</Title>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.calificacion}</Text>
            <Text style={styles.star}>★</Text>
          </View>
          <Paragraph style={styles.price}>{item.precio}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        key={numColumns} // Esto forzará una nueva renderización cuando el número de columnas cambie
      />
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    margin: 8,
  },
  card: {
    width: (Dimensions.get('window').width / 2) - 24, // Ajusta el ancho de las tarjetas para que ocupen la mitad del ancho de la pantalla
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 4, // Para sombra en Android
    overflow: 'hidden', // Asegúrate de que el contenido de la tarjeta no se desborde
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: 'black',
  },
  star: {
    fontSize: 14,
    color: '#FFD700', // Color dorado para la estrella
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
  },
});

export default Productos;
