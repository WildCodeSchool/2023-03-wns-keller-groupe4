import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@apollo/client";

import { GET_PRODUCTS_BY_CATEGORY_NAME } from "../../constants/queries";
import Colors from "../../constants/Colors";

interface IProductFromAPI {
  id: number;
  name: string;
  price: number;
  available: boolean;
  picture: string;
}

type Props = {};

const ProductListByCategory = ({}: Props) => {
  const { category } = useLocalSearchParams();
  const navigation = useNavigation();
  const [products, setProducts] = useState<IProductFromAPI[]>([]);

  const { error, loading, data } = useQuery(GET_PRODUCTS_BY_CATEGORY_NAME, {
    variables: { name: category },
  });

  useEffect(() => {
    navigation.setOptions({ title: category });
  }, [navigation]);

  useEffect(() => {
    if (data) {
      setProducts(data.getCategoryByName.products);
    }
  }, [data]);

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
      {products.map((product) => (
        <Text key={product.id}>{product.name}</Text>
      ))}
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
