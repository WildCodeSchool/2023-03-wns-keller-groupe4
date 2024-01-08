import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import Colors from "../../constants/Colors";
import { GET_ONE_PRODUCT } from "../../constants/queries";

interface IProductFromAPI {
  id: string;
  name: string;
  price: number;
  stock: number;
  available: boolean;
  description: string;
  picture: string;
}

const Product = () => {
  const { product: productID } = useLocalSearchParams();
  const navigation = useNavigation();
  const [product, setProduct] = useState<IProductFromAPI>();

  const { loading, error, data } = useQuery(GET_ONE_PRODUCT, {
    variables: { getProductId: productID },
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleReservation = () => {
    console.log("Reservation");
  };

  useEffect(() => {
    navigation.setOptions({ title: "", headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (data) {
      setProduct(data.getProduct);
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
    <ScrollView style={styles.container}>
      {/* Back button */}
      <Pressable onPress={handleBack} style={styles.backButton}>
        <AntDesign name="arrowleft" size={34} color="black" />
      </Pressable>
      {/* Product image */}
      <View style={styles.imageBox}>
        <Image source={{ uri: product?.picture }} style={styles.image} />
      </View>
      {/* Product details */}
      <View style={styles.detailsContainer}>
        {/* Name */}
        <Text style={styles.name}>{product?.name}</Text>
        <View style={styles.separator} />
        {/* Availability and price */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[
              styles.availability,
              { color: product?.available ? "green" : "red" },
            ]}
          >
            {product?.available ? "Disponible" : "Non Disponible"}
          </Text>
          <Text style={styles.price}>{product?.price}€/jour</Text>
        </View>
        <View style={styles.separator} />
        {/* Description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium,
          voluptas minus quibusdam quis vel velit corrupti magnam totam placeat
          ullam similique dignissimos asperiores numquam reiciendis esse. Sunt
          voluptas maiores id incidunt, debitis officia facilis ipsum!
        </Text>
        {/* Reservation button */}
        <TouchableOpacity
          style={[
            styles.reservationButton,
            {
              backgroundColor: product?.available
                ? Colors.light.orange
                : Colors.light.lightGray,
            },
          ]}
          onPress={handleReservation}
        >
          <Text style={styles.reservationButtonText}>Réservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
    position: "absolute",
    top: 60,
    left: 10,
    zIndex: 100,
  },
  imageBox: {
    height: 400,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    padding: 15,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light.lightGray,
    marginVertical: 10,
  },
  name: {
    fontSize: 26,
    fontFamily: "RubikBold",
    marginBottom: 10,
  },
  availability: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "RubikBold",
  },
  price: {
    fontSize: 18,
    fontFamily: "RubikBold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  reservationButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  reservationButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
