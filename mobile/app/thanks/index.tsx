import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import { Link, useNavigation } from "expo-router";

const index = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "", headerShown: false });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'RubikBold', fontSize: 22 }}>Merci !</Text>
      <Text style={{ fontFamily: "Rubik", fontSize: 20 }}>Votre commande est en cours de préparation</Text>
      <Link href="/" style={{ fontFamily: "Rubik", fontSize: 20, backgroundColor: Colors.light.orange, padding: 10, color: "#FFF", borderRadius: 10, margin: 10 }}>Retour à la boutique</Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
});
