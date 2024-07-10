import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Button, TextInput, Title, IconButton } from 'react-native-paper';

const Perfil = ({ navigation }) => {

  //Constantes de js para la api
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  /////////////////////////////////////////////

  const getPerfilData = async () => {
    try {
      const DATA = await fetchData("cliente", "getProfile");
      if (DATA.status) {
        const usuario = DATA.dataset;
        setNombre(usuario.nombre_cliente);
        setApellido(usuario.apellido_cliente);
        setCorreo(usuario.CorreoE);
        setDireccion(usuario.Direccion);
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
  
  const handlerEditarPerfil = async () => {
    try {
        const form = new FormData();
        form.append("nombre_cliente", nombre);
        form.append("apellido_cliente", apellido);
        form.append("CorreoE", correo);
        form.append("Direccion", direccion);

      const DATA = await fetchData("cliente", "editProfile", form);
      if (DATA.status) {
        Alert.alert("Hecho!", DATA.message);
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

  const handleLogout = async () => {
    try {
      const DATA = await fetchData("cliente", "logOut");
      if (DATA.status) {
        navigation.navigate('Cuenta');
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="close"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Title>Información del Usuario</Title>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={80} icon="account" />
        <Button mode="text" onPress={() => {}}>Cambiar foto</Button>
      </View>
      <TextInput
        label="Nombre del usuario"
        value="Emily Guadalupe"
        style={styles.input}
      />
      <TextInput
        label="Apellidos del usuario"
        value="Murillo Ajueta"
        style={styles.input}
      />
      <TextInput
        label="Correo del usuario"
        value="emi.murillo@gmail.com"
        style={styles.input}
      />
      <TextInput
        label="Clave"
        value="********"
        secureTextEntry
        right={<TextInput.Icon name="pencil" />}
        style={styles.input}
      />
      <TextInput
        label="Dirección"
        value="San Salvador, El Salvador"
        style={styles.input}
      />
      <Button mode="contained" style={styles.button} onPress={() => {}}>
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
