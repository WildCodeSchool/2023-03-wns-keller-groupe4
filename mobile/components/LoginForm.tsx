import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useLazyQuery } from "@apollo/client";
// import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOGIN_GUERY } from "../utils/queries";
import { setIDToken } from "../utils/jwtHandler";
import Colors from "../constants/Colors";

interface IErrorsValidation {
    email?: string;
    password?: string;
}

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<IErrorsValidation>({});
    // const navigate = useNavigate();

    const validateForm = () => {
        const errors: IErrorsValidation = {};

        if (!email) errors.email = 'Email incorrecte';
        if (!password) errors.password = 'Password incorrecte';

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }


    const handleSubmit = async () => {
        console.log("soumission formulaire login")
        if (validateForm()) {

            // await login({
            //     variables: {
            //         email: email,
            //         password: password,
            //     },
            // });
            // login();

            setEmail('');
            setPassword('');
            setErrors({});
        }
    }

    const [login] = useLazyQuery(LOGIN_GUERY, {
        onCompleted: async ({ login }) => {
            console.log("loginnn =>" + login)
            setIDToken(login.IDToken);
        },
        onError: (err) => {
            if (err.message.includes("Could not find any entity of type")) {
                console.error("inc => Email ou mot de passe incorrect");
            } else {
                console.error("caca");
                console.error("else => Une erreur est survenue");
            }
        },
    });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Se connecter</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Email :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                <Text style={styles.label}>Mot de passe :</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword} autoCorrect={false}
                    autoCapitalize='none'
                />
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                <Button title="Se connecter" onPress={() => {
                    handleSubmit()
                }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: "auto",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        paddingBottom: 16,
    },
    form: {
        backgroundColor: Colors.light.background,
        padding: 20,
        borderRadius: 10,
        shadowColor: Colors.light.orange,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "auto"
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: Colors.light.text,
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5
    },
    errorText: {
        color: "red",
        marginBottom: 20,
    },
});

export default LoginForm;
