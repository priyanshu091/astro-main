/**
 * Shared site-wide contact constants.
 *
 * WHATSAPP_URL includes a pre-filled message via WhatsApp's `?text=` parameter,
 * so tapping any WhatsApp link on the site opens the chat with the message
 * already typed in — the visitor just has to hit send.
 */

export const WHATSAPP_NUMBER = "7800333373";

const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Acharya Soumitra, I'm interested in a Vedic astrology consultation. Could you share more details?";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;
