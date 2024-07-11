import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Button, Text, Dialog, Portal } from 'react-native-paper';
import ButtonAction from './ButtonAction';
import fetchData from "../utils/fechdata";

const RegisterScreen = ({ navigation }) => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombrePerfil, setNombrePerfil] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);

    const showDialog = () => setRegistroExitoso(true);
    const hideDialog = () => {
        setRegistroExitoso(false);
        navigation.navigate('Cuenta'); // Redirige al login
    };

    const handleChangeText = (text, setter, regex, maxLength) => {
        if (regex.test(text) && text.length <= maxLength) {
            setter(text);
        }
    };

    const handlerRegistro = async () => {
        try {
            const form = new FormData();
            form.append("nombreCliente", nombres);
            form.append("apellidoCliente", apellidos);
            form.append("perfilCliente", nombrePerfil);
            form.append("claveCliente", password);
            form.append("confirmarClave", confirmPassword);
            form.append("correoCliente", email);
            form.append("direccionCliente", direccion);

            const DATA = await fetchData("cliente", "signUp", form);
            if (DATA.status) {
                setNombres("");
                setApellidos("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setDireccion("");
                setNombrePerfil("");
                
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder='Nombres'
                        value={nombres}
                        onChangeText={(text) => handleChangeText(text, setNombres, /^[A-Za-z\s]*$/, 20)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Apellidos'
                        value={apellidos}
                        onChangeText={(text) => handleChangeText(text, setApellidos, /^[A-Za-z\s]*$/, 20)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Correo electrónico'
                        value={email}
                        onChangeText={(text) => handleChangeText(text, setEmail, /^.{0,50}$/, 50)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Clave'
                        value={password}
                        onChangeText={(text) => handleChangeText(text, setPassword, /^.{0,30}$/, 30)}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Confirmar Clave'
                        value={confirmPassword}
                        onChangeText={(text) => handleChangeText(text, setConfirmPassword, /^.{0,30}$/, 30)}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Dirección'
                        value={direccion}
                        onChangeText={(text) => handleChangeText(text, setDireccion, /^.{0,50}$/, 50)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Nombre de perfil'
                        value={nombrePerfil}
                        onChangeText={(text) => handleChangeText(text, setNombrePerfil, /^.{0,20}$/, 20)}
                        style={styles.input}
                    />
                    <ButtonAction
                        mode="contained"
                        onPress={handlerRegistro}
                        style={styles.actionButton}
                    >
                        Crear
                    </ButtonAction>

                    <TouchableOpacity onPress={() => navigation.navigate('Cuenta')}>
                        <Text style={styles.linkText}>¿Ya tienes cuenta? Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Portal>
                <Dialog visible={registroExitoso} onDismiss={hideDialog}>
                    <View style={styles.dialogContent}>
                        <Image
                            source={require('../assets/cheque.png')}
                            style={styles.dialogImage}
                        />
                        <Text style={styles.dialogText}>¡Registro exitoso! Ahora regrese al inicio de sesión</Text>
                    </View>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 4,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
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
        paddingHorizontal: 10,
        paddingBottom: 10,
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
