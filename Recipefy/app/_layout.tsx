import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../localization/i18n';


export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
