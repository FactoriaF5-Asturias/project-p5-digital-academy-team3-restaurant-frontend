import { test, expect } from '@playwright/test'

test('redirige a login al entrar a admin sin sesion iniciada', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/login/)
})