import * as SecureStore from "expo-secure-store";

// Save token to SecureStore
export const saveTokenToStorage = async (token: string) => {
  try {
    await SecureStore.setItemAsync("authToken", token);
  } catch (error) {
    console.error("Error saving token to SecureStore:", error);
  }
};

// Retrieve token from SecureStore
export const getTokenFromStorage = async () => {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token from SecureStore:", error);
    return null;
  }
};

// Remove token from SecureStore
export const removeTokenFromStorage = async () => {
  try {
    await SecureStore.deleteItemAsync("authToken");
  } catch (error) {
    console.error("Error removing token from SecureStore:", error);
  }
};

