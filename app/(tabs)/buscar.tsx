import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, SlidersHorizontal, Plus } from "lucide-react-native";
import { styles } from "@/styles/buscar.styles";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useRouter } from "expo-router";

const CATEGORIES = ["Todos", "Camisas", "Agasalhos", "Shorts", "Acessórios"];

export default function BuscarScreen() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://treinamentoapi.codejr.com.br/api/bruno/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: String(product.id),
      title: product.name,
      price: 'R$ ' + product.price,
    });
    showToast('Produto adicionado à sacola!');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.exploreText}>EXPLORAR</Text>
          <Text style={styles.titlePrimary}>Toda a coleção</Text>
          <Text style={styles.titleSecondary}>rubro-negra</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search color="#888" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar na loja..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal color="#FFF" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  activeCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.productsHeader}>
          <Text style={styles.productsCount}>{filteredProducts.length} produtos</Text>
          <TouchableOpacity>
            <Text style={styles.sortText}>Ordenar</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#E0232A" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.gridContainer}>
            {filteredProducts.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.gridCard}
                activeOpacity={0.9}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <Image 
                  source={require('@/assets/images/image.png')} 
                  style={styles.imagePlaceholder}
                  resizeMode="contain"
                />
                <Text style={styles.cardTitle} numberOfLines={2}>{product.name}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardPrice}>R$ {product.price}</Text>
                  <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
                    <Plus color="#000" size={20} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
