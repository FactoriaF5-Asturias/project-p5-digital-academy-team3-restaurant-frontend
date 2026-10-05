import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const loadStripe = vi.fn()
vi.mock('@stripe/stripe-js', () => ({ loadStripe }))

let service

beforeEach(async () => {
    vi.resetModules()
    loadStripe.mockReset()
    service = await import('../../src/services/StripeService.js')
})

afterEach(() => {
    vi.unstubAllEnvs()
})

describe('StripeService', () => {
    it('is not configured without a publishable key', async () => {
        vi.stubEnv('VITE_STRIPE_PUBLISHABLE_KEY', '')
        expect(service.isStripeConfigured()).toBe(false)
        expect(await service.getStripe()).toBeNull()
        expect(loadStripe).not.toHaveBeenCalled()
    })

    it('loads Stripe once with the publishable key', async () => {
        vi.stubEnv('VITE_STRIPE_PUBLISHABLE_KEY', 'pk_test_123')
        const stripe = { elements: vi.fn() }
        loadStripe.mockResolvedValue(stripe)
        expect(service.isStripeConfigured()).toBe(true)
        expect(await service.getStripe()).toBe(stripe)
        expect(await service.getStripe()).toBe(stripe)
        expect(loadStripe).toHaveBeenCalledTimes(1)
        expect(loadStripe).toHaveBeenCalledWith('pk_test_123')
    })

    it('allows a retry after the load fails', async () => {
        vi.stubEnv('VITE_STRIPE_PUBLISHABLE_KEY', 'pk_test_123')
        const stripe = { elements: vi.fn() }
        loadStripe.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce(stripe)
        await expect(service.getStripe()).rejects.toThrow('network')
        expect(await service.getStripe()).toBe(stripe)
        expect(loadStripe).toHaveBeenCalledTimes(2)
    })
})
