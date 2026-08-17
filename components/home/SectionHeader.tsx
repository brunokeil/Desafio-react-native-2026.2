import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "@/styles/index.styles";

interface Props {
  title: string;
  subtitle: string;
  showSeeAll?: boolean;
}

export function SectionHeader({ title, subtitle, showSeeAll = true }: Props) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
      {showSeeAll && (
        <TouchableOpacity>
          <Text style={styles.seeAll}>Ver tudo {">"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
