import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ButtonAction from '../components/ButtonAction';

const Inicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/hanami.png')}
                style={styles.image}
                resizeMode="cover"a
            />
            <Text style={styles.text}>
                HANAMI{'\n'}Beauty and care
            </Text>
            <Image
                source={require('../assets/skincare.png')}
                style={styles.imagedos}
                resizeMode="cover"
            />
            <ButtonAction mode="contained" onPress={() => navigation.navigate('Cuenta')} style={styles.actionButton}>
                Ingresar
            </ButtonAction>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        backgroundColor: '#FFC8DD',
    },
    image: {
        width: '75%',
        height: 200,
        marginBottom: 20,
        marginTop: -80,
    },
    text: {
        fontSize: 60,
        textAlign: 'center',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color de la sombra
        textShadowOffset: { width: 2, height: 2 }, // Offset de la sombra
        textShadowRadius: 10, // Radio de la sombra
    },
    actionButton: {
        backgroundColor: '#FF8BA7',
        marginTop: 10,
    },
});

export default Inicio;
