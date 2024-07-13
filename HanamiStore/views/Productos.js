import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, Alert , RefreshControl} from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import fetchData from "../utils/fechdata"; // Importación de utilidad para fetch
import ProductoCard from '../components/ProductoCard';

const Productos = ({ navigation }) => {
  const [dataProductos, setDataProductos] = useState([]); // Estado para almacenar los productos más recientes
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refrescado de la lista

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

  const windowWidth = Dimensions.get('window').width; // Ancho de la pantalla actual

   // Efecto para cargar los productos más recientes al cargar el componente
   useEffect(() => {
    getProductos();
  }, []);

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
            style={styles.flatlist}
            data={dataProductos}
            keyExtractor={(item) => item.id_Producto.toString()}
            numColumns={2}
            columnWrapperStyle={styles.flatlistColumnWrapper}
            renderItem={({ item }) => (
              <ProductoCard
                Nombre_Producto={item.Nombre_Producto}
                precio_producto={item.precio_producto}
                navigation={navigation}
                idProducto={item.id_Producto}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Componente de control de refresco
            }
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
