"use client";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { signInAction, signInActionVerifyOTP } from "@/actions/auth/login";
import { SignInModal } from "./SignInModal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Turnstile } from "@marsidev/react-turnstile";

interface State {
  email: string;
}

export const SignIn = () => {
  const { register, handleSubmit, watch } = useForm<State>();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [captchaToken, setCaptchaToken] = useState("");
  // const site = "29125b28-4758-4a6e-9c02-1334e26a77da";
  const site = "0x4AAAAAABAG3GMy0bEbQ6Da";

  const emailValue = watch("email");
  const OnSubmit = async (state: State) => {
    setLoading(true);
    // console.log(captchaToken);
    const resp = await signInAction(state.email, captchaToken);
    if (!resp.status) {
      setLoading(false);
      return toast.error(resp.message, {
        position: "top-right",
      });
    }
    onOpen();
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-4">
        <Input
          isRequired
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: "El campo de Email es requerido",
          })}
        />
        <Turnstile
          siteKey={site}
          onSuccess={(token) => {
            setCaptchaToken(token);
          }}
        />
        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit" isLoading={loading}>
            Login
          </Button>
        </div>
      </form>
      <SignInModal
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        email={emailValue}
        functionvalidate={signInActionVerifyOTP}
      />
    </>
  );
};
