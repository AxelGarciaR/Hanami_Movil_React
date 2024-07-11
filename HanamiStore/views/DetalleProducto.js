import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card, Button, Paragraph, Dialog, Portal, Provider, } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";
import ProductoItem from '../components/ProductoItem';

const DetalleProducto = ({ route }) => {
  const { idProducto } = route.params;
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigation = useNavigation();


  const [dialogVisible, setDialogVisible] = useState(false);

  const getData = async () => {
    try {
      const form = new FormData();
      form.append("idProducto", idProducto);
      const DATA = await fetchData("productos", "readOne", form);
      if (DATA.status) {
        const producto = DATA.dataset;
        setDescripcion(producto.descripcion_producto);
        setNombre(producto.Nombre_Producto);
        setPrecio(producto.precio_producto);
        setCantidad(producto.CantidadP);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          descripcion_producto={descripcion}
          Nombre_Producto={nombre}
          precio_producto={precio}
          CantidadP={cantidad}
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
