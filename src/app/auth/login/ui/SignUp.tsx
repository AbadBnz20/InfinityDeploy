import { Button, Input, useDisclosure } from "@nextui-org/react";
import { SelectCode } from "./SelectCode";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  signInActionPhone,
  signInActionVerifyOTPPhone,
} from "@/actions/auth/login";
import { toast } from "react-toastify";
import { SignInModal } from "./SignInModal";
import { Turnstile } from "@marsidev/react-turnstile";

export interface StateForm {
  code: string;
  phone: string;
}

export const SignUp = () => {
  const { register, handleSubmit, watch, control } = useForm<StateForm>();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const emailValue = `${watch("code")}${watch("phone")}`;
  const [captchaToken, setCaptchaToken] = useState("");
  // const site = "29125b28-4758-4a6e-9c02-1334e26a77da";
  const site = "0x4AAAAAABAG3GMy0bEbQ6Da";
  const Onhandle = async (state: StateForm) => {
    setLoading(true);

    const resp = await signInActionPhone(
      `${state.code}${state.phone}`,
      captchaToken
    );
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
      <form onSubmit={handleSubmit(Onhandle)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
          <SelectCode control={control} />
          <Input
            className="col-span-2"
            classNames={{
              inputWrapper: "rounded-none  rounded-br-md rounded-tr-md",
            }}
            radius="none"
            isRequired
            {...register("phone", {
              required: "El campo de phone es requerido",
            })}
            label="Phone"
            placeholder="Enter your phone"
            type="number"
          />
        </div>
        {/* <HCaptcha
          sitekey={site}
          onVerify={(token) => {
            setCaptchaToken(token);
          }}
        /> */}
        <Turnstile
          siteKey={site}
          onSuccess={(token) => {
            setCaptchaToken(token);
          }}
        />
        <div className="flex gap-2 justify-end">
          <Button isLoading={loading} type="submit" fullWidth color="primary">
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
        functionvalidate={signInActionVerifyOTPPhone}
      />
    </>
  );
};
