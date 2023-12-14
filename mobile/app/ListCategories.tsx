import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@apollo/client";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { GET_CATEGORIES } from "../constants/queries";

export default function ListCategories() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading || error) {
    const message = loading ? "Loading..." : "Error :(";
    return (
      <View style={styles.container}>
        <Text>{message}</Text>
      </View>
    );
  }

  const categories = data.getCategories;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.categoriesContainer}>
        {categories.map((category: any) => (
          <Link key={category.id} href={`/categories/${category.name}`} asChild>
            <Pressable key={category.id} style={styles.categoriesButton}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  categoriesContainer: {
    width: "95%",
    margin: 20,
    backgroundColor: Colors.light.background,
  },
  categoriesButton: {
    backgroundColor: Colors.light.orange,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 20,
    fontFamily: "Rubik",
    textAlign: "center",
  },
});
