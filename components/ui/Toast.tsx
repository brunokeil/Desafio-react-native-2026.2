import React, { useEffect } from 'react';
import { StyleSheet, Text, Animated, View } from 'react-native';
import { useToastStore } from '@/store/toastStore';
import { CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Toast() {
  const { isVisible, message } = useToastStore();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isVisible) {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity, 
          top: insets.top + 10,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }
          ]
        }
      ]}
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <CheckCircle2 color="#FFF" size={20} />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: '#E0232A',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 9999,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});
