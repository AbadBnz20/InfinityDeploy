"use server";

export const ContentCapcha = () => {
  const site = process.env.NEXT_HCAPTCHA;
  console.log(site);
  return <div>ContentCapcha</div>;
};
