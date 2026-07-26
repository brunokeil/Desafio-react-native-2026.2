import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/app/(tabs)/index.styles';

export function PremiumCard() {
  return (
    <View style={[styles.section, { marginBottom: 40 }]}>
      <LinearGradient
        colors={["#400A0E", "#1A0406"]}
        style={styles.premiumCard}
      >
        <Text style={styles.premiumTag}>N A Ç Ã O   P R E M I U M</Text>
        <Text style={styles.premiumTitle}>
          Faça parte da <Text style={{ fontStyle: "italic" }}>nação</Text>.
        </Text>
        <Text style={styles.premiumSubtitle}>
          Acesso antecipado, cupons exclusivos e frete grátis no primeiro
          pedido.
        </Text>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumButtonText}>Criar minha conta</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
