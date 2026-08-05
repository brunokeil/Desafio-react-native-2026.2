import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/index.styles';
import { useCartStore } from '@/store/cartStore';

interface Props {
  id: string;
  title: string;
  price: string;
  category: string;
  tag?: string;
}

export function LargeProductCard({ id, title, price, category, tag }: Props) {
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
    <View style={styles.largeCard}>
      {tag && (
        <View style={styles.tagBadge}>
          <Text style={styles.tagBadgeText}>{tag}</Text>
        </View>
      )}
      <Image 
        source={require('@/assets/images/image.png')}
        style={[styles.imagePlaceholder, { height: 200 }]}
        resizeMode="contain"
      />
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
