import { loadStripe } from '@stripe/stripe-js'

let stripePromise = null

export function isStripeConfigured() {
    return Boolean(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
}

export function getStripe() {
    if (!isStripeConfigured()) {
        return Promise.resolve(null)
    }
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
}

export function resetStripe() {
    stripePromise = null
}
