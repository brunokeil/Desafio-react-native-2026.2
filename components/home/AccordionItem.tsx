import { View, Text } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { styles } from '@/app/(tabs)/index.styles';

interface Props {
  title: string;
}

export function AccordionItem({ title }: Props) {
  return (
    <View style={styles.accordionItem}>
      <Text style={styles.accordionText}>{title}</Text>
      <ChevronDown color="#555" size={20} />
    </View>
  );
}
