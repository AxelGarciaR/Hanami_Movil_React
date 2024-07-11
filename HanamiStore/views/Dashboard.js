import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, FlatList, RefreshControl } from 'react-native';
import { TextInput, Card, Button } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";
import ProductoCard from '../components/ProductoCard';

const Dashboard = ({ navigation }) => {

  const [dataNewProducts, setDataNewProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const cerrarSesion = async () => {
    try {
      const DATA = await fetchData("cliente", "logOut");

      if (DATA.status) {
        console.log("Sesión Finalizada");
        navigation.replace("Cuenta");
      } else {
        console.log("No se pudo eliminar la sesión");
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al cerrar sesión");
    }
  };

  const getNewProducts = async () => {
    try {
      const DATA = await fetchData("productos", "newProduct");
      if (DATA.status) {
        setDataNewProducts(DATA.dataset);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getNewProducts();
      setRefreshing(false);
    }, 200);
  };

  useEffect(() => {
    getNewProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido/a</Text>
        <Text style={styles.nameText}>Emily Murillo</Text>
      </View>
      <TextInput
        placeholder="Buscar productos"
        left={<TextInput.Icon name="card-search-outline" />}
        style={styles.searchInput}
      />
      <Button mode="contained" onPress={cerrarSesion} style={styles.logoutButton}>
        Cerrar Sesión
      </Button>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Productos mas recientes</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      <View style={styles.productContainer}>
        <Card style={styles.productCard}>
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
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginTop: 40,
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
  },
  seeAll: {
    fontSize: 14,
    color: '#007BFF',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '100%',
    backgroundColor: 'blue',
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
  flatlist: {
    width: '100%',
    paddingHorizontal: 10,
  },
  flatlistColumnWrapper: {
    justifyContent: 'space-between',
  },
});

export default Dashboard;
