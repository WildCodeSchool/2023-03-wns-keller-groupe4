import { Tab } from "@headlessui/react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Connect() {
  return (
    <div className="relative flex justify-center items-center min-h-[calc(100vh-58px)] lg:min-h-[calc(100vh-74px)]">
      <Tab.Group>
        <div className="flex flex-col items-center gap-6">
          <div className="absolute top-8 border rounded-lg px-6 py-2 shadow-sm shadow-main sm:top-12 md:top-24">
            <Tab.List>
              <Tab
                className={({ selected }) =>
                  `${
                    selected
                      ? "underline decoration-main underline-offset-4 "
                      : ""
                  } px-2 rounded-md`
                }
              >
                Se Connecter
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${
                    selected
                      ? "underline decoration-main underline-offset-4 "
                      : ""
                  } px-2 rounded-md`
                }
              >
                S'inscrire
              </Tab>
            </Tab.List>
          </div>
          <div className="border rounded-lg py-6 px-2 shadow-sm shadow-main">
            <Tab.Panels>
              <Tab.Panel>
                <LoginForm />
              </Tab.Panel>
              <Tab.Panel>
                <SignupForm />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
    </div>
  );
}

export default Connect;
