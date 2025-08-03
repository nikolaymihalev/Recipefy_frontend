// components/LanguageDropdown.tsx
import { defaultTheme } from '@/constants/defaultTheme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const LANGUAGES = [
  { code: 'en', flag: require('../assets/images/flags/en.png') },
  { code: 'bg', flag: require('../assets/images/flags/bg.png') },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => setOpen(o => !o)}>
        <Image source={currentLang.flag} style={styles.flagIcon} />
      </TouchableOpacity>

      {open && (
        <View style={styles.menuContainer}>
          {LANGUAGES.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={styles.menuItem}
              onPress={() => changeLang(lang.code)}
            >
              <Image source={lang.flag} style={styles.flagIconSmall} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  flagIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: defaultTheme.colors.black
  },
  flagIconSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  menuContainer: {
    position: 'absolute',
    top: 36,           
    right: 0,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 4,      
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
});
