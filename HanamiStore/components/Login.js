import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text, IconButton, HelperText } from 'react-native-paper';
import fetchData from "../utils/fechdata"; // Importa fetchData desde la ubicación correcta

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Función para validar la sesión al cargar el componente
    const validarSesion = async () => {
        try {
            const DATA = await fetchData("cliente", "getUser");
            if (DATA.session) {
                setEmail("");
                setPassword("");
                navigation.replace("Perfil"); // Redirige al perfil si hay una sesión activa
            } else {
                console.log("No hay sesión activa");
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al validar la sesión");
        }
    };

    // Función para manejar cambios en el texto con validación
    const handleChangeText = (text, setter, regex, maxLength) => {
        if (regex.test(text) && text.length <= maxLength) {
            setter(text);
            if (setter === setEmail) {
                setEmailError('');
            }
        }
    };

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        try {
            const form = new FormData();
            form.append("correoCliente", email);
            form.append("claveCliente", password);
    
            const DATA = await fetchData("cliente", "logIn", form);
    
            if (DATA.status) {
                setPassword("");
                setEmail("");
                navigation.replace("Dashboard"); // Redirige al dashboard si el inicio de sesión es exitoso
            } else {
                // Mostrar un mensaje de error específico al usuario
                Alert.alert("Error", DATA.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al iniciar sesión");
        }
    };
    

    // Validación de formato de correo electrónico
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Maneja el cambio de texto en el campo de correo electrónico
    const handleEmailChange = (text) => {
        setEmail(text);
        if (!validateEmail(text)) {
            setEmailError('Correo electrónico no válido');
        } else {
            setEmailError('');
        }
    };

    return (
        <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder='Correo electrónico'
                    value={email}
                    onChangeText={handleEmailChange}
                    style={styles.input}
                />
                <HelperText type="error" visible={emailError !== ''}>
                    {emailError}
                </HelperText>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Contraseña'
                        value={password}
                        onChangeText={(text) => handleChangeText(text, setPassword, /^.{0,30}$/, 30)}
                        secureTextEntry={!showPassword}
                    />
                    <IconButton
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                        color='#757575'
                    />
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Recuperacion')}>
                    <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos del componente LoginScreen
const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 20,
        marginBottom: 5,
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
        marginTop: -20,
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
    loginText: {
        color: '#fff',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'space-between',
    },
});

export default LoginScreen;
