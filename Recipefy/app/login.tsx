import { LanguageSwitcher } from '@/components/languageSwitcher';
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

  const [errors, setErrors] = useState({
      email: '',
      password: ''
  });

  const handleLogin = () => {
    const newErrors = { email: '', password: ''};
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

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    console.log('Register:', { email, password, confirm });
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
          <Text style={styles.title}>{t('buttons:logIn')}</Text>
        </LinearGradient>
        <View style={styles.langDropdownWrapper}>
          <LanguageSwitcher />
        </View>
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

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{t('buttons:signIn')}</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{t('doesntHaveAccount')}</Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text style={styles.linkText}>{t('buttons:register')}</Text>
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
   langDropdownWrapper: {
    position: 'absolute',
    top: 46,
    right: 16,
    zIndex: 10,      
    backgroundColor: defaultTheme.colors.white,
    padding: 7,
    borderRadius: defaultTheme.borderRadius.md
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
  },
  input: {
    borderWidth: 1,
    borderColor: defaultTheme.colors.black,
    borderRadius: defaultTheme.borderRadius.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
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
    marginTop: 8,
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
