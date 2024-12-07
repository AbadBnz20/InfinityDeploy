"use client";

import {
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@nextui-org/react";
import {  useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { FormMessage, Message } from "./form-message";


  interface Props{
    searchParams:Message
  }

export const LoginForm = ({searchParams}:Props) => {
  // const [state, dispath] = useFormState(authenticate, undefined);
  // const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string | number | null>("login");

  // const toggleVisibility = () => setIsVisible(!isVisible);
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // const onChange = (e: string | null) => setCaptchaToken(e);

  // useEffect(() => {
  //   if (state === "Success") {
  //     window.location.replace("/");
  //   }
  // }, [state]);

  return (
    <div className="w-full max-w-md m-auto p-6">
      {/* <form
        action={(e) => {
          if (!captchaToken) {
            alert("Por favor, completa el reCAPTCHA.");
            return;
          }
          dispath(e); // Enviar el token junto con otros datos
        }}
      >
        <div className="space-y-6">
          <div className="space-y-2 text-center flex justify-center items-center flex-col">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-eigb5La26zWW8G8xrkuVbJPlSSBNEC.png"
              alt="Infinity Luxury Travel Logo"
              className="h-20"
            />
          </div>
          {state === "Invalid credentials." && (
            <div className="flex flex-row mb-2 p-2 bg-[#FDEDED] rounded-lg">
              <IoAlertCircleOutline className="h-5 w-5 text-red-500" />
              <p className=" ml-2 text-sm text-red-500">
                Verifique las credenciales
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs ">
                <span className="bg-background px-2 text-muted-foreground text-white">
                  Please enter credentials
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                label="Email"
                size="sm"
                name="email"
                placeholder="Enter your email"
                className="text-white"
              />
            </div>
            <div className="space-y-2">
              <Input
                label="Password"
                size="sm"
                name="password"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
            <div className="space-y-2 flex justify-center">
              <ReCAPTCHA
                sitekey="6LfU04MqAAAAAGnXmTVCtPTWrDDt2UPn-UYwnIf3"
                onChange={onChange}
              />
            </div>

            <LoginButton />
          </div>
        </div>
      </form> */}

      <div className="space-y-2 text-center flex justify-center items-center flex-col">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-eigb5La26zWW8G8xrkuVbJPlSSBNEC.png"
          alt="Infinity Luxury Travel Logo"
          className="h-20"
        />
      </div>

      <div className="flex flex-col w-full">
        <Card className="max-w-full w-[440px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Email">
                <SignIn />
              </Tab>
              <Tab key="sign-up" title="Phone">
                <SignUp />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
      <FormMessage message={searchParams} />
    </div>
  );
};

// function LoginButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button
//       type="submit"
//       isLoading={pending}
//       className="w-full bg-gray-900 text-white "
//     >
//       Sign in
//     </Button>
//   );
// }
