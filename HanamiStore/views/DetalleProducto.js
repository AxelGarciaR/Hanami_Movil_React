import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card, Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";
import ProductoItem from '../components/ProductoItem';

const DetalleProducto = () => {
  const route = useRoute();
  const { idProducto } = route.params;

  const [producto, setProducto] = useState({
    id: idProducto,
    nombre: '',
    descripcion: '',
    precio: '',
    peso: '',
    imagen: null,
    cantidad: '',
    isFavorito: false,
  });

  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const form = new FormData();
      form.append("idProducto", idProducto);
      const DATA = await fetchData("producto", "readOne", form);
      if (DATA.status) {
        const producto = DATA.dataset;
        setProducto({
          id: producto.producto_id,
          nombre: producto.producto_nombre,
          descripcion: producto.producto_descripcion,
          precio: producto.producto_precio,
          peso: producto.producto_peso,
          imagen: producto.producto_imagen,
          cantidad: producto.producto_cantidad,
          isFavorito: false, // Puedes establecer esto dependiendo de tu lógica
        });
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  const toggleFavorito = () => {
    setProducto({ ...producto, isFavorito: !producto.isFavorito });
  };

  const agregarCarrito = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ProductoItem
          producto={producto}
          onToggleFavorito={toggleFavorito}
          onAgregarCarrito={agregarCarrito}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default DetalleProducto;
