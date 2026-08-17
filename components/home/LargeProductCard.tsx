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
  category: string;
  tag?: string;
}

export function LargeProductCard({ id, title, price, category, tag }: Props) {
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
      style={styles.largeCard}
      activeOpacity={0.9}
      onPress={() => router.push(`/product/${id}`)}
    >
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
    </TouchableOpacity>
  );
}
