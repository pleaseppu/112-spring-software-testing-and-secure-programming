const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    
    // Set screen size
    await page.setViewport({width: 1080, height: 1024});
    
    // Click search button
    await page.click('.DocSearch.DocSearch-Button');
    
    // Type into search box
    await page.type('#DocSearch-Input', 'chipi chipi chapa chapa');

    // Wait for search result
    const searchResultSelector = '.devsite-result-item-link';
    
    // Get the `Docs` result section
    await page.waitForSelector('#docsearch-item-5'); //等到直到有第一個DOC部分的出來
    
    // Click on first result in `Docs` section
    await page.click('#docsearch-item-5'); // 點擊第一個內含DOC部分的
    
    // Locate the title
    const textSelector = await page.waitForSelector('h1');  //找到title的位置
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    
    // Print the title
    console.log('The title of this blog post is "%s".', fullTitle);
    
    // Close the browser
    await browser.close();
})();

    // Hints:
    // Click search button
    // Type into search box
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title
    // Print the title
    // Close the browser
