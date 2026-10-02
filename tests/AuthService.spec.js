import { describe, vi, afterEach, it, expect } from 'vitest';
import { login } from '../src/services/AuthService';

describe('AuthService', () => {

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('devuelve el token cuando el login es correcto', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ token: 'abc123' })
        })))

        const result = await login('Admin', 'Admin')
        expect(result).toEqual({ token: 'abc123' })
    })

    it('lanza error cuando el login falla', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: false,
            status: 401
        })))

        await expect(login('Admin', 'wrong')).rejects.toThrow()
    })

})