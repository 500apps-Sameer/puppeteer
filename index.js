const puppeteer = require('puppeteer');


async function run() {


const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35');
//await page.screenshot({ path:'example.png' });


//const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
//console.log(links);


const jobListings = await page.evaluate(() => Array.from(document.querySelectorAll('#searchResultData .card'), (e) => ({
   title: e.querySelector('.clearfix h2').innerText,
    company: e.querySelector('.company-name a').innerText,
    location: e.querySelector('.loc a').innerText,
})));
console.log(jobListings);


await browser.close();


}
run();