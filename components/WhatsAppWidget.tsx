'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    CreateWhatsappChatWidget: (options: any) => void;
  }
}

export function WhatsAppWidget() {
  useEffect(() => {
    const options = {
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#4dc247",
        ctaText: "Chat Now",
        borderRadius: "25",
        marginLeft: "0",
        marginBottom: "20",
        marginRight: "20",
        position: "right"
      },
      brandSetting: {
        brandName: "Upsilon Cyber Defence",
        brandSubTitle: "Typically replies within a day",
        brandImg: "/logo.png",
        welcomeText: "Hi there!\\nHow can I help you?",
        messageText: "Hello, I have a question",
        backgroundColor: "#0a5f54",
        ctaText: "Start Chat",
        borderRadius: "25",
        autoShow: false,
        phoneNumber: "917981019955"
      }
    };

    // Wait for the script to load and then create the widget
    const checkAndCreateWidget = () => {
      if (window.CreateWhatsappChatWidget) {
        window.CreateWhatsappChatWidget(options);
      } else {
        // Retry after a short delay if the function is not yet available
        setTimeout(checkAndCreateWidget, 100);
      }
    };

    checkAndCreateWidget();
  }, []);

  return (
    <>
      <Script
        id="whatsapp-widget"
        src="https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?15374"
        strategy="afterInteractive"
      />
    </>
  );
}