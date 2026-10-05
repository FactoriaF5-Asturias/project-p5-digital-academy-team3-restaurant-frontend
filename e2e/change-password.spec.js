import { test, expect } from '@playwright/test'

test('redirige a change-password si el backend devuelve 409', async ({ page }) => {
    await page.route('**/api/v1/auth/token', route => {
        route.fulfill({ status: 409, body: '{}' })
    })
    await page.goto('/login')
    await page.fill('input#user', 'Admin')
    await page.fill('input#password', 'Admin')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/change-password/)
})