import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@apollo/client";

import { GET_PRODUCTS_BY_CATEGORY_NAME } from "../../constants/queries";
import Colors from "../../constants/Colors";

type Props = {};

const ProductListByCategory = ({}: Props) => {
  const { category } = useLocalSearchParams();
  const navigation = useNavigation();

  const { error, loading, data } = useQuery(GET_PRODUCTS_BY_CATEGORY_NAME, {
    variables: { name: category },
  });

  useEffect(() => {
    navigation.setOptions({ title: category });
  }, [navigation]);

  const products = data.getCategoryByName.products;

  if (loading || error) {
    const message = loading ? "Loading..." : "Error :(";
    return (
      <View style={styles.container}>
        <Text>{message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{category}</Text>
    </View>
  );
};

export default ProductListByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
});
