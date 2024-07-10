import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';
import fetchData from "../utils/fechdata";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validarSesion = async () => {
        try {
            const DATA = await fetchData("cliente", "getUser");
            if (DATA.session) {

                setEmail("");
                setPassword("");
                // Navega a la siguiente pantalla o ruta en la aplicación
                navigation.replace("Dashboard");
            } else {
                console.log("No hay sesión activa");
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al validar la sesión");
        }
    };

    const handlerLogin = async () => {
        try {
            // Crea un formulario FormData con los datos de usuario y contraseña
            const form = new FormData();
            form.append("correoCliente", email);
            form.append("claveCliente", password);

            // Realiza una solicitud para iniciar sesión usando fetchData
            const DATA = await fetchData("cliente", "logIn", form);

            // Verifica la respuesta del servidor
            if (DATA.status) {
                // Limpia los campos de usuario y contraseña
                setPassword("");
                setEmail("");
                // Navega a la siguiente pantalla o ruta en la aplicación
                navigation.replace("Dashboard");
            } else {
                // Muestra una alerta en caso de error
                console.log(DATA);
                Alert.alert("Error sesión", DATA.error);
            }
        } catch (error) {
            // Maneja errores que puedan ocurrir durante la solicitud
            console.error(error, "Error desde Catch");
            Alert.alert("Error", "Ocurrió un error al iniciar sesión");
        }
    };

    useEffect(() => {
        validarSesion();
    }, []);

    return (
        <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder='Correo electrónico'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Clave'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.LoginText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Recuperacion')}>
                    <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        width: '110%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
        marginTop: -20, // Ajuste para superponer sobre el contenedor principal
    },
    actionButton: {
        backgroundColor: '#FF8BA7',
        marginTop: 10,
        padding: 12,
        alignItems: 'center',
    },
    linkText: {
        marginTop: 10,
        color: '#FF8BA7',
        textAlign: 'center',
    },
    LoginText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default LoginScreen;
