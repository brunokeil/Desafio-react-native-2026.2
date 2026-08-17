import { View, Text, TouchableOpacity } from 'react-native';
import { Search, LogOut } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/_index.styles';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleLogoPress = () => {
    router.replace('/');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerLeft} onPress={handleLogoPress}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>C</Text>
        </View>
        <Text style={styles.headerTitle}>
          <Text style={{ fontWeight: "300" }}>Nação </Text>
          <Text style={{ color: "#E0232A", fontWeight: "bold" }}>
            Rubro-Negra
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <Search color="#FFF" size={20} />
        </TouchableOpacity>
        {user ? (
          <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#E0232A' }]} onPress={handleLogout}>
            <LogOut color="#FFF" size={16} style={{ marginRight: 6 }} />
            <Text style={[styles.loginButtonText, { color: '#FFF' }]}>Sair</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
