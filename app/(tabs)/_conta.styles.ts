import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    color: '#FFF',
    padding: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E0232A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  switchTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchText: {
    color: '#888',
    fontSize: 14,
  },
  switchTextAction: {
    color: '#E0232A',
    fontSize: 14,
    fontWeight: '700',
  },
  // Profile styles
  profileContainer: {
    flex: 1,
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#888',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: '#E0232A',
    fontSize: 16,
    fontWeight: '600',
  },
});
