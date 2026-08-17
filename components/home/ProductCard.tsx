import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styles } from "@/styles/index.styles";
import { useCartStore } from '@/store/cartStore';

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

  const handleAdd = () => {
    addItem({
      id,
      title,
      price,
    });
    Alert.alert('Sucesso', 'Produto adicionado à sacola!');
  };

  return (
    <View style={isSmall ? styles.smallCard : styles.card}>
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
    </View>
  );
}
