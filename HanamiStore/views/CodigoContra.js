import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";

const CodigoContra = ({ navigation, route }) => {
    const { codigo, email } = route.params; // Recibe el código y el correo electrónico

    const [codigoIngresado, setCodigoIngresado] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/hanami.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.text}>Recuperación</Text>
                <View style={styles.whiteContainer}>
                    <Image
                        source={require('../assets/logodoshanami.png')}
                        style={styles.imagedos}
                    />
                    <Text style={styles.instructionText}>¡Revisa tu correo!</Text>
                    <Text style={styles.instructionText}>Ingresa el código que te enviamos en los espacios de abajo y restablece tu contraseña.</Text>
                    <View style={styles.contenedorInputs}>
                        <TextInput
                            placeholder='1'
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.inputCode}
                            textAlign='center'
                            onChangeText={(text) => setCodigoIngresado(codigoIngresado + text)}
                        />
                        <TextInput
                            placeholder='2'
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.inputCode}
                            textAlign='center'
                            onChangeText={(text) => setCodigoIngresado(codigoIngresado + text)}
                        />
                        <TextInput
                            placeholder='3'
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.inputCode}
                            textAlign='center'
                            onChangeText={(text) => setCodigoIngresado(codigoIngresado + text)}
                        />
                        <TextInput
                            placeholder='4'
                            keyboardType='numeric'
                            maxLength={1}
                            style={styles.inputCode}
                            textAlign='center'
                            onChangeText={(text) => setCodigoIngresado(codigoIngresado + text)}
                        />
                    </View>
                    <ButtonAction
                        mode="contained"
                        onPress={() => {
                            if (codigoIngresado === codigo) {
                                navigation.navigate('NuevaContra', { email }); // Pasar el email a NuevaContra
                            } else {
                                Alert.alert('Error', 'El código ingresado no es correcto');
                            }
                        }}
                        style={styles.actionButton}
                    >
                        Verificar
                    </ButtonAction>
                </View>
            </View>
        </ScrollView>
    );
};


// Estilos para el componente CodigoContra
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#FFC8DD',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '50%',
        height: 200,
        marginBottom: 5,
    },
    imagedos: {
        width: '100%',
        height: 250,
        marginBottom: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    whiteContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
    },
    contenedorInputs: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    inputCode: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '20%',
        textAlign: 'center',
    },
    instructionText: {
        marginBottom: 10,
        textAlign: 'center',
    },
    actionButton: {
        marginTop: 20,
    },
});

export default CodigoContra;
