import LoginForm from "../components/LoginForm";

function ConnectBack() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-58px)] lg:min-h-[calc(100vh-74px)]">
      <div className="border rounded-lg py-6 px-2 shadow-sm shadow-main">
        <LoginForm />
      </div>
    </div>
  );
}

export default ConnectBack;
