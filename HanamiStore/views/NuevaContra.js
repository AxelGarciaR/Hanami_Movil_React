import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper'; // Importa IconButton desde react-native-paper
import ButtonAction from '../components/ButtonAction';

const NuevaContra = ({ navigation }) => {
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/hanami.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.text}>
                Nueva contraseña
            </Text>
            <View style={styles.whiteContainer}>
                <Text style={styles.textdos}>
                    Contraseña
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Contraseña'
                        value={pass}
                        onChangeText={setPass}
                        style={styles.input}
                        secureTextEntry={!showPassword} // Ocultar la contraseña si showPassword es falso
                    />
                    <IconButton
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                        color='#757575'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Nueva contraseña'
                        value={newPass}
                        onChangeText={setNewPass}
                        style={styles.input}
                        secureTextEntry={!showPassword} // Ocultar la contraseña si showPassword es falso
                    />
                    <IconButton
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                        color='#757575'
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#FFC8DD',
    },
    image: {
        width: '75%',
        height: 250,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textdos: {
        marginTop: 60,
        marginRight: 175,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 10,
    },
    whiteContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF', // Color blanco
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    linkText: {
        marginTop: 30,
    },
});

export default NuevaContra;
