import { View, Text, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/index.styles';

interface Props {
  title: string;
  price: string;
  category: string;
  tag?: string;
}

export function LargeProductCard({ title, price, category, tag }: Props) {
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
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
