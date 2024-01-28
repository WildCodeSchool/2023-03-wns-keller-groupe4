import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { decodeToken, getIDToken } from "../../utils/jwtHandler";
import { useCallback } from "react";
import {
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  GET_USER,
  GET_USER_CART,
} from "../../constants/queries";
import {
  REMOVE_PRODUCT_FROM_RESERVATION,
} from "../../constants/mutations";
import Colors from "../../constants/Colors";
import { useFocusEffect } from "expo-router";

export interface ICartSummary {
  id: string;
  start_at?: Date;
  end_at?: Date;
  reservationsDetails: IReservation[];
}

interface IReservation {
  product: IProduct;
  quantity: number;
  start_at: string;
  end_at: string;
}

interface IProduct {
  id: string;
  name: string;
  picture: string;
  price: number;
  stock: number;
  available: boolean;
}

export interface IUserBilling {
  id?: string;
  firstname: string;
  lastname: string;
  street: string;
  postal_code: string;
  // city: string|null,
  country: string;
}

export default function TabCartScreen() {
  // const navigate = useNavigate();

  const userId = getIDToken() ? decodeToken(getIDToken()).userId : "";

  const { loading, data, refetch } = useQuery(GET_USER_CART, {
    variables: { getCartReservationOfUserId: userId },
    skip: userId === "",
  });

  const { data: userData } = useQuery(GET_USER, {
    variables: { getUserByIdId: userId },
    skip: userId === "",
  });

  const [removeProductFromCart] = useMutation(
    REMOVE_PRODUCT_FROM_RESERVATION,
);

  const removeProduct = async (product: string) => {
    const cartId = data?.getCartReservationOfUser?.id;
  
    if (data.getCartReservationOfUser.id) {
        const removedProduct = await removeProductFromCart({
            variables: {
                productsIds: [product],
                removeProductsFromReservationId: cartId,
            },
        });

        if (removedProduct) {
            refetch();
        }
    }
};

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Votre panier de réservation</Text>
        <View style={styles.cartContainer}>
          <Text style={styles.detailText}>Chargement...</Text>
        </View>
      </View>
    );
  }

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Votre panier de réservation</Text>
        <View style={styles.cartContainer}>
          <Text style={styles.detailText}>
            Vous devez être connecté pour accéder à votre panier de réservation.
          </Text>
        </View>
      </View>
    );
  }

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre panier de réservation</Text>
      <View style={styles.cartContainer}>
        <ScrollView style={styles.scrollView}>
          {data?.getCartReservationOfUser?.reservationsDetails?.map(
            (reservation: IReservation) => {
              const start_at = new Date(
                reservation.start_at
              ).toLocaleDateString("fr-FR");
              const end_at = new Date(reservation.end_at).toLocaleDateString(
                "fr-FR"
              );
              const duration =
                new Date(reservation.end_at).getTime() -
                new Date(reservation.start_at).getTime();
              const durationInDays = Math.floor(duration / (1000 * 3600 * 24));
              return (
                <View key={reservation.product.id} style={styles.itemCard}>
                  <View style={styles.itemDescription}>
                    <Image
                      source={{ uri: reservation.product.picture }}
                      style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.detailTitle}>
                        {reservation.product.name}
                        <Text style={styles.detailText}>
                          {" "}
                          x {reservation.quantity}
                        </Text>
                      </Text>
                      <Text style={styles.detailText}>
                        Mise à disposition : {start_at}
                      </Text>
                      <Text style={styles.detailText}>Retour : {end_at}</Text>
                      <Text style={styles.detailText}>
                        Durée de location : {durationInDays} jour
                        {durationInDays > 1 ? "s" : ""}
                      </Text>
                      <Text style={styles.detailText}>
                        Sous-total du produit :{" "}
                        {reservation.product.price * reservation.quantity} €
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => {
                      removeProduct(reservation.product.id)
                    }}
                  >
                    {({ pressed }) => (
                      <Text
                        style={{
                          ...styles.detailText,
                          color: pressed ? "#888" : "red",
                        }}
                      >
                        Supprimer du panier
                      </Text>
                    )}
                  </Pressable>
                </View>
              );
            }
          )}
        </ScrollView>
      </View>
      <View style={styles.cartPrice}>
        <Text style={styles.priceName}>Détail du paiement</Text>
        <Text style={styles.priceValue}>
          Total HT :{" "}
          {data?.getCartReservationOfUser?.reservationsDetails?.reduce(
            (acc: number, curr: IReservation) =>
              acc + curr.product.price * curr.quantity,
            0
          )}{" "}
          €
        </Text>
        <Text style={styles.priceValue}>
          TVA (20%) :{" "}
          {data?.getCartReservationOfUser?.reservationsDetails?.reduce(
            (acc: number, curr: IReservation) =>
              acc + curr.product.price * curr.quantity,
            0
          ) * 0.2}{" "}
          €
        </Text>
        <Text style={styles.priceValue}>
          Total TTC :{" "}
          {data?.getCartReservationOfUser?.reservationsDetails?.reduce(
            (acc: number, curr: IReservation) =>
              acc + curr.product.price * curr.quantity,
            0
          ) * 1.2}{" "}
          €
        </Text>
      </View>
      <Pressable onPress={() => console.log("coucou")} style={styles.validateCart}>
        <Text style={styles.validateText}>Valider le panier</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.background,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "RubikBold",
    color: Colors.light.orange,
  },
  cartContainer: {
    width: "95%",
    maxHeight: "50%",
    borderWidth: 1,
    borderColor: Colors.light.orange,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    backgroundColor: Colors.light.background,
  },
  itemCard: {
    width: "100%",
    // minHeight: 100,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    alignItems: "center",
  },
  itemDescription: {
    width: "100%",
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    width: 200,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Colors.light.background,
  },
  detailTitle: {
    fontSize: 20,
    fontFamily: "RubikBold",
    color: Colors.light.text,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: Colors.light.text,
  },
  cartPrice: {
    width: "90%",
    backgroundColor: Colors.light.background,
    alignItems: "flex-end",
  },
  priceName: {
    fontSize: 16,
    fontFamily: "RubikBold",
    color: Colors.light.text,
  },
  priceValue: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: Colors.light.text,
  },
  validateCart: {
    backgroundColor: "green",
    width: "50%",
    padding: 10,
    borderRadius: 10,
  },
  validateText: {
    fontSize: 16,
    fontFamily: "RubikBold",
    textAlign: "center",
  },
});
