import React, { useState, useEffect } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./index.styles";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeader } from "@/components/home/SectionHeader";
import { ProductCard } from "@/components/home/ProductCard";
import { LargeProductCard } from "@/components/home/LargeProductCard";
import { AccordionItem } from "@/components/home/AccordionItem";
import { PremiumCard } from "@/components/home/PremiumCard";

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Safe slicing for different sections
  const featuredProducts = products.slice(0, 4);
  const mainProduct = products.length > 4 ? products[4] : products[0];
  const popularProducts = products.slice(5, 9);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        
        <HeroSection />

        {isLoading ? (
          <ActivityIndicator size="large" color="#E0232A" style={{ marginVertical: 40 }} />
        ) : (
          <>
            <View style={styles.section}>
              <SectionHeader title="Em destaque" subtitle="Curadoria da temporada" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
              >
                {featuredProducts.map((p, index) => (
                  <ProductCard 
                    key={p.id}
                    id={String(p.id)}
                    title={p.name} 
                    price={`R$ ${p.price}`} 
                    tag={index === 0 ? "NOVO" : undefined} 
                  />
                ))}
              </ScrollView>
            </View>

            {mainProduct && (
              <View style={styles.section}>
                <SectionHeader title="Estreia da semana" subtitle="A camisa do momento" showSeeAll={false} />
                <LargeProductCard 
                  id={String(mainProduct.id)}
                  title={mainProduct.name} 
                  price={`R$ ${mainProduct.price}`} 
                  category="DESTAQUE" 
                  tag="NOVO" 
                />
              </View>
            )}

            <View style={styles.section}>
              <SectionHeader title="Populares agora" subtitle="Escolhas da torcida" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
              >
                {popularProducts.map((p, index) => (
                  <ProductCard 
                    key={p.id}
                    id={String(p.id)}
                    title={p.name} 
                    price={`R$ ${p.price}`} 
                    tag={index === 0 ? "OFERTA" : undefined} 
                    isSmall 
                  />
                ))}
              </ScrollView>
            </View>
          </>
        )}

        <View style={styles.section}>
          <SectionHeader title="Missão, Visão e Valores" subtitle="O que move a nação." showSeeAll={false} />
          {["Missão", "Visão", "Valores"].map((item) => (
            <AccordionItem key={item} title={item} />
          ))}
        </View>

        <PremiumCard />
        
      </ScrollView>
    </SafeAreaView>
  );
}
