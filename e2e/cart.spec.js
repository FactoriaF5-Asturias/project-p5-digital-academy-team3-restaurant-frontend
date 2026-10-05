import { test, expect } from '@playwright/test'

test('añade producto al carrito desde la home', async ({ page }) => {
    await page.route('**/api/v1/products', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                { id: 1, name: 'Pizza Margherita', description: 'Test', category: 'Especialidades', price: 12.5, imageUrl: '/x.jpg' }
            ])
        })
    })
    await page.goto('/')
    await expect(page.getByTestId('cart-counter')).toHaveText('0')
    await page.getByTestId('add-to-cart').click()
    await expect(page.getByTestId('cart-counter')).toHaveText('1')
})