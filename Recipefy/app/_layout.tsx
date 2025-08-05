import { LanguageSwitcher } from '@/components/languageSwitcher';
import { defaultTheme } from '@/constants/defaultTheme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import '../localization/i18n';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
      <View style={[ { position: 'absolute',
          top: 46,
          right: 16,
          zIndex: 10,
          backgroundColor: defaultTheme.colors.white,
          padding: 7,
          borderRadius: defaultTheme.borderRadius.md,}]}>
        <LanguageSwitcher />
      </View>
    </ThemeProvider>
  );  
}
