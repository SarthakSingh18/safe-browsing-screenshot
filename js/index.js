const puppeteer = require('puppeteer');
module.exports={
clickScreenshot:(url) => {
    return new Promise(async(resolve,reject)=>{
        try{
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        await page.screenshot({path:"screenshot.png"});
        browser.close();
        resolve({message:`ScreenShot Done `});
    }
    catch(e){
        console.log(e);
        reject({error:"Some error Occured"});
    }
    })
}
}