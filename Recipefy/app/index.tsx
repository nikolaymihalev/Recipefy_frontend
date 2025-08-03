import { LanguageSwitcher } from '@/components/languageSwitcher';
import { defaultTheme } from '@/constants/defaultTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function StartScreen() {
  const router = useRouter();
  const defaultImagePath = '../assets/images';
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(`${defaultImagePath}/start/background.jpeg`)}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.langDropdownWrapper}>
          <LanguageSwitcher />
        </View>
        <LinearGradient
          colors={['transparent',defaultTheme.colors.primary]}
          style={styles.gradient}>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.bottomHalf}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.signUpButtonText}>{t('buttons:startSignUp')}</Text>
        </TouchableOpacity>
        <View style={[{flexDirection: 'row',  alignItems: 'center', marginTop: 20, gap: 10}]}>
          <Text style={styles.alredyHaveAccountText}>{t('startAlreadyHaveAccount')}</Text>
          <TouchableOpacity
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.loginButtonText}>{t('buttons:logIn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHalf: { flex: 3, justifyContent: 'flex-end' },
  gradient: { flex: 1, justifyContent: 'flex-end', padding: 20 },
  langDropdownWrapper: {
    position: 'absolute',
    top: 46,
    right: 16,
    zIndex: 10,      
    backgroundColor: defaultTheme.colors.white,
    padding: 7,
    borderRadius: defaultTheme.borderRadius.md
  },
  bottomHalf: {
    flex: 2,
    backgroundColor: defaultTheme.colors.primary,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: defaultTheme.colors.black,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: defaultTheme.borderRadius.sm
  },
  signUpButtonText: { color: defaultTheme.colors.white, fontSize: defaultTheme.fontSize.md, fontWeight: 'bold'},
  alredyHaveAccountText: {color: defaultTheme.colors.white, fontSize: defaultTheme.fontSize.md},
  loginButtonText: { color: defaultTheme.colors.white, fontSize: defaultTheme.fontSize.md, textDecorationLine: 'underline' }
});
