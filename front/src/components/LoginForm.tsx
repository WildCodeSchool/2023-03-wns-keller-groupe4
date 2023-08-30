import { useLazyQuery} from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LOGIN_GUERY } from "../utils/queries";
import AuthService, { IClientData } from "../utils/authService";

interface IFormLogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register, 
    handleSubmit, 
    formState
  } = useForm<IFormLogin>({});
  
  const [login] = useLazyQuery(LOGIN_GUERY, {
    onCompleted: async ({ login }: { login: IClientData }) => {
      AuthService.login(login);
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
      navigate("/connect");
    },
  });

  const submitForm = async (data: IFormLogin) => {
    await login({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };


  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl underline underline-offset-4 decoration-main">
        Se connecter
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("email", { required: "Ce champ est requis" })}
          />
          {formState.errors.email && (
            <p className="text-sm text-red-400 text-right">
              {formState.errors.email.message?.toString()}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-main focus:border-transparent"
            {...register("password", { required: "Ce champ est requis" })}
          />
          {formState.errors.password && (
            <p className="text-sm text-red-400 text-right">
              {formState.errors.password.message?.toString()}
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
