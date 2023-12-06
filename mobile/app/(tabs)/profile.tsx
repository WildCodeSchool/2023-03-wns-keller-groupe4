import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';
import Colors from "../../constants/Colors";
import { getIDToken } from '../../utils/jwtHandler';

export default function TabProfileScreen() {
  const [isRegister, setIsRegister] = useState(false);

  const showForm = () => {
    let form: React.JSX.Element = <></>;
    if (isRegister) {
      form = <SignupForm />;
    } else form = <LoginForm />;

    return (
      <View>
        {form}
        <Text style={styles.changeForm} onPress={() => { setIsRegister(!isRegister) }}>
          {isRegister ? "Se connecter ?" : "S'inscrire ?"}
        </Text>
      </View>
    );
  }


  const showlogout = () => {
    return (
      <View>
        <Text>
          Une fois loggé, tu peux pas te déloggé, tu vas être séquestrer a vie :)
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!getIDToken() ? showForm() : showlogout()}
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
