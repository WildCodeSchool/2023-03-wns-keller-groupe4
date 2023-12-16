import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { SIGNUP_MUTATION } from "../utils/mutations";
import { reloadPage } from "../utils/navigation";

interface IFormSignup {
    email: string;
    password: string;
    passwordConfirm: string;
}

function SignupForm() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormSignup>();

    const [signup] = useMutation(SIGNUP_MUTATION, {
        onCompleted: async () => {
            reloadPage();
        },
        onError: (err) => {
            if (
                err.message.includes(
                    "duplicate key value violates unique constraint",
                )
            ) {
                toast.error("Cet email est déjà utilisé");
            } else {
                console.error(err.message);
                toast.error("Une erreur est survenue");
            }
        },
    });

    const submitForm = async (data: IFormSignup) => {
        await signup({
            variables: {
                signupUserInput: {
                    email: data.email,
                    password: data.password,
                    passwordConfirm: data.passwordConfirm,
                },
            },
        });
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-2xl underline underline-offset-4 decoration-main">
                S'inscrire
            </h1>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(submitForm)}
            >
                {/* Email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
                        {...register("email", {
                            required: "Ce champ est requis",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "L'email n'est pas valide",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-400 text-right">
                            {errors.email.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
                        {...register("password", {
                            required: "Ce champ est requis",
                            minLength: {
                                value: 8,
                                message:
                                    "Le mot de passe doit faire au moins 8 caractères",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Le mot de passe doit faire au plus 20 caractères",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-400 text-right">
                            {errors.password.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Password Confirm */}
                <div>
                    <label htmlFor="passwordConfirm">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
                        {...register("passwordConfirm", {
                            required: "Ce champ est requis",
                            minLength: {
                                value: 8,
                                message:
                                    "Le mot de passe doit faire au moins 8 caractères",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Le mot de passe doit faire au plus 20 caractères",
                            },
                            validate: (value) =>
                                value === watch("password") ||
                                "Les mots de passe ne correspondent pas",
                        })}
                    />
                    {errors.passwordConfirm && (
                        <p className="text-sm text-red-400 text-right">
                            {errors.passwordConfirm.message?.toString()}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="border border-main rounded-md mt-6 px-2 py-1"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
