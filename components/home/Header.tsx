import { View, Text, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/index.styles';

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>C</Text>
        </View>
        <Text style={styles.headerTitle}>
          <Text style={{ fontWeight: "300" }}>Nação </Text>
          <Text style={{ color: "#E0232A", fontWeight: "bold" }}>
            Rubro-Negra
          </Text>
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <Search color="#FFF" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
