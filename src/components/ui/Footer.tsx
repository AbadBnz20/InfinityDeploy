"use client";

import { useTranslations } from "next-intl";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok } from "react-icons/io5";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-maincolor  py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">
              Infinity Luxury Travel
            </h3>
            <p className="text-gray-400">Blvd. Kukulcán km 17, Zona Hotelera</p>
            <p className="text-gray-400">Cancún, Quintana Roo, México</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">
              {t("contact")}
            </h3>
            <p className="text-gray-400">{t("phone")}:+52 998 500 2798  | (+1) 800 871 9040</p>
            <p className="text-gray-400">
              Email: members@infinityluxurytravelclub.com
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">
              {t("followUs")}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/infinityluxurytravel"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400 flex items-center space-x-2"
                 target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoFacebook size={"30px"} />
              </a>
              <a
                href="https://www.instagram.com/infinityluxurytravelclub/"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400 flex items-center space-x-2"
                 target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoInstagram size={"30px"} />
              </a>
              <a
                href="https://www.tiktok.com/@infinityluxurytravelclub"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400 flex items-center space-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoTiktok size={"30px"} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
