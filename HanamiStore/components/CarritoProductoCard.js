import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Card } from 'react-native-paper';

// Componente funcional ButtonAction que recibe dos props: onPress y children
const CarritoProductoCard = ({ idProducto, nombre_producto, precio_producto }) => {

    // Función para incrementar la cantidad de un producto
    const incrementarCantidad = (id) => {
        setProductos(productos.map(producto =>
            producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
        ));
    };

    // Función para disminuir la cantidad de un producto
    const disminuirCantidad = (id) => {
        setProductos(productos.map(producto =>
            producto.id === id && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
        ));
    };

    return (
        <Card key={idProducto.id} style={styles.card}>
            <Card.Content>
                <View style={styles.cardContent}>
                    <Image source={require('../assets/skincare.png')} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text>{nombre_producto}</Text>
                        <Text>bottle of 500 pellets</Text>
                        <Text>${precio_producto}</Text>


                        <View style={styles.quantityContainer}>
                            <IconButton icon="minus" onPress={() => disminuirCantidad(idProducto.id)} />
                            <Text>{producto.cantidad}</Text>
                            <IconButton icon="plus" onPress={() => incrementarCantidad(idProducto.id)} />
                        </View>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};



// Estilos del componente usando StyleSheet.create para optimización
const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
    },
    cardContent: {
        flexDirection: 'row',
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
});

export default CarritoProductoCard; // Exportar el componente ButtonAction por defecto
