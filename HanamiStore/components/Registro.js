import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Button, Text, Dialog, Portal, IconButton } from 'react-native-paper';
import ButtonAction from './ButtonAction'; // Ajusta la ruta según sea necesario
import fetchData from "../utils/fechdata"; // Importación de función utilitaria para manejar datos

const RegisterScreen = ({ navigation }) => {
    // Estados para almacenar los datos del formulario y controlar la visibilidad de la contraseña
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombrePerfil, setNombrePerfil] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Función para mostrar el diálogo de registro exitoso
    const showDialog = () => setRegistroExitoso(true);

    // Función para ocultar el diálogo y redirigir al inicio de sesión
    const hideDialog = () => {
        setRegistroExitoso(false);
        navigation.navigate('Cuenta'); // Redirige al login
    };

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Función para manejar cambios en los campos de texto del formulario
    const handleChangeText = (text, setter, regex, maxLength) => {
        if (regex.test(text) && text.length <= maxLength) {
            setter(text);
        }
    };

    // Función para manejar el registro de usuario
    const handlerRegistro = async () => {
        try {
            // Crear un objeto FormData con los datos del formulario
            const form = new FormData();
            form.append("nombreCliente", nombres);
            form.append("apellidoCliente", apellidos);
            form.append("perfilCliente", nombrePerfil);
            form.append("claveCliente", password);
            form.append("confirmarClave", confirmPassword);
            form.append("correoCliente", email);
            form.append("direccionCliente", direccion);

            // Llamar a la función fetchData para enviar datos al backend y recibir respuesta
            const DATA = await fetchData("cliente", "signUp", form);

            // Si el registro es exitoso, limpiar los campos y mostrar el diálogo de éxito
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
                // Si hay un error, mostrar el mensaje de error recibido del backend
                console.log(DATA.error);
                Alert.alert("Error", DATA.error);
                return;
            }
        } catch (error) {
            // Capturar y mostrar cualquier error inesperado
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
        }
    };

    return (
        <View style={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Nombres'
                            value={nombres}
                            onChangeText={(text) => handleChangeText(text, setNombres, /^[A-Za-z\s]*$/, 20)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Apellidos'
                            value={apellidos}
                            onChangeText={(text) => handleChangeText(text, setApellidos, /^[A-Za-z\s]*$/, 20)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Correo electrónico'
                            value={email}
                            onChangeText={(text) => handleChangeText(text, setEmail, /^.{0,50}$/, 50)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Clave'
                            value={password}
                            onChangeText={(text) => handleChangeText(text, setPassword, /^.{0,30}$/, 30)}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                        />
                        <IconButton
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                            color='#757575'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Confirmar Clave'
                            value={confirmPassword}
                            onChangeText={(text) => handleChangeText(text, setConfirmPassword, /^.{0,30}$/, 30)}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                        />
                        <IconButton
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={togglePasswordVisibility}
                            color='#757575'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Dirección'
                            value={direccion}
                            onChangeText={(text) => handleChangeText(text, setDireccion, /^.{0,50}$/, 50)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Nombre de perfil'
                            value={nombrePerfil}
                            onChangeText={(text) => handleChangeText(text, setNombrePerfil, /^.{0,20}$/, 20)}
                            style={styles.input}
                        />
                    </View>
                    <ButtonAction
                        mode="contained"
                        onPress={handlerRegistro}
                        style={styles.actionButton}
                    >
                        Crear
                    </ButtonAction>
                    <TouchableOpacity onPress={() => navigation.navigate('Cuenta')}>
                        <Text style={styles.linkText}>¿Ya tienes cuenta? Iniciar sesión</Text>
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

// Estilos para el componente RegisterScreen
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 40,
        marginTop: 10,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 10,
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
