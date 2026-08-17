import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { styles } from './_login.styles';
import { useAuthStore } from '@/store/authStore';

const API_URL = 'https://treinamentoapi.codejr.com.br/api';

export default function LoginScreen() {
  const router = useRouter();
  const { user, login } = useAuthStore();
  
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (user) {
    router.replace('/');
    return null;
  }

  const handleSubmit = async () => {
    if (!email || !password || (!isLoginView && (!name || !confirmPassword))) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!isLoginView && password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);
    
    try {
      const endpoint = isLoginView ? '/login' : '/register';
      const body = isLoginView 
        ? { email, password }
        : { name, email, password };
        
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (response.ok && (data.status === 200 || data.status === 201 || data.token)) {
        login(data.user, data.token);
        router.replace('/');
      } else {
        Alert.alert('Erro', data.message || 'Ocorreu um erro. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>{isLoginView ? 'Bem-vindo' : 'Criar Conta'}</Text>
          <Text style={styles.subtitle}>
            {isLoginView 
              ? 'Faça login para acessar sua conta' 
              : 'Junte-se à nação e aproveite benefícios'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLoginView && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          {!isLoginView && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Repita sua senha"
                placeholderTextColor="#666"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isLoginView ? 'Entrar' : 'Cadastrar'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.switchTextContainer}
          onPress={() => setIsLoginView(!isLoginView)}
        >
          <Text style={styles.switchText}>
            {isLoginView ? 'Ainda não tem uma conta? ' : 'Já possui uma conta? '}
            <Text style={styles.switchTextAction}>
              {isLoginView ? 'Cadastre-se' : 'Faça login'}
            </Text>
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ marginTop: 20, alignItems: 'center' }}
          onPress={() => router.back()}
        >
          <Text style={{ color: '#888', fontSize: 14 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
