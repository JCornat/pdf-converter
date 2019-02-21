import * as puppeteer from 'puppeteer';
import * as moment from 'moment';

export async function test(): Promise<void> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const pages = [
      'start',
      'login',
      'results',
      'resultAnalyse',
    ];

    for (const item of pages) {
      try {
        await eval(item)(page);
        const currentDate = moment();
        await page.waitFor(1000);
        await page.screenshot({ path: `./${currentDate.format('YYYYMMDDHHmmssSSS')}.png` });
      } catch (error) {
        console.error(error);
      }
    }

    // let currentDate;
    //
    // await start(page);
    // currentDate = moment();
    // await page.screenshot({ path: `./${currentDate.format('YYYYMMDDHHmmsss')}.png` });
    //
    // await login(page);
    // currentDate = moment();
    // await page.screenshot({ path: `./${currentDate.format('YYYYMMDDHHmmsss')}.png` });
    //
    // await results(page);
    // currentDate = moment();
    // await page.screenshot({ path: `./${currentDate.format('YYYYMMDDHHmmsss')}.png` });
    //
    // await result(page);
    // currentDate = moment();
    // await page.screenshot({ path: `./${currentDate.format('YYYYMMDDHHmmsss')}.png` });
    //
    // await resultAnalyse(page);
    // currentDate = moment();
    // await page.screenshot({ path: `./${currentDate.format('YYYYMMDDHHmmsss')}.png` });

    // await page.setViewport({ width: 1920, height: 1080 });
    // page.goto('http://localhost:4200');
    // const response = await page.waitForNavigation();
    //
    // await page.type('#username', 'jco');
    // await page.type('#password', 'jco');
    // await page.screenshot({ path: './screen1.png' });
    // page.click('button.c7z-button');
    // const response2 = await page.waitForNavigation();
    //
    // // const text = await page.evaluate( () => Array.from( document.querySelectorAll( 'button' ), element => element ) );
    // // page.click('#biologist-results');
    // const a = await page.$eval('i.material-icons-description', (element) => element.className);
    // await page.screenshot({ path: './screen2.png' });
    //
    // await page.type('input.search', 'test j');
    // await page.waitFor(2000);
    // // const response3 = await page.waitForNavigation();
    //
    // // await page.type('#passcode', '1235');
    // // await page.screenshot({ path: './screen2.png' });
    // // await page.click('button.c7z-button');
    //
    // await page.screenshot({ path: './screen3.png' });
    // await page.click('shared-patient-item > .row');
    // await page.waitFor(1000);
    // await page.screenshot({ path: './screen4.png' });
    await browser.close();

    // upload file
    // let input = await page.$("input[type=file]");
    // await input.uploadFile("./test.pdf");
    console.log('ok');
  } catch (error) {
    console.error(error);
  }
}

async function start(page: any): Promise<any> {
  await page.setViewport({ width: 1920, height: 1080 });
  page.goto('http://localhost:4200');
  await page.waitForNavigation();
}

async function login(page: any): Promise<void> {
  await page.type('#username', 'cornat.jacques@gmail.com');
  await page.type('#password', 'atoutbio54');
  page.click('button.c7z-button');
  await page.waitForNavigation();
}

async function results(page: any): Promise<void> {
  page.click('patient-result-item > .row');
  await page.waitForNavigation();
}

async function resultAnalyse(page: any): Promise<void> {
  page.click('result-analyse > div > .row');
}
