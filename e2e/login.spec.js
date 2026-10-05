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

test('login exitoso redirige a home y guarda token', async ({ page }) => {
    const fakeToken = 'header.' + btoa(JSON.stringify({
        sub: 'Admin',
        roles: ['ADMIN'],
        exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'

    await page.route('**/api/v1/auth/token', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ token: fakeToken })
        })
    })

    await page.goto('/login')
    await page.fill('input#user', 'Admin')
    await page.fill('input#password', 'Admin')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/')
    const token = await page.evaluate(() => localStorage.getItem('giacobello-token'))
    expect(token).toBe(fakeToken)
})