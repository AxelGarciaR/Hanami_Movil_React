import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Button, Text, Dialog, Portal } from 'react-native-paper';
import ButtonAction from './ButtonAction';
import fetchData from "../utils/fechdata";

const RegisterScreen = ({ navigation }) => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombrePerfil, setNombrePerfil] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);

    const showDialog = () => setRegistroExitoso(true);
    const hideDialog = () => {
        setRegistroExitoso(false);
        navigation.navigate('Cuenta'); // Redirige al login
    };

    const handlerRegistro = async () => {
        try {
            const form = new FormData();
            form.append("nombre_cliente", nombres);
            form.append("apellido_cliente", apellidos);
            form.append("nombre_perfil", nombrePerfil);
            form.append("clave", password);
            form.append("CorreoE", email);
            form.append("Direccion", direccion);

            const DATA = await fetchData("cliente", "signUp", form);
            if (DATA.status) {

                showDialog();

            } else {
                console.log(DATA.error);
                Alert.alert("Error", DATA.error);
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
        }
    };

    return (
        <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder='Nombres'
                    value={nombres}
                    onChangeText={setNombres}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Apellidos'
                    value={apellidos}
                    onChangeText={setApellidos}
                    style={styles.input}
                />
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
                <TextInput
                    placeholder='Dirección'
                    value={direccion}
                    onChangeText={setDireccion}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Nombre de perfil'
                    value={nombrePerfil}
                    onChangeText={setNombrePerfil}
                    style={styles.input}
                />
                <ButtonAction
                    mode="contained"
                    onPress={showDialog}
                    style={styles.actionButton}
                >
                    Crear
                </ButtonAction>

                <TouchableOpacity onPress={() => navigation.navigate('Cuenta')}>
                    <Text style={styles.linkText}>¿Ya tienes cuenta? Login</Text>
                </TouchableOpacity>


            </View>

            <Portal>
                <Dialog visible={registroExitoso} onDismiss={hideDialog}>
                    <View style={styles.dialogContent}>
                        <Image
                            source={require('../assets/cheque.png')}
                            style={styles.dialogImage}
                        />
                        <Text style={styles.dialogText}>¡Registro exitoso!</Text>
                    </View>
                </Dialog>
            </Portal>

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
    },
    linkText: {
        marginTop: 10,
        color: '#FF8BA7',
        textAlign: 'center',
    },
    dialogContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    dialogImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    dialogText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default RegisterScreen;
