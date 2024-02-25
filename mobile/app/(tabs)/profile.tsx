import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';
import { LOGOUT } from '../../constants/mutations';
import { useAuth } from '../../utils/AuthContext';
import { removeTokenFromStorage } from '../../utils/secureStore';

export default function TabProfileScreen() {
  const auth = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [isLogged, setIsLogged] = useState<Boolean>(auth.isConnected);

  const showForm = () => {
    let form: React.JSX.Element = <></>;
    if (isRegister) {
      form = <SignupForm setIsRegister={setIsRegister} />;

    } else form = <LoginForm setIsLogged={setIsLogged} />;

    return (
      <View>
        {form}
        <Text style={styles.changeForm} onPress={() => { setIsRegister(!isRegister) }}>
          {isRegister ? "Se connecter ?" : "S'inscrire ?"}
        </Text>
      </View>
    );
  }

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      removeTokenFromStorage();
      setIsLogged(false)
    },
  });

  const handleLogout = async () => {
    await logout();
  };

  const showlogout = () => {
    return (
      <View>
        <Button
          onPress={() => handleLogout()}
          title="Se déconnecter"
          color="red"
          accessibilityLabel='Se déconnecter'
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isLogged ? showForm() : showlogout()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  changeForm: {
    color: "blue",
    textAlign: "right",
    paddingEnd: 25
  },
});
