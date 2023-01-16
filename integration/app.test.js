describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=add-item-form--add-item-form-base&viewMode=story')
        const image = await page.screenshot()

        // DAL from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})