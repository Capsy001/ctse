import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  Button
} from 'react-native';
import { db, app } from './firebaseconfig';
import { doc, setDoc } from "firebase/firestore"; 

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
      onPress={async ()=>{
        await setDoc(doc(db, "cities", "LA"), {
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        });
        
    }}
      title="Click"></Button>
      <StatusBar style="auto" />
    </View>
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
