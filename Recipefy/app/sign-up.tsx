import { defaultTheme } from '@/constants/defaultTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirm: '',
  });

  const handleRegister = () => {
    const newErrors = { email: '', password: '', confirm: '' };
    let valid = true;

    if (!email.trim()) {
      newErrors.email = t('validation:required', { field: t('buttons:email') });
      valid = false;
    }
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = t('validation:invalidEmail');
      valid = false;
    }

    if (!password) {
      newErrors.password = t('validation:required', { field: t('buttons:password') });
      valid = false;
    }

    if (!confirm) {
      newErrors.confirm = t('validation:required', { field: t('buttons:confirmPassword') });
      valid = false;
    }
    else if (password && confirm !== password) {
      newErrors.confirm = t('validation:passwordsMismatch');
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    // TODO: proceed with API call
    console.log('Register:', { email, password });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <LinearGradient
          colors={[defaultTheme.colors.primary, defaultTheme.colors.secondary]}
          style={styles.header}
        >
          <Text style={styles.title}>{t('signUpTitle')}</Text>
        </LinearGradient>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={t('buttons:email')}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder={t('buttons:password')}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TextInput
            style={styles.input}
            placeholder={t('buttons:confirmPassword')}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
          {!!errors.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>{t('buttons:register')}</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{t('alreadyHaveAccount')}</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>{t('buttons:logIn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.white,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
  },
  title: {
    color: defaultTheme.colors.white,
    fontSize: defaultTheme.fontSize.lg,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    padding: 24,
    gap: 10
  },
  input: {
    borderWidth: 1,
    borderColor: defaultTheme.colors.black,
    borderRadius: defaultTheme.borderRadius.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 4,
    fontSize: defaultTheme.fontSize.md,
    color: defaultTheme.colors.black,
  },
  errorText: {
    color: defaultTheme.colors.danger,
    marginBottom: 12,
  },
  button: {
    backgroundColor: defaultTheme.colors.primary,
    paddingVertical: 14,
    borderRadius: defaultTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: defaultTheme.colors.white,
    fontSize: defaultTheme.fontSize.md,
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: defaultTheme.colors.black,
    marginRight: 8,
  },
  linkText: {
    color: defaultTheme.colors.primary,
    textDecorationLine: 'underline',
  },
});
