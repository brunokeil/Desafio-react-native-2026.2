import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, SlidersHorizontal, Plus } from "lucide-react-native";
import { styles } from "./buscar.styles";

const CATEGORIES = ["Todos", "Camisas", "Agasalhos", "Shorts", "Acessórios"];
const PRODUCTS = [
  { id: "1", title: "Camisa Oficial I 2025", price: "R$ 349,90", tag: "NOVO", tagColor: "#E0232A" },
  { id: "2", title: "Camisa Oficial II 2025", price: "R$ 349,90", tag: "NOVO", tagColor: "#E0232A" },
  { id: "3", title: "Camisa Goleiro 2025", price: "R$ 329,90" },
  { id: "4", title: "Short Oficial 2025", price: "R$ 199,90", tag: "OFERTA", tagColor: "#E0232A" },
  { id: "5", title: "Camisa Retrô 1981", price: "R$ 289,90" },
  { id: "6", title: "Agasalho Treino", price: "R$ 499,90", tag: "OFERTA", tagColor: "#E0232A" },
  { id: "7", title: "Moletom Nação", price: "R$ 279,90" },
  { id: "8", title: "Short Oficial Jogo", price: "R$ 179,90", tag: "OFERTA", tagColor: "#E0232A" },
  { id: "9", title: "Boné Trucker Rubro-", price: "R$ 129,90" },
];

export default function BuscarScreen() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

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
          <Text style={styles.productsCount}>9 produtos</Text>
          <TouchableOpacity>
            <Text style={styles.sortText}>Ordenar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {PRODUCTS.map((product) => (
            <View key={product.id} style={styles.gridCard}>
              {product.tag && (
                <View style={[styles.tagBadge, { backgroundColor: product.tagColor }]}>
                  <Text style={styles.tagBadgeText}>{product.tag}</Text>
                </View>
              )}
              <View style={styles.imagePlaceholder} />
              <Text style={styles.cardTitle}>{product.title}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>{product.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Plus color="#000" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
