import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {

  return <Provider store={store}><SafeAreaProvider><Stack /></SafeAreaProvider></Provider>;
}