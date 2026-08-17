import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styles } from "@/styles/index.styles";
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { useRouter } from 'expo-router';

interface Props {
  id: string;
  title: string;
  price: string;
  tag?: string;
  tagColor?: string;
  isSmall?: boolean;
}

export function ProductCard({ id, title, price, tag, tagColor = "#E0232A", isSmall = false }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore(state => state.showToast);
  const router = useRouter();

  const handleAdd = () => {
    addItem({
      id,
      title,
      price,
    });
    showToast('Produto adicionado à sacola!');
  };

  return (
    <TouchableOpacity 
      style={isSmall ? styles.smallCard : styles.card}
      activeOpacity={0.9}
      onPress={() => router.push(`/product/${id}`)}
    >
      {tag && (
        <View style={[styles.tagBadge, tagColor ? { backgroundColor: tagColor } : {}]}>
          <Text style={styles.tagBadgeText}>{tag}</Text>
        </View>
      )}
      <Image 
        source={require('@/assets/images/image.png')}
        style={[styles.imagePlaceholder, isSmall && { height: 120 }]}
        resizeMode="contain"
      />
      <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>{price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
