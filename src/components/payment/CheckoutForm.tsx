'use client';
import { Button } from "@nextui-org/react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";

interface Props {
  dpmCheckerLink: string;
}

export const CheckoutForm = ({ dpmCheckerLink }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined> ();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    console.log(e);
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkoutpayment",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };
  const paymentElementOptions:StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
    <form className="w-[30vw] min-w-[500px] self-center  rounded-[7px] p-10 my-auto" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button  className=" bg-[#0055DE] text-white mt-5  w-full"  isDisabled={isLoading || !stripe || !elements}   isLoading={isLoading} type="submit">
        Pagar Ahora
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}
    <div className="self-center  w-[30vw] min-w-[500px] leading-[20px] mb-5">
      <p>
      Los métodos de pago se muestran dinámicamente según la ubicación del cliente, el monto del pedido y la moneda.&nbsp;
        <a className=" text-[#0055DE]" href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Vista previa de los métodos de pago por transacción</a>
      </p>
    </div>
  </>
  );
};
