import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card, Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";

const DetalleProducto = () => {

  //Constantes de js para la api
  const { idProducto } = route.params;
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigation = useNavigation();
  ////////////////////////////////////
  
  const route = useRoute();
  const { productId } = route.params;

  const [isFavorito, setIsFavorito] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  // Aquí puedes obtener los detalles del producto con el productId
  // Por simplicidad, usaremos datos estáticos
  const producto = {
    id: productId,
    nombre: `Producto ${productId}`,
    descripcion: `Descripción del Producto ${productId}`,
    precio: `$${(5.19 * productId).toFixed(2)}`,
    peso: '150 gr / piece',
    imagen: require('../assets/skincare.png'), // Ruta local de la imagen del producto
  };

  const toggleFavorito = () => {
    setIsFavorito(!isFavorito);
  };

  const agregarCarrito = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  //Peticion para la api
  const getData = async () => {
    try {
      const form = new FormData();
      form.append("idProducto", idProducto);
      const DATA = await fetchData("producto", "readOne", form);
      if (DATA.status) {
        const producto = DATA.dataset;
        setDescripcion(producto.producto_descripcion);
        setNombre(producto.producto_nombre);
        setPrecio(producto.producto_precio);
        setImagen(producto.producto_imagen);
        setCantidad(producto.producto_cantidad);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };


  return (
    <Provider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={producto.imagen} style={styles.image} />
          <Card.Content>
            <Text style={styles.title}>{producto.nombre}</Text>
            <Text style={styles.price}>{producto.precio}</Text>
            <Text style={styles.weight}>{producto.peso}</Text>
            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Paragraph style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec gravida nulla, nec iaculis lorem. Curabitur vestibulum.
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button 
              icon={isFavorito ? "heart" : "heart-outline"} 
              onPress={toggleFavorito} 
              style={styles.button}
              color="#FF7BAE"
            >
              Favorito
            </Button>
            <Button 
              mode="contained" 
              icon="cart" 
              onPress={agregarCarrito} 
              style={styles.button}
              color="#FF7BAE"
            >
              Añadir al carrito
            </Button>
          </Card.Actions>
        </Card>
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
  card: {
    flex: 1,
    margin: 16,
  },
  image: {
    height: 300, // Aumenta la altura de la imagen
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
  button: {
    margin: 4,
  },
});

export default DetalleProducto;
