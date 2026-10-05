import { test, expect } from '@playwright/test'

test('muestra error con credenciales incorrectas', async ({ page }) => {
    await page.route('**/api/v1/auth/token', route => {
        route.fulfill({ status: 401, body: '{}' })
    })
    await page.goto('/login')
    await page.fill('input#user', 'Admin')
    await page.fill('input#password', 'wrong')
    await page.click('button[type="submit"]')
    await expect(page.getByText('Credenciales incorrectas')).toBeVisible()
})