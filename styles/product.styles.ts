import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  contentContainer: {
    paddingBottom: 24, 
  },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  detailsContainer: {
    padding: 24,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  price: {
    color: '#E0232A',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 24,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#888',
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  footer: {
    padding: 20,
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#E0232A',
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
