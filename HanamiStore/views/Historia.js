import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert, RefreshControl } from 'react-native';
import { Card, Button, Dialog, Portal } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";

const Carrito = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [dataRecord, setDataRecord] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Función para obtener los productos más recientes desde la API
  const getRecord = async () => {
    try {
      const DATA = await fetchData("detalle_ordenes", "readRecord");
      if (DATA.status) {
        setDataRecord(DATA.dataset); // Actualiza el estado con los datos de los productos
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  // Cálculo del total de los productos en el carrito
  const total = dataRecord.reduce((sum, product) => sum + (parseFloat(product.precio_unitario) || 0) * (product.cantidad || 0), 0);

  // Función para mostrar el diálogo de confirmación
  const showDialog = () => setVisible(true);

  // Función para ocultar el diálogo de confirmación
  const hideDialog = () => setVisible(false);

  // Función para manejar el pago (aquí puedes añadir lógica adicional como realizar un pago real)
  const handlePayment = () => {
    navigation.navigate('MisProductos'); // Redirige al usuario después de pagar
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getRecord();
      setRefreshing(false);
    }, 200);
  };

  useEffect(() => {
    getRecord();
  }, []);

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Text style={styles.headerText}>Historial de compra</Text>

      {dataRecord.map((producto) => (
        <Card key={producto.id_detalle} style={styles.productCard}>
          <View style={styles.cardContent}>
            <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{producto.Nombre_Producto}</Text>
              <Text style={styles.productPrice}>Precio: {(parseFloat(producto.precio_unitario) || 0).toFixed(2)}$</Text>
              <Text style={styles.productQuantity}>Cantidad: {producto.cantidad}</Text>
              <Text style={styles.productDate}>Fecha de compra: {new Date(producto.Fecha_Orden).toLocaleDateString()}</Text>
            </View>
          </View>
        </Card>
      ))}


      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirmación</Dialog.Title>
          <Dialog.Content>
            <Text>¿Desea ir a pagar sus productos?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonAction onPress={() => { hideDialog(); handlePayment(); }}>Sí</ButtonAction>
            <ButtonAction onPress={hideDialog}>No</ButtonAction>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  productCard: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
  },
  productQuantity: {
    fontSize: 16,
    color: '#666',
  },
  productDate: {
    fontSize: 16,
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#FF6F61',
  },
});

export default Carrito;
