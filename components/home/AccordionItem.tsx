import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { styles } from "@/styles/.styles";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  title: string;
}

export function AccordionItem({ title }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const getContent = () => {
    if (title === 'Missão') {
      return 'Nossa missão é trazer os melhores produtos rubro-negros com qualidade e agilidade para a maior torcida do mundo.';
    }
    if (title === 'Visão') {
      return 'Ser a principal loja online reconhecida pelos torcedores como a casa do Flamengo.';
    }
    if (title === 'Valores') {
      return 'Paixão, Comprometimento, Autenticidade e Tradição.';
    }
    return 'Informação não disponível.';
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity style={styles.accordionItem} onPress={toggleOpen} activeOpacity={0.7}>
        <Text style={styles.accordionText}>{title}</Text>
        {isOpen ? <ChevronUp color="#555" size={20} /> : <ChevronDown color="#555" size={20} />}
      </TouchableOpacity>
      {isOpen && (
        <View style={{ backgroundColor: '#1A1A1A', padding: 16, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginTop: -8 }}>
          <Text style={{ color: '#DDD', fontSize: 14, lineHeight: 20 }}>
            {getContent()}
          </Text>
        </View>
      )}
    </View>
  );
}
