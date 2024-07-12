import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import fetchData from "../utils/fechdata"; // Importación de utilidad para fetch

// Datos de ejemplo (reemplazados por la carga desde la API en getProductos)
const productos = [
  { id: '1', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 1', precio: '$8.19', calificacion: 4.8, imagen: require('../assets/skincare.png') },
  { id: '2', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 2', precio: '$6.29', calificacion: 4.5, imagen: require('../assets/skincare.png') },
  { id: '3', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 3', precio: '$6.29', calificacion: 4.5, imagen: require('../assets/skincare.png') },
  { id: '4', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 4', precio: '$7.19', calificacion: 4.7, imagen: require('../assets/skincare.png') },
  { id: '5', nombre: 'Esencia de planta té verde', descripcion: 'Descripción 5', precio: '$5.99', calificacion: 4.6, imagen: require('../assets/skincare.png') },
];

const Productos = () => {
  const [dataProductos, setDataProductos] = useState([]); // Estado para almacenar productos desde la API
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de recarga

  // Función para obtener productos desde la API
  const getProductos = async () => {
    try {
      const DATA = await fetchData("productos", "readAll"); // Llamada a la API para obtener todos los productos
      if (DATA.status) {
        setDataProductos(DATA.dataset); // Actualización del estado con los datos obtenidos
      } else {
        console.log("Error al seleccionar productos", DATA);
        Alert.alert('Error productos', DATA.error); // Manejo de error en caso de falla en la API
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar los productos'); // Alerta de error general
    }
  };

  // Función para manejar la recarga de productos
  const onRefresh = () => {
    setRefreshing(true); // Activación del indicador de recarga
    // Simulando una recarga de datos con tiempo de espera
    setTimeout(() => {
      getProductos(); // Llamada para obtener productos actualizados
      setRefreshing(false); // Desactivación del indicador de recarga
    }, 200); // Tiempo de espera para la recarga
  };

  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(2); // Estado para el número de columnas en la lista
  const windowWidth = Dimensions.get('window').width; // Ancho de la pantalla actual

  // Renderización de cada elemento de la lista
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
        data={productos} // Cambiar a dataProductos para utilizar datos cargados desde la API
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        key={numColumns} // Forzar renderización cuando cambia el número de columnas
        refreshing={refreshing} // Propiedad para indicar que está en proceso de recarga
        onRefresh={onRefresh} // Función para manejar la recarga de productos
      />
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    margin: 8,
    marginTop: 20,
  },
  card: {
    width: (Dimensions.get('window').width / 2) - 24, // Ajustar el ancho de las tarjetas para ocupar la mitad de la pantalla
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 4, // Sombra en Android
    overflow: 'hidden', // Evitar que el contenido se desborde de la tarjeta
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
