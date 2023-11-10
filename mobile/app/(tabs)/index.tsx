import { StyleSheet, Text, View } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kiloutou home page</Text>
      <View style={styles.separator}  />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
