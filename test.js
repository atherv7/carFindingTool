const puppeteer = require('puppeteer'); 
const readLine = require('readline-sync');

async function extract(attributes) {
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage(); 
    await page.goto('https://www.autotrader.com/'); 
    await page.waitForXPath('//*[@id="2230463214"]'); 
    const options = await page.evaluate(() => {
        return document.getElementById("2230463214").children[2].children;
    }); 

    console.log(typeof options === 'object');
    const names = options.forEach((option) => {
        return option.innerText; 
    });

    await browser.close(); 

    console.log(names); 
    return options; 
}

function setAtt(attributes) {
    attributes.set('newOrUsed', readLine.question('do you want a new or used car? ')); 
    attributes.set('make', readLine.question('what make are you looking for? ')); 
    attributes.set('model', readLine.question('what model are you looking for? ')); 
}

const attributes = new Map(); 
//setAtt(attributes); 
extract(attributes);
