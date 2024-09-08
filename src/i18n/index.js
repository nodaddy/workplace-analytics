import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            yourOrgChart: "Your Organizational Chart",
            manager: 'Manager',
            loading: 'Loading',
            apps: 'Apps'
          },
          employeeInfo: {
            workEmail: 'Work Email',
            workPhone: 'Work Phone',
            location: 'Location',
            workAddress: 'Work Address',
            contactInfo: 'Contact Info.',
            managersAndDirects: 'Managers and Directs',
            directs: 'Directs'
          },
          tools: {
            organisationalChart: 'Organisational Chart',
            leaves: 'Leaves'
          },
          auth: {
            loginAgain: 'Session expired! Kindly login again.'
          }
        }
      },
      de:{
        translation: {
            description: {
                part1: 'bada bing bada boom',
                part2: 'boom bada bing bada'
            }
        }
      }
    }
  });

export default i18n;