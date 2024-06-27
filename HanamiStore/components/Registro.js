import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const RegisterScreen = ({ onNavigate }) => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombrePerfil, setNombrePerfil] = useState('');

    return (
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
            <Button mode="contained" onPress={() => {}} style={styles.actionButton}>
                Siguiente
            </Button>
            <TouchableOpacity onPress={() => onNavigate('login')}>
                <Text style={styles.linkText}>¿Ya tienes cuenta? Login</Text>
            </TouchableOpacity>
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
    actionButton: {
        backgroundColor: '#FF8BA7',
        marginTop: 10,
    },
    linkText: {
        marginTop: 10,
        color: '#FF8BA7',
        textAlign: 'center',
    },
});

export default RegisterScreen;
