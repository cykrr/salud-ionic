import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'salud',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: { allowMixedContent: true }
};

export default config;
