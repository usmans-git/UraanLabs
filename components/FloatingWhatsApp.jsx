"use client";

import React from "react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923170128047?text=Hello%20UraanTech%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project."
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with UraanTech on WhatsApp"
      id="floatingWhatsAppBtn"
    >
      <div className="floating-whatsapp-pulse"></div>
      <svg
        className="floating-whatsapp-icon"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        aria-hidden="true"
      >
        <path d="M16.002 0C7.164 0 0 7.164 0 16.002c0 2.825.74 5.577 2.146 7.994L.073 31.927l8.132-2.032a15.932 15.932 0 007.797 2.032c8.838 0 16.002-7.164 16.002-16.002C32.004 7.164 24.84 0 16.002 0zm9.36 22.617c-.389 1.096-1.929 2.008-2.67 2.138-.707.123-1.63.176-2.64-.15a22.56 22.56 0 01-2.42-.968c-4.274-1.85-7.05-6.196-7.265-6.482-.212-.284-1.74-2.316-1.74-4.417 0-2.102 1.102-3.136 1.492-3.56.39-.425.85-.53 1.134-.53.284 0 .567.002.815.015.263.013.616-.1.963.734.355.85 1.206 2.946 1.312 3.16.106.213.178.46.036.744-.142.284-.213.46-.425.71-.213.248-.448.555-.64.745-.213.213-.437.443-.188.87.248.425 1.102 1.816 2.366 2.942 1.624 1.448 2.994 1.897 3.42 2.11.425.213.674.177.923-.106.248-.284 1.063-1.24 1.347-1.666.284-.425.567-.355.957-.213.39.142 2.481 1.17 2.906 1.383.425.213.709.319.815.5.107.177.107 1.028-.283 2.124z" />
      </svg>
      <span className="floating-whatsapp-tooltip">Chat with us</span>
    </a>
  );
}
