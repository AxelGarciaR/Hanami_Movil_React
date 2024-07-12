import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Button, TextInput, Title, IconButton } from 'react-native-paper';
import fetchData from "../utils/fechdata"; // Importación de utilidad para fetch

const Perfil = ({ navigation }) => {
  // Estados para almacenar los datos del usuario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [clave, setClave] = useState(""); // Estado para la nueva clave

  // Función useEffect para cargar datos del perfil al inicio
  useEffect(() => {
    getPerfilData();
  }, []);

  // Función asincrónica para obtener datos del perfil desde la API
  const getPerfilData = async () => {
    try {
      const DATA = await fetchData("cliente", "getProfile");
      if (DATA.status) {
        const usuario = DATA.data; // Obtención de datos del usuario desde la respuesta
        if (usuario) {
          setNombre(usuario.nombre_cliente || "");
          setApellido(usuario.apellido_cliente || "");
          setCorreo(usuario.CorreoE || "");
          setDireccion(usuario.Direccion || "");
        } else {
          Alert.alert("Error", "Datos del usuario no disponibles");
        }
      } else {
        console.log(DATA.error);
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al obtener la información del perfil");
    }
  };

  // Función asincrónica para manejar la edición del perfil
  const handlerEditarPerfil = async () => {
    try {
      const form = new FormData();
      form.append("nombre_cliente", nombre);
      form.append("apellido_cliente", apellido);
      form.append("CorreoE", correo);
      form.append("Direccion", direccion);
      if (clave) {
        form.append("Clave", clave); // Se agrega la clave solo si se ha ingresado nueva
      }

      const DATA = await fetchData("cliente", "editProfile", form); // Llamada a API para editar perfil
      if (DATA.status) {
        Alert.alert("Hecho!", DATA.message); // Alerta de éxito al editar perfil
      } else {
        console.log(DATA.error);
        Alert.alert("Error", DATA.error); // Alerta de error al editar perfil
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al actualizar la información del perfil");
    }
  };

  // Función asincrónica para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      const DATA = await fetchData("cliente", "logOut"); // Llamada a API para cerrar sesión
      if (DATA.status) {
        navigation.navigate('Cuenta'); // Redirección a la pantalla de cuenta al cerrar sesión exitosamente
      } else {
        Alert.alert('Error', DATA.error); // Alerta de error al intentar cerrar sesión
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Title>Información del Usuario</Title>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={80} icon="account" />
      </View>
      <TextInput
        label="Nombre del usuario"
        value={nombre}
        style={styles.input}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        label="Apellidos del usuario"
        value={apellido}
        style={styles.input}
        onChangeText={text => setApellido(text)}
      />
      <TextInput
        label="Correo del usuario"
        value={correo}
        style={styles.input}
        onChangeText={text => setCorreo(text)}
      />
      <TextInput
        label="Clave"
        value={clave}
        secureTextEntry
        right={<TextInput.Icon name="pencil" />}
        style={styles.input}
        onChangeText={text => setClave(text)}
      />
      <TextInput
        label="Dirección"
        value={direccion}
        style={styles.input}
        onChangeText={text => setDireccion(text)}
      />
      <Button mode="contained" style={styles.button} onPress={handlerEditarPerfil}>
        GUARDAR CAMBIOS
      </Button>
      <Button mode="contained" style={styles.button} onPress={handleLogout}>
        CERRAR SESIÓN
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default Perfil;
