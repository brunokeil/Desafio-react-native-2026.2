import { View, Text, TouchableOpacity, ScrollView, Alert, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react-native';
import { styles } from "@/styles/sacola.styles";
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

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      const pagbankItems = items.map(item => {
        const priceValue = parseFloat(item.price.replace('R$', '').trim().replace('.', '').replace(',', '.'));
        return {
          reference_id: String(item.id),
          name: item.title,
          quantity: item.quantity,
          unit_amount: Math.round(priceValue * 100)
        };
      });

      const payload = {
        reference_id: `order_${Date.now()}`,
        customer: {
          name: "Cliente Teste",
          email: "teste@teste.com",
          tax_id: "12345678909",
        },
        items: pagbankItems,
      };

      const response = await fetch('https://sandbox.api.pagseguro.com/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 18704fd4-512a-46d6-87f8-98688b019feaac8d73844759a0d5e6eca53b705629ba3024-9fcc-4263-8101-b04635cd46cc'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.links) {
        const paymentUrl = data.links.find((l: any) => l.rel === 'PAY')?.href;
        if (paymentUrl) {
          Linking.openURL(paymentUrl);
          clearCart();
          return;
        }
      }
      
      Alert.alert('Erro', 'Não foi possível gerar o link de pagamento.');

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar o checkout.');
    }
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
                <Image 
                  source={require('@/assets/images/image.png')} 
                  style={styles.itemImagePlaceholder} 
                  resizeMode="contain" 
                />
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
