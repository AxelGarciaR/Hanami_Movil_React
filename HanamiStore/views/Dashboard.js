import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, FlatList, RefreshControl } from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import fetchData from "../utils/fechdata";
import ProductoCard from '../components/ProductoCard';
import { useRoute } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const route = useRoute();
  const [dataNewProducts, setDataNewProducts] = useState([]); // Estado para almacenar los productos más recientes
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refrescado de la lista

  // Función para obtener los productos más recientes desde la API
  const getNewProducts = async () => {
    try {
      const DATA = await fetchData("productos", "newProduct");
      if (DATA.status) {
        setDataNewProducts(DATA.dataset); // Actualiza el estado con los datos de los productos
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  // Función para manejar el evento de refrescar la lista de productos
  const onRefresh = () => {
    setRefreshing(true); // Activa el indicador de refrescado
    setTimeout(() => {
      getNewProducts(); // Llama a la función para obtener los productos más recientes
      setRefreshing(false); // Desactiva el indicador de refrescado después de 200ms
    }, 200);
  };

  // Efecto para cargar los productos más recientes al cargar el componente
  useEffect(() => {
    getNewProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido/a!</Text>
        <Text style={styles.nameText}>{route.params?.nombrePerfil}</Text>
      </View>

      <TextInput
        placeholder="Buscar productos"
        left={<TextInput.Icon name="card-search-outline" />}
        style={styles.searchInput}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Productos más recientes</Text>
      </View>

      <View style={styles.productContainer}>
        <FlatList
          style={styles.flatlist}
          data={dataNewProducts}
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
    </ScrollView>
  );
};

// Estilos para el componente Dashboard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '100%',
    backgroundColor: '#E0E0E0', // Color modificado para visibilidad
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  flatlist: {
    width: '100%',
    paddingHorizontal: 10,
  },
  flatlistColumnWrapper: {
    justifyContent: 'space-between',
  },
});

export default Dashboard;
