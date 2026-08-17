import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Edit2, Trash2, ShieldAlert } from 'lucide-react-native';
import { styles } from './painel.styles';
import { useAuthStore } from '@/store/authStore';
import { useFocusEffect, useRouter } from 'expo-router';

const API_URL = 'https://treinamentoapi.codejr.com.br/api/bruno/products';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
}

export default function PainelScreen() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchProducts = async () => {
    if (!token) return;
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data || data); // Depending on API pagination wrapping
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProducts();
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchProducts();
      }
    }, [token])
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImageUrl(product.image_url);
    } else {
      setEditingProduct(null);
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert('Erro', 'Nome e preço são obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = editingProduct ? `${API_URL}/${editingProduct.id}` : API_URL;
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          price,
          image_url: imageUrl || 'https://via.placeholder.com/150'
        })
      });

      if (response.ok) {
        Alert.alert('Sucesso', `Produto ${editingProduct ? 'atualizado' : 'criado'} com sucesso!`);
        setModalVisible(false);
        fetchProducts();
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Falha ao salvar produto');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'application/json'
                }
              });
              if (response.ok) {
                fetchProducts();
              } else {
                Alert.alert('Erro', 'Falha ao excluir produto');
              }
            } catch (error) {
              Alert.alert('Erro', 'Falha na comunicação com o servidor');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    if (!user || !token) {
      router.replace('/login');
    }
  }, [user, token]);

  if (!user || !token) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Painel (Produtos)</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleOpenModal()}>
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#E0232A" />
        }
      >
        {products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
          </View>
        ) : (
          products.map(product => (
            <View key={product.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>R$ {product.price}</Text>
              </View>
              <Text style={styles.productDescription} numberOfLines={2}>
                {product.description || 'Sem descrição'}
              </Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleOpenModal(product)}>
                  <Edit2 color="#FFF" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDelete]} onPress={() => handleDelete(product.id)}>
                  <Trash2 color="#E0232A" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Form Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Camisa Oficial 2025"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Preço</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 349.90"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descrição do produto..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton} 
                onPress={() => setModalVisible(false)}
                disabled={isLoading}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalSaveButton} 
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.modalSaveText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
