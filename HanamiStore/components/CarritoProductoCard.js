import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import fetchData from "../utils/fechdata";

// Componente funcional ButtonAction que recibe dos props: onPress y children
const CarritoProductoCard = ({ idProducto, nombre_producto, precio_producto, CantidadP }) => {
    const [cantidadSoli, setCantidadSoli] = useState(CantidadP.toString()); // Estado para la cantidad disponible del producto

    // Función asincrónica para actualizar la cantidad de un elemento del carrito por su ID.
    const updateItemQuantity = async () => {
        try {
            const FORM = new FormData();
            FORM.append('idDetalle', idProducto);
            FORM.append('cantidadProducto', cantidadSoli);
            const DATA = await fetchData('detalle_ordenes', 'updateDetail', FORM);
            if (DATA.status) {
                console.log(DATA.message);
                // Aquí puedes agregar más lógica si es necesario, como actualizar el estado del carrito
            } else {
                console.log(DATA.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al actualizar la cantidad');
        }
    };

    // Función asincrónica para eliminar un elemento del carrito por su ID.
    const removeItem = async () => {
        try {
            const FORM = new FormData();
            FORM.append('idDetalle', idProducto);
            const DATA = await fetchData('detalle_ordenes', 'deleteDetail', FORM);
            if (DATA.status) {
                Alert.alert('Éxito', DATA.message);
                // Aquí puedes agregar más lógica si es necesario, como actualizar el estado del carrito
            } else {
                Alert.alert('Error', DATA.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al eliminar el elemento');
        }
    };

    return (
        <Card key={idProducto} style={styles.card}>
            <Card.Content>
                <View style={styles.cardContent}>
                    <Image source={require('../assets/skincare.png')} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text>{nombre_producto}</Text>
                        <Text>${precio_producto}</Text>

                        <View style={styles.quantityContainer}>
                            <Text>Cantidad producto:</Text>
                            <TextInput
                                label="Cantidad solicitada"
                                value={cantidadSoli}
                                style={styles.input}
                                onChangeText={text => setCantidadSoli(text)}
                                keyboardType="numeric" // Asegura que solo se introduzcan números
                            />
                        </View>

                        <View style={styles.actionContainer}>
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={updateItemQuantity}
                            >
                                <Text style={styles.buttonText}>Actualizar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={removeItem}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>

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
        flex: 1,
        width: '100%',
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
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    button: {
        width: "100%",
        padding: 15,
        borderRadius: 8,
        paddingVertical: 20,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#FF8BA7',
    },
});

export default CarritoProductoCard; // Exportar el componente ButtonAction por defecto
