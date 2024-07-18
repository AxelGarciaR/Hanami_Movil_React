import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Card, Button, Paragraph, Portal, Dialog } from 'react-native-paper';
import fetchData from "../utils/fechdata";
import ButtonAction from './ButtonAction'; // Ajusta la ruta según sea necesario

const ProductoItem = ({ descripcion_producto, Nombre_Producto, precio_producto, CantidadP, idProducto }) => {

  const [dialogVisible, setDialogVisible] = useState(false); // Estado para controlar la visibilidad del diálogo de confirmación

  // Función para ocultar el diálogo de confirmación
  const hideDialog = () => {
    setDialogVisible(false);
  };

  // Función para mostrar el diálogo de confirmación al agregar al carrito
  const agregarCarrito = () => {
    setDialogVisible(true);
  };

  const [cantidadSoli, setCantidadSoli] = useState(""); // Estado para la cantidad disponible del producto

  const agregarAlCarrito = async () => {
    try {
      const FORM = new FormData();
      FORM.append("idProducto", idProducto);
      FORM.append("cantidadProducto", cantidadSoli); // Cantidad fija por ahora
      const data = await fetchData('detalle_ordenes', 'createDetail', FORM);
      if (data.status) {
        Alert.alert("Agregado al carrito con éxito");
        agregarCarrito();
        navigation.navigate(Carrito); // Navegamos a la pantalla del carrito
      } else {
        Alert.alert("Error al agregar productos al carrito");
      }
    } catch (error) {
      Alert.alert("Error al ejecutar la petición: " + error);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Cover source={require('../assets/skincare.png')} style={styles.image} />

      <Card.Content>
        <Text style={styles.title}>{Nombre_Producto}</Text>

        <Text style={styles.price}>Precio:</Text>
        <Text style={styles.price}>{precio_producto}</Text>

        <Text style={styles.weight}>Cantidad disponible:</Text>
        <Text style={styles.weight}>{CantidadP}</Text>

        <Text style={styles.descriptionTitle}>Descripción:</Text>
        <Paragraph style={styles.description}>
          {descripcion_producto}
        </Paragraph>

        <Text style={styles.weight}>Cantidad solicitada:</Text>
        <TextInput
          label="Cantidad solicitada"
          value={cantidadSoli}
          style={styles.input}
          onChangeText={text => setCantidadSoli(text)}
        />

      </Card.Content>



      <Card.Actions style={styles.actions}>
        <Button
          mode="contained"
          icon="cart"
          onPress={agregarAlCarrito}
          style={styles.button}
          color="#FF7BAE"
        >
          Añadir al carrito
        </Button>
      </Card.Actions>

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

    </Card>
  );
};

// Estilos del componente ProductoItem
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 16,
  },
  image: {
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: '#888',
  },
  weight: {
    fontSize: 14,
    color: '#888',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7BAE',
    marginVertical: 8,
  },
  description: {
    fontSize: 18,
    marginVertical: 16,
    color: '#666',
  },
  actions: {
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#e0e0e0',
    height: 40,
    borderRadius: 5,
    borderStyle: 'Solid',
    padding: 5,

  },
  button: {
    margin: 4,
  },
});

export default ProductoItem;
