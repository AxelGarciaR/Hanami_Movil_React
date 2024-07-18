import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { Text, Card, IconButton, Button } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import CarritoProductoCard from '../components/CarritoProductoCard';
import fetchData from "../utils/fechdata";
import { useNavigation } from '@react-navigation/native';

const MisProductos = () => {
  const navigation = useNavigation();
  const [dataProductos, setDataProductos] = useState([]); // Estado para almacenar los productos más recientes
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refrescado de la lista
  const [total, setTotal] = useState(0);

  // Función para obtener productos desde la API
  const fetchCartItems = async () => {
    try {
      const DATA = await fetchData('detalle_ordenes', 'readDetail');
      if (DATA.status) {
        setDataProductos(DATA.dataset);
        calculateTotal(DATA.dataset);
      } else {
        console.log(DATA.error);
        if (DATA.error == "No existen productos en el carrito") {
          setTotal(0);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al obtener los elementos del carrito');
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular el total basado en los elementos del carrito.
  const calculateTotal = (items) => {
    let totalAmount = 0;
    items.forEach(item => {
      const precio = parseFloat(item.precio_unitario);
      const cantidad = parseInt(item.cantidad);
      console.log(`Producto: ${item.Nombre_Producto}, Precio: ${precio}, Cantidad: ${cantidad}`);
      if (!isNaN(precio) && !isNaN(cantidad)) {
        totalAmount += precio * cantidad;
      }
    });
    console.log(`Total calculado: ${totalAmount}`);
    setTotal(totalAmount);
  };

  // Función asincrónica para finalizar la compra.
  const finishOrder = async () => {
    if (!dataProductos.length == 0) {
      Alert.alert(
        'Confirmación',
        '¿Está seguro de finalizar el pedido?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              try {
                const DATA = await fetchData('detalle_ordenes', 'finishOrder');

                if (DATA.status) {
                  Alert.alert('Éxito', DATA.message, [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]);
                  setDataProductos([]);
                  fetchCartItems();
                } else {
                  Alert.alert('Error', DATA.error);
                }
              } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Ocurrió un error al finalizar el pedido');
              }
            },
          },
        ]
      );
    } else {
      Alert.alert('Error', 'El carrito está vacío');
    }
  };

  // Función para manejar la recarga de productos
  const onRefresh = () => {
    setRefreshing(true); // Activación del indicador de recarga
    // Simulando una recarga de datos con tiempo de espera
    setTimeout(() => {
      fetchCartItems(); // Llamada para obtener productos actualizados
      setRefreshing(false); // Desactivación del indicador de recarga
    }, 200); // Tiempo de espera para la recarga
  };

  // Efecto para cargar los productos más recientes al cargar el componente
  useEffect(() => {
    fetchCartItems();
  }, []);


  // Valores fijos para descuento y envío
  const descuento = 50.00;
  const envio = 0.00;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis productos</Text>

      <Button mode="text" onPress={() => navigation.navigate('Productos')}>
        + Agregar más
      </Button>

      <FlatList
        style={styles.flatlist}
        data={dataProductos}
        keyExtractor={(item) => item.id_detalle.toString()}
        numColumns={1}
        columnWrapperStyle={styles.flatlistColumnWrapper}
        renderItem={({ item }) => (
          <CarritoProductoCard
            idProducto={item.id_detalle}
            nombre_producto={item.Nombre_Producto}
            precio_producto={item.precio_unitario}
            CantidadP={item.cantidad}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Componente de control de refresco
        }
      />


      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Resumen de pago</Text>
        <View style={styles.summaryRow}>
          <Text>Total de la orden</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Descuento</Text>
          <Text>-${descuento.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Envío</Text>
          <Text>Free</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Total</Text>
          <Text>${(total - descuento + envio).toFixed(2)}</Text>
        </View>


        <ButtonAction icon="credit-card" onPress={finishOrder}>
          Pagar
        </ButtonAction>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  summaryContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default MisProductos;
