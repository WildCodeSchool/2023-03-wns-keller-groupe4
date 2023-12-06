import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Wildrent</Text>
        <Text style={styles.text}>
          Louez votre matériel de chantier sans difficulté
        </Text>
      </View>
      <Link href="/modal" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Trouvez votre matériel</Text>
          <FontAwesome name="search" size={25} color="#000" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors["light"].background,
  },
  titleContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors["light"].orange,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "RubikBold",
  },
  text: {
    fontSize: 16,
    fontFamily: "Rubik",
  },
  button: {
    backgroundColor: Colors["light"].orange,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Rubik",
  },
});
