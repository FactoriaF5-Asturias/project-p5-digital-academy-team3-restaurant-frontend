import { test, expect } from '@playwright/test'

test('muestra la vista 404 en ruta inexistente', async ({ page }) => {
    await page.goto('/pagina-que-no-existe')
    await expect(page.getByText('¡Página no encontrada!')).toBeVisible()
})