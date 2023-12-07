import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";

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
        <View key={product.id} style={styles.product}>
          <View style={styles.productLeft}>
            <Image
              source={{ uri: product.picture }}
              style={styles.productImage}
            />
          </View>
          <View style={styles.productRight}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}€/jour</Text>
            <Pressable style={styles.productDetailsButton}>
              <Text style={styles.productDetailsButtonText}>Details</Text>
              <AntDesign name="pluscircleo" size={18} color="white" />
            </Pressable>
          </View>
        </View>
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
  product: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    borderWidth: 1,
    borderColor: Colors.light.orange,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  productLeft: {
    width: "50%",
    height: 150,
  },
  productRight: {
    width: "50%",
    height: 150,
    borderLeftWidth: 1,
    borderLeftColor: Colors.light.lightGray,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  productImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  productName: {
    fontFamily: "Rubik",
    fontSize: 18,
  },
  productPrice: {
    fontFamily: "RubikBold",
    fontSize: 18,
    color: Colors.light.orange,
  },
  productDetailsButton: {
    backgroundColor: Colors.light.gray,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  productDetailsButtonText: {
    fontFamily: "Rubik",
    fontSize: 16,
    color: "#fff",
  },
});
