'use client';

import { useTranslations } from "next-intl";

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
              {t('contact')}
            </h3>
            <p className="text-gray-400">{t('phone')}: +52 998 123 4567</p>
            <p className="text-gray-400">Email: info@infinityluxury.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">
              {t("followUs")}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/infinityluxurytravel"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/infinityluxurytravelclub/"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
