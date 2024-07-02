import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { TextInput, Card, Title, Paragraph, Button } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction'; // Asegúrate de ajustar la ruta si es necesario

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido/a</Text>
        <Text style={styles.nameText}>Emily Murillo</Text>
      </View>
      <TextInput
        placeholder="Buscar productos"
        left={<TextInput.Icon name="card-search-outline" />}
        style={styles.searchInput}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Productos populares</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      <View style={styles.productContainer}>
        <Card style={styles.productCard}>
          <Card.Cover style={styles.cardImage} source={require('../assets/skincare.png')} />
          <Card.Content style={styles.cardContent}>
            <Title style={styles.cardTitle}>BEST SELLER</Title>
            <Paragraph style={styles.cardText}>Loción hidratante</Paragraph>
            <Text style={styles.price}>$10</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <ButtonAction label="+" />
          </Card.Actions>
        </Card>
        <Card style={styles.productCard}>
          <Card.Cover style={styles.cardImage} source={require('../assets/skincare.png')} />
          <Card.Content style={styles.cardContent}>
            <Title style={styles.cardTitle}>BEST SELLER</Title>
            <Paragraph style={styles.cardText}>Crema de manos</Paragraph>
            <Text style={styles.price}>$9.99</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <ButtonAction label="+" />
          </Card.Actions>
        </Card>
        <Card style={styles.productCard}>
          <Card.Cover style={styles.cardImage} source={require('../assets/skincare.png')} />
          <Card.Content style={styles.cardContent}>
            <Title style={styles.cardTitle}>NUEVO PRODUCTO</Title>
            <Paragraph style={styles.cardText}>Loción hidratante</Paragraph>
            <Text style={styles.price}>$5.69</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <ButtonAction label="+" />
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center', // Centra el texto del encabezado
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#007BFF',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 10, // Hace que las tarjetas sean más cuadradas
  },
  cardImage: {
    height: 150,
    borderRadius: 10, // Hace que las imágenes sean más cuadradas
  },
  cardContent: {
    alignItems: 'center', // Centra el contenido de la tarjeta
  },
  cardTitle: {
    textAlign: 'center',
  },
  cardText: {
    textAlign: 'center',
  },
  price: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardActions: {
    justifyContent: 'center', // Centra el botón de acción
  },
});

export default Dashboard;
