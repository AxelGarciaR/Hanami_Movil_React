import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';

const LoginScreen = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
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
            <Button mode="contained" onPress={() => {}} style={styles.actionButton}>
                Login
            </Button>
            <TouchableOpacity onPress={() => onNavigate('register')}>
                <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
};

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