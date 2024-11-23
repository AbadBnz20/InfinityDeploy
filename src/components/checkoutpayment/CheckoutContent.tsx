"use client";
import { Button, Divider } from "@nextui-org/react";
import { useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleOutline, IoCloseOutline, IoOpenOutline, IoWarningOutline } from "react-icons/io5";



export const CheckoutContent = () => {
  const stripe = useStripe();
  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }
      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  return (
    <div className="flex flex-col justify-center items-center gap-[30px] w-[30vw] min-w-[500px] min-h-[380px] self-center  rounded-[7px] p-10 ">
      <div
        className="flex justify-center items-center h-[60px] w-[60px] rounded-full"
        style={{
          backgroundColor:
            status === "succeeded"
              ? "#30B130"
              : status === "processing"
              ? "#6D6E78"
              : status === "requires_payment_method"
              ? "#DF1B41"
              : "#DF1B41",
        }}
      >
        {status === "succeeded"
          ? <IoCheckmarkCircleOutline size={'30px'} color="white"/>
          : status === "processing"
          ? <IoWarningOutline size={'30px'} color="white"/>
          : status === "requires_payment_method"
          ? <IoCloseOutline size={'30px'} color="white"/>
          : <IoCloseOutline size={'30px'} color="white"/>}
      </div>
      <h2 id="status-text">
        {status === "succeeded"
          ? "Payment succeeded"
          : status === "processing"
          ? "Your payment is processing."
          : status === "requires_payment_method"
          ? "Your payment was not successful, please try again."
          : "Something went wrong, please try again."}
      </h2>
      {intentId && (
        <div className="w-full">
          <Divider className="m-2"/>
          <div className="flex justify-between">
            <td className="font-bold">id</td>
            <td id="intent-id" className="TableContent">
              {intentId}
            </td>
          </div>
          <div className="flex justify-between">
            <td className="font-bold">status</td>
            <td id="intent-status" className="TableContent">
              {status}
            </td>
          </div>
          <Divider  className="m-2"/>
        </div>
      )}
      {intentId && (
        <a
          href={`https://dashboard.stripe.com/payments/${intentId}`}
          id="view-details"
          target="_blank"
          className="text-[#0055DE] flex justify-between items-center"
        >
          View details
          <IoOpenOutline/>
        </a>
      )}
    <Link href={'/'} className="w-full">
    <Button className=" bg-[#0055DE] text-white mt-5 w-full">
        Volver al inicio
      </Button></Link>
    </div>
  );
};
