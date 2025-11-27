// Checkout URL for all CTA buttons - BLACK FRIDAY SPECIAL
export const CHECKOUT_URL = 'https://buy.stripe.com/7sY28s5qg2vb8IVclO3wQ0q'

// Meta Pixel tracking helper
export const trackCheckout = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout');
  }
}
