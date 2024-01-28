import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useMutation } from "@apollo/client";
import Colors from "../constants/Colors";
import { SIGNUP_MUTATION } from '../constants/mutations';

interface IErrorsValidation {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface ISignupForm {
    setIsRegister: (isRegister: boolean) => void;
}

const SignupForm = ({ setIsRegister }: ISignupForm) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<IErrorsValidation>({});

    const validateForm = () => {
        const errors: IErrorsValidation = {};

        if (!email) errors.email = 'Email incorrecte';
        if (!password) errors.password = 'Mot de passe incorrecte';
        if (!password) errors.confirmPassword = 'Confirmer mot de passe incorrecte';

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }




    const [signup] = useMutation(SIGNUP_MUTATION, {
        onCompleted: async () => {
            console.warn("Incription réussi");
            setIsRegister(false);
        },
        onError: (err) => {
            if (err.message.includes("duplicate key value violates unique constraint")) {
                console.warn("Cet email est déjà utilisé");
            } else {
                console.error(err.message);
                console.warn("Une erreur est survenue");
            }
        },
    });

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                await signup({
                    variables: {
                        signupUserInput: {
                            email: email,
                            password: password,
                            passwordConfirm: confirmPassword,
                        },
                    },
                });

            } catch (error) {
                console.error(error)
            }

            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrors({});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>S'inscrire</Text>
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
                <Text style={styles.label}>Confirmer mot de passe :</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword} autoCorrect={false}
                    autoCapitalize='none'
                />
                {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                <Button title="S'inscrire" onPress={() => {
                    handleSubmit()
                }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        lexDirection: "column",
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

export default SignupForm;