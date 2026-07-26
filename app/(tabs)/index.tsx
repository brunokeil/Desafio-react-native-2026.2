import { ScrollView, View } from "react-native";
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
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        
        <HeroSection />

        <View style={styles.section}>
          <SectionHeader title="Em destaque" subtitle="Curadoria da temporada" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            <ProductCard title="Camisa Oficial I 2025" price="R$ 349,90" tag="NOVO" />
            <ProductCard title="Camisa Oficial II 2025" price="R$ 349,90" tag="NOVO" />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Estreia da semana" subtitle="A camisa do momento" showSeeAll={false} />
          <LargeProductCard 
            title="Camisa Oficial I 2025" 
            price="R$ 349,90" 
            category="CAMISAS" 
            tag="NOVO" 
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Populares agora" subtitle="Escolhas da torcida" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            <ProductCard 
              title="Short Oficial" 
              price="R$ 199,90" 
              tag="OFERTA" 
              isSmall 
            />
            <ProductCard 
              title="Camisa Retrô" 
              price="R$ 289,90" 
              isSmall 
            />
          </ScrollView>
        </View>

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
