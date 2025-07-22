import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import UserProfile from './src/components/UserProfile';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title={"Go to List"}onPress={() => router.navigate('/')}></Button>
      <UserProfile />
    </View>
    
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
