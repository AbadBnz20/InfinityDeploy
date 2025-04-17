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
import { useTheme } from "next-themes";
  interface Props{
    searchParams:Message
  }

export const LoginForm = ({searchParams}:Props) => {
  // const [state, dispath] = useFormState(authenticate, undefined);
  // const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string | number | null>("login");
   const { theme } = useTheme();
 
  return (
    <div className="w-full max-w-md m-auto p-6">
    
      
      <div className="space-y-2 text-center flex justify-center items-center flex-col">
        <img
          src={ theme === 'dark' ? "https://res.cloudinary.com/devz7obre/image/upload/v1744926909/logo1dark_xmwuhb.png" : "https://res.cloudinary.com/devz7obre/image/upload/v1744321737/logo1_v9yswm.png"}
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
