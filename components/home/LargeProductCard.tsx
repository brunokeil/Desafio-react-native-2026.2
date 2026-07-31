import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/index.styles';
import { useCartStore } from '@/store/cartStore';

interface Props {
  title: string;
  price: string;
  category: string;
  tag?: string;
}

export function LargeProductCard({ title, price, category, tag }: Props) {
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
    <View style={styles.largeCard}>
      {tag && (
        <View style={styles.tagBadge}>
          <Text style={styles.tagBadgeText}>{tag}</Text>
        </View>
      )}
      <View style={[styles.imagePlaceholder, { height: 200 }]} />
      <Text style={styles.categoryText}>{category}</Text>
      <View style={styles.largeCardFooter}>
        <View>
          <Text style={styles.largeCardTitle}>{title}</Text>
          <Text style={styles.largeCardPrice}>{price}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
