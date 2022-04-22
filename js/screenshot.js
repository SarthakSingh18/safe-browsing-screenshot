const puppeteer = require('puppeteer');
module.exports={
clickScreenshot:(url) => {
    return new Promise(async(resolve,reject)=>{
        try{
            const urlArray = url.split(" ");
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();
        await page.goto(`https://`+urlArray[0]+urlArray[1], {waitUntil: 'load', timeout: 0});
        await page.screenshot({path:"../screenshot.png"});
        browser.close();
        resolve("/home/sarthak/WebstormProjects/safe-browsing-screenshot/screenshot.png");
    }
    catch(e){
        console.log(e);
        reject("maybe website took so long to respond");
    }
    })
}
}