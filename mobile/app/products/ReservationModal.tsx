import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import Calendar from "react-native-calendar-range-picker";
import {
  GET_RESERVED_QUANTITIES_OF_ONE_PRODUCT,
  GET_USER_CART,
} from "../../constants/queries";
import { CREATE_CART, UPDATE_CART } from "../../constants/mutations";
import Colors from "../../constants/Colors";
import { CUSTOM_LOCALE } from "../../constants/customLocal";
import { decodeToken } from "../../utils/jwtHandler";
import { useAuth } from "../../utils/AuthContext";

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  stock: number;
  productId: string;
}

const ReservationModal = ({
  setModalVisible,
  modalVisible,
  stock,
  productId,
}: Props) => {
  const auth = useAuth();

  // Reset the form
  const initForm = () => {
    setModalVisible(false);
    setSelectedQuantity(0);
    setOptions([0]);
    setDate(undefined);
  };

  const userId = auth.userToken ? decodeToken(auth.userToken).userId : "";

  const [date, setDate] = useState<any>();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [options, setOptions] = useState([0]);
  const [openQuantityModal, setOpenQuantityModal] = useState(false);

  // Quantity of product in reservation
  const [productQuantityReservedByDates] = useLazyQuery(
    GET_RESERVED_QUANTITIES_OF_ONE_PRODUCT
  );

  // User cart
  const GetUserCart = useQuery(GET_USER_CART, {
    variables: { getCartReservationOfUserId: userId },
    skip: userId === "",
  });

  const [createCart] = useMutation(CREATE_CART);
  const [updateCart] = useMutation(UPDATE_CART);

  const quantityInReservation = async () => {
    if (date && Array.isArray(date) && date[0] && date[1]) {
      let { data } = await productQuantityReservedByDates({
        variables: {
          getProductReservationQuantityByDatesInput: {
            product_id: productId,
            start_at: date
              ? date[0].toLocaleString("en-US", { timeZone: "Europe/Paris" })
              : null,
            end_at: date
              ? date[1].toLocaleString("en-US", { timeZone: "Europe/Paris" })
              : null,
          },
        },
      });

      let stockAvailable = 0;
      let reservedQuantity = 0;

      if (typeof data?.getProductReservationQuantityByDates !== "undefined") {
        reservedQuantity = Number(
          data ? data.getProductReservationQuantityByDates : 0
        );
      }

      stockAvailable = stock - reservedQuantity;
      stockAvailable = stockAvailable < 0 ? 0 : stockAvailable;

      // If a date range is selected then we update options values with quantity for the select field
      if (typeof date !== "undefined") {
        const formSelectOptions = [];

        for (let i = 1; i <= stockAvailable; i++) formSelectOptions.push(i);

        // If no quantity available, we set the select field to 0
        if (formSelectOptions.length === 0) formSelectOptions.push(0);

        setOptions(formSelectOptions);
      } else {
        initForm();
      }
    }
  };

  useEffect(() => {
    quantityInReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const submitForm = async () => {
    let cartId = "";
    let dateStart = null;
    let dateEnd = null;

    if (date && Array.isArray(date) && date[0] && date[1]) {
      dateStart = date[0].toLocaleString("en-US", { timeZone: "Europe/Paris" });
      dateEnd = date[1].toLocaleString("en-US", { timeZone: "Europe/Paris" });

      // Retrieve existing cart or create a new one if not exist
      if (GetUserCart.data) {
        cartId = GetUserCart.data.getCartReservationOfUser.id;
      } else {
        const createReservationInput = {
          user_id: userId,
        };
        const newCart = await createCart({
          variables: { createReservationInput },
        });

        if (newCart.data) cartId = newCart.data.createReservation.id;
      }

      // Update cart with the product
      const updateDetailFromReservation = {
        updateDetailFromReservationId: cartId,
        detail: {
          quantity: selectedQuantity,
          start_at: dateStart,
          end_at: dateEnd,
          product_id: productId,
        },
      };
      await updateCart({
        variables: { ...updateDetailFromReservation },
      });
      initForm();
    }
  };

  if (userId === "") {
    return (
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.close}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name="close" size={28} color="black" />
          </Pressable>
          <Text style={styles.title}>Dates de réservations souhaitées</Text>
          <Text style={styles.subtitle}>
            Veuillez vous connecter pour pouvoir réserver un produit.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.close}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name="close" size={28} color="black" />
          </Pressable>
          <Text style={styles.title}>Dates de réservations souhaitées</Text>
          <Text style={styles.subtitle}>
            Veuillez choisir la durée de location.
          </Text>
          <Calendar
            disabledBeforeToday={true}
            onChange={({ startDate, endDate }) => {
              if (startDate && endDate) {
                setDate([startDate, endDate]);
              }
            }}
            style={{
              container: {
                width: "100%",
                height: 400,
                borderWidth: 1,
                borderColor: Colors.light.lightGray,
                borderRadius: 10,
                padding: 10,
              },
            }}
            isMonthFirst={true}
            locale={CUSTOM_LOCALE}
          />
          {date && Array.isArray(date) && date[0] && date[1] && (
            <View style={styles.quantityOptions}>
              {options[0] !== 0 ? (
                <View style={styles.quantityTrue}>
                  <Text style={styles.quantity}>
                    Quantité: {selectedQuantity === 0 ? "" : selectedQuantity}
                  </Text>
                  <Pressable
                    style={styles.choseQuantity}
                    onPress={() => setOpenQuantityModal(true)}
                  >
                    <Text style={styles.choseQuantityText}>
                      Choisir Quantité
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Text>
                  Aucune quantité disponible pour cette période. Veuillez
                  sélectionner une autre période.
                </Text>
              )}
            </View>
          )}
          {selectedQuantity !== 0 && (
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Pressable onPress={initForm}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderColor: Colors.light.lightGray,
                    borderWidth: 1,
                    fontFamily: "Rubik",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 5,
                  }}
                >
                  Annuler
                </Text>
              </Pressable>
              <Pressable onPress={submitForm}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor: "green",
                    color: "white",
                    fontFamily: "Rubik",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 5,
                  }}
                >
                  Ajouter au panier
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openQuantityModal}
        onRequestClose={() => {
          setOpenQuantityModal(!openQuantityModal);
        }}
      >
        <View style={modal.container}>
          <View style={modal.modalView}>
            <Pressable
              style={modal.close}
              onPress={() => setOpenQuantityModal(!openQuantityModal)}
            >
              <AntDesign name="close" size={28} color="black" />
            </Pressable>
            <Text style={modal.title}>Quantité souhaitée</Text>
            <Text style={modal.subtitle}>
              Veuillez choisir la quantité souhaitée.
            </Text>
            <ScrollView style={modal.list}>
              <View>
                {options.map((option, index) => (
                  <Pressable
                    key={index}
                    style={modal.quantityOptions}
                    onPress={() => {
                      setSelectedQuantity(option);
                      setOpenQuantityModal(false);
                    }}
                  >
                    <Text
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        backgroundColor:
                          selectedQuantity === option
                            ? Colors.light.orange
                            : "white",
                        color: selectedQuantity === option ? "white" : "black",
                        borderColor: Colors.light.lightGray,
                        borderWidth: 1,
                        fontSize: 16,
                        fontFamily: "Rubik",
                        textAlign: "center",
                        borderRadius: 5,
                      }}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ReservationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderColor: Colors.light.orange,
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "RubikBold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Rubik",
    marginBottom: 10,
  },
  quantityOptions: {
    width: "100%",
    marginVertical: 10,
  },
  quantityTrue: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  choseQuantity: {
    backgroundColor: Colors.light.orange,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  choseQuantityText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik",
  },
  quantity: {
    fontSize: 16,
    fontFamily: "Rubik",
    marginBottom: 10,
  },
});

const modal = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderColor: Colors.light.orange,
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "RubikBold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Rubik",
    marginBottom: 10,
  },
  list: {
    width: "100%",
    maxHeight: 300,
  },
  quantityOptions: {
    marginVertical: 10,
  },
});
