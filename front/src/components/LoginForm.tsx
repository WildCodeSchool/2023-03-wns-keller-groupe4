import { useForm } from "react-hook-form";

interface IFormLogin {
  email: string;
  password: string;
}

function LoginForm({ admin = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  const login = async (data: IFormLogin) => {
    if (admin) {
      console.log("login admin", data);
    } else {
      console.log("login user", data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl underline underline-offset-4 decoration-main">
        Se Connecter
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("email", { required: "Ce champ est requis" })}
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
            {...register("password", { required: "Ce champ est requis" })}
          />
          {errors.password && (
            <p className="text-sm text-red-400 text-right">
              {errors.password.message?.toString()}
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

export default LoginForm;
