import { useForm } from "react-hook-form";

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

  const signup = async (data: IFormSignup) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl underline underline-offset-4 decoration-main">
        S'inscrire
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(signup)}>
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
                message: "Le mot de passe doit faire au moins 8 caractères",
              },
              maxLength: {
                value: 20,
                message: "Le mot de passe doit faire au plus 20 caractères",
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
          <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
          <input
            type="password"
            id="passwordConfirm"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("passwordConfirm", {
              required: "Ce champ est requis",
              minLength: {
                value: 8,
                message: "Le mot de passe doit faire au moins 8 caractères",
              },
              maxLength: {
                value: 20,
                message: "Le mot de passe doit faire au plus 20 caractères",
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
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default SignupForm;