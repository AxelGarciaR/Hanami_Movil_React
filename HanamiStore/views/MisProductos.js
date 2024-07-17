import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, IconButton, Button } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import CarritoProductoCard from '../components/CarritoProductoCard';

const MisProductos = ({ navigation }) => {
  const [dataProductos, setDataProductos] = useState([]); // Estado para almacenar los productos más recientes
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refrescado de la lista

  // Función para obtener productos desde la API
  const getProductos = async () => {
    try {
      const DATA = await fetchData("detalle_ordenes", "readDetail"); // Llamada a la API para obtener todos los productos
      if (DATA.status) {
        setDataProductos(DATA.dataset); // Actualización del estado con los datos obtenidos
      } else {
        console.log("Error al seleccionar productos en carrito", DATA);
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

  // Efecto para cargar los productos más recientes al cargar el componente
  useEffect(() => {
    getProductos();
  }, []);



  const { idProducto } = route.params; // Obtiene el id del producto de los parámetros de navegación
  const [descripcion, setDescripcion] = useState(""); // Estado para la descripción del producto
  const [nombre, setNombre] = useState(""); // Estado para el nombre del producto
  const [precio, setPrecio] = useState(""); // Estado para el precio del producto
  const [cantidad, setCantidad] = useState("");
  const [cantidadSoli, setCantidadSoli] = useState(""); // Estado para la cantidad disponible del producto
  const [dialogVisible, setDialogVisible] = useState(false); // Estado para controlar la visibilidad del diálogo de confirmación
  const navigation = useNavigation(); // Hook de navegación de React Navigation




  // Calcular el total de la orden
  const totalOrden = productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

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
        keyExtractor={(item) => item.id_Producto.toString()}
        numColumns={2}
        columnWrapperStyle={styles.flatlistColumnWrapper}
        renderItem={({ item }) => (
          <CarritoProductoCard
            idProducto={item.id_Producto}
            nombre_producto={item.Nombre_Producto}
            precio_producto={item.precio_producto}
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
          <Text>${totalOrden.toFixed(2)}</Text>
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
          <Text>${(totalOrden - descuento + envio).toFixed(2)}</Text>
        </View>


        <ButtonAction icon="credit-card" onPress={() => { }}>
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
