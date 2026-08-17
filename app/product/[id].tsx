import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ShoppingBag } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { styles } from '@/styles/product.styles';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const addItem = useCartStore(state => state.addItem);
  const showToast = useToastStore(state => state.showToast);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      // Se não houver um endpoint específico para ID, pegamos todos e filtramos
      const response = await fetch('https://treinamentoapi.codejr.com.br/api/bruno/products');
      const data = await response.json();
      const found = data.find((p: any) => String(p.id) === String(id));
      setProduct(found);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: String(product.id),
        title: product.name,
        price: 'R$ ' + product.price,
      });
      showToast('Produto adicionado à sacola!');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
        </View>
        <ActivityIndicator size="large" color="#E0232A" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>Produto não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/image.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>R$ {product.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>
            {product.description || 'Nenhuma descrição detalhada fornecida para este produto oficial rubro-negro. Uma peça indispensável para demonstrar a sua paixão pelo Flamengo em qualquer ocasião.'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingBag color="#FFF" size={20} />
          <Text style={styles.addToCartText}>Adicionar à Sacola</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
