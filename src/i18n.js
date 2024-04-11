import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enText from 'assets/locales/en.json'
import laText from 'assets/locales/la.json'
import viText from 'assets/locales/vi.json'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: enText,
			},
			la: {
				translation: laText,
			},
			vi: {
				translation: viText,
			},
		},
		lng: localStorage.getItem('i18nextLng') || 'la',
		fallbackLng: 'la',
	})

export default i18n
