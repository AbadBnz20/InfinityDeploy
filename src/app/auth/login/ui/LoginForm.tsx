"use client";

import { authenticate } from "@/actions/auth/login";
import { Button, Input } from "@nextui-org/react";
import {  useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  IoAlertCircleOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispath] = useFormState(authenticate, undefined);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace('/');
    }
  }, [state]);

  return (
    <div className="w-full max-w-md m-auto p-6">
      <form action={dispath}>
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
              <p className=" ml-2 text-sm text-red-500">Verifique las credenciales</p>
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
            <LoginButton />
          </div>
        </div>
      </form>
    </div>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={pending}
      className="w-full bg-gray-900 text-white "
    >
      Sign in
    </Button>
  );
}
