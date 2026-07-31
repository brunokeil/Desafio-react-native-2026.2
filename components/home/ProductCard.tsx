import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/index.styles';
import { useCartStore } from '@/store/cartStore';

interface Props {
  title: string;
  price: string;
  tag?: string;
  tagColor?: string;
  isSmall?: boolean;
}

export function ProductCard({ title, price, tag, tagColor = "#E0232A", isSmall = false }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      id: title, // Using title as ID for this mockup
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
      <View style={[styles.imagePlaceholder, isSmall && { height: 120 }]} />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>{price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
