const fs = require('fs');

const puppeteer = require('puppeteer');


async function run() {


const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35');
//await page.screenshot({ path:'example.png' });


//const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
//console.log(links);


const jobListings = await page.evaluate(() => Array.from(document.querySelectorAll('#searchResultData .wht-shd-bx'), (e) => ({
    title: e.querySelector('.clearfix h2').innerText,
    company: e.querySelector('.clearfix h3').innerText,
    location: e.querySelector('.clearfix span').innerText,
    job_description: e.querySelector('.clearfix .list-job-dtl li').innerText,
    skills: e.querySelector('.clearfix .list-job-dtl span').innerText,
    
})));
console.log(jobListings);


fs.writeFile('jobListings.json', JSON.stringify(jobListings),(err) =>{
    if (err) throw err;
    console.log('File saved');
});

await browser.close();


}
run();