import { test, expect } from '@playwright/test'

test('logout limpia la sesion', async ({ page }) => {
    const fakeToken = 'header.' + btoa(JSON.stringify({
        sub: 'Admin',
        roles: ['ADMIN'],
        exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'

    await page.addInitScript(token => {
        localStorage.setItem('giacobello-token', token)
    }, fakeToken)

    await page.goto('/')
    await expect(page.getByText('Logout')).toBeVisible()
    await page.getByText('Logout').click()
    await expect(page.getByText('Login')).toBeVisible()

    const token = await page.evaluate(() => localStorage.getItem('giacobello-token'))
    expect(token).toBeNull()
})