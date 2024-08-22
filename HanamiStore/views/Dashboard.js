import React, { useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, FlatList, RefreshControl } from 'react-native';
import { DrawerActions } from '@react-navigation/drawer';
import fetchData from "../utils/fechdata";
import ProductoCard from '../components/ProductoCard';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

const Dashboard = () => {
  const [nombre, setNombre] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const [dataNewProducts, setDataNewProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getPerfilData = async () => {
    try {
      const DATA = await fetchData("cliente", "getProfile");
      if (DATA.status) {
        const usuario = DATA.data;
        if (usuario) {
          setNombre(usuario.nombre_cliente || "");
        } else {
          Alert.alert("Error", "Datos del usuario no disponibles");
        }
      } else {
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al obtener la información del perfil");
    }
  };

  const getNewProducts = async () => {
    try {
      const DATA = await fetchData("productos", "newProduct");
      if (DATA.status) {
        setDataNewProducts(DATA.dataset);
      } else {
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getNewProducts().finally(() => setRefreshing(false));
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  useFocusEffect(
    useCallback(() => {
      getNewProducts();
      getPerfilData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Bienvenido/a!</Text>
          <Text style={styles.nameText}>{nombre}</Text>
        </View>
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
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 200,
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
  flatlist: {
    width: '100%',
    paddingHorizontal: 10,
  },
  flatlistColumnWrapper: {
    justifyContent: 'space-between',
  },
});

export default Dashboard;
