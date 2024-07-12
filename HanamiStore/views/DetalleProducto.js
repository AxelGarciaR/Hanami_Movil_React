import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";
import ProductoItem from '../components/ProductoItem';

const DetalleProducto = ({ route }) => {
  const { idProducto } = route.params; // Obtiene el id del producto de los parámetros de navegación
  const [descripcion, setDescripcion] = useState(""); // Estado para la descripción del producto
  const [nombre, setNombre] = useState(""); // Estado para el nombre del producto
  const [precio, setPrecio] = useState(""); // Estado para el precio del producto
  const [cantidad, setCantidad] = useState(""); // Estado para la cantidad disponible del producto
  const [dialogVisible, setDialogVisible] = useState(false); // Estado para controlar la visibilidad del diálogo de confirmación
  const navigation = useNavigation(); // Hook de navegación de React Navigation

  // Función para obtener los detalles del producto desde la API
  const getData = async () => {
    try {
      const form = new FormData();
      form.append("idProducto", idProducto);
      const DATA = await fetchData("productos", "readOne", form); // Llama a la función fetchData para obtener los datos del producto
      if (DATA.status) {
        const producto = DATA.dataset; // Extrae los datos del producto del resultado
        setDescripcion(producto.descripcion_producto);
        setNombre(producto.Nombre_Producto);
        setPrecio(producto.precio_producto);
        setCantidad(producto.CantidadP);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error); // Muestra una alerta en caso de error
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  // Efecto para cargar los datos del producto al cargar el componente
  useEffect(() => {
    getData();
  }, []);

  // Función para mostrar el diálogo de confirmación al agregar al carrito
  const agregarCarrito = () => {
    setDialogVisible(true);
  };

  // Función para ocultar el diálogo de confirmación
  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ProductoItem
          descripcion_producto={descripcion}
          Nombre_Producto={nombre}
          precio_producto={precio}
          CantidadP={cantidad}
          onAgregarCarrito={agregarCarrito} // Propiedad para manejar el evento de agregar al carrito
        />
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>Éxito</Dialog.Title>
            <Dialog.Content>
              <Paragraph>¡Agregado al carrito correctamente!</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <ButtonAction onPress={hideDialog}>OK</ButtonAction>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

// Estilos para el componente DetalleProducto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default DetalleProducto;
