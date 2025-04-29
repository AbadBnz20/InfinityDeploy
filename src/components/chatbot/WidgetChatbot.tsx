"use client";

import React from "react";
import Script from "next/script";
import { Image } from "@nextui-org/react";

export const WidgetChatbot = () => {
  return (
    <>
      <div className="fixed top-32 right-0 z-50 bg-white px-4 py-2  shadow-lg">
        <a
          href="https://www.ramembers.com/"
          className="hover:text-gold-500 transition-colors duration-300 text-gray-400 flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="home/logos/logo3.png" width={80} />
        </a>
      </div>

      <Script
        id="messagebird-chat-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        var MessageBirdChatWidgetSettings = {
          widgetId: 'c780d9bc-edf6-4c45-a795-c5b879a3390e',
          initializeOnLoad: true,
        };
        !function() {
          "use strict";
          if (Boolean(document.getElementById("live-chat-widget-script")))
            console.error("MessageBirdChatWidget: Snippet loaded twice on page");
          else {
            var e, t;
            window.MessageBirdChatWidget = {}, window.MessageBirdChatWidget.queue = [];
            for (var i = ["init", "setConfig", "toggleChat", "identify", "hide", "on", "shutdown"], n = function() {
              var e = i[d];
              window.MessageBirdChatWidget[e] = function() {
                for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                window.MessageBirdChatWidget.queue.push([[e, i]])
              }
            }, d = 0; d < i.length; d++) n();
            var a = (null === (e = window) || void 0 === e || null === (t = e.MessageBirdChatWidgetSettings) || void 0 === t ? void 0 : t.widgetId) || "",
              o = function() {
                var e, t = document.createElement("script");
                t.type = "text/javascript";
                t.src = "https://livechat.messagebird.com/bootstrap.js?widgetId=" + a;
                t.async = true;
                t.id = "live-chat-widget-script";
                var i = document.getElementsByTagName("script")[0];
                null == i || null === (e = i.parentNode) || void 0 === e || e.insertBefore(t, i)
              };
            "complete" === document.readyState ? o() : window.attachEvent ? window.attachEvent("onload", o) : window.addEventListener("load", o, false)
          }
        }();
      `,
        }}
      />
    </>
  );
};
