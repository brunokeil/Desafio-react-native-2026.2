import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Phone, MapPin, AtSign, Users } from 'lucide-react-native';
import { styles } from './contato.styles';

export default function ContatoScreen() {
  const handlePress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Fale Conosco</Text>
          <Text style={styles.subtitle}>
            Estamos sempre prontos para ouvir a Nação Rubro-Negra.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Canais de Atendimento</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('tel:+5521999999999')}>
            <View style={styles.contactIcon}>
              <Phone color="#E0232A" size={24} />
            </View>
            <View>
              <Text style={styles.contactLabel}>Telefone</Text>
              <Text style={styles.contactValue}>(21) 99999-9999</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('mailto:contato@flamengo.com.br')}>
            <View style={styles.contactIcon}>
              <Mail color="#E0232A" size={24} />
            </View>
            <View>
              <Text style={styles.contactLabel}>E-mail</Text>
              <Text style={styles.contactValue}>contato@nacaorubronegra.com.br</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redes Sociais</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('https://instagram.com')}>
            <View style={styles.contactIcon}>
              <AtSign color="#E0232A" size={24} />
            </View>
            <View>
              <Text style={styles.contactLabel}>Instagram</Text>
              <Text style={styles.contactValue}>@nacaorubronegra</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('https://facebook.com')}>
            <View style={styles.contactIcon}>
              <Users color="#E0232A" size={24} />
            </View>
            <View>
              <Text style={styles.contactLabel}>Facebook</Text>
              <Text style={styles.contactValue}>/nacaorubronegra</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('https://maps.google.com/?q=Maracanã')}>
            <View style={styles.contactIcon}>
              <MapPin color="#E0232A" size={24} />
            </View>
            <View>
              <Text style={styles.contactLabel}>Sede</Text>
              <Text style={styles.contactValue}>Av. Pres. Castelo Branco, Portão 3 - Maracanã</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
