import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react-native';
import { styles } from './_sacola.styles';
import { useCartStore } from '@/store/cartStore';
import { useMemo } from 'react';

export default function SacolaScreen() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const priceValue = parseFloat(item.price.replace('R$', '').trim().replace('.', '').replace(',', '.'));
      return acc + (isNaN(priceValue) ? 0 : priceValue) * item.quantity;
    }, 0);
  }, [items]);

  const handleCheckout = () => {
    Alert.alert('Sucesso', 'Compra finalizada com sucesso!');
    clearCart();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minha Sacola</Text>
        {items.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag color="#333" size={64} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>Sua sacola está vazia</Text>
          <Text style={styles.emptySubtext}>
            Navegue pelos produtos e adicione-os aqui para finalizar sua compra.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImagePlaceholder} />
                <View style={styles.itemDetails}>
                  <View>
                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                  <View style={styles.itemActions}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus color="#FFF" size={16} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus color="#FFF" size={16} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Trash2 color="#E0232A" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
