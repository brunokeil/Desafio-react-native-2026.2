import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/index.styles';

export function HeroSection() {
  return (
    <View style={styles.heroSection}>
      <LinearGradient
        colors={["rgba(224, 35, 42, 0.1)", "transparent"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.heroContent}>
        <Text style={styles.heroTag}>✨ ORIGINAL RUBRO-NEGRO</Text>
        <Text style={styles.heroTitle}>Vista a{"\n"}Paixão.</Text>
        <Text style={styles.heroSubtitle}>
          A nova temporada da nação chegou.{"\n"}Peças exclusivas com a alma
          do manto.
        </Text>
        <View style={styles.heroButtonsRow}>
          <TouchableOpacity style={styles.exploreButton}>
            <Play color="#000" size={16} fill="#000" />
            <Text style={styles.exploreButtonText}>Explorar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.enterNationButton}>
            <Text style={styles.enterNationButtonText}>
              Entrar na nação
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
