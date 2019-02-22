import * as puppeteer from 'puppeteer';
import * as moment from 'moment';
import * as path from 'path';

import { URL, INTERNAL_NURSE } from '../config/config';

export async function test2(): Promise<void> {
  // const browser = await puppeteer.launch({headless: false})
  // const page = await browser.newPage()
  // await page.setViewport({ width: 1280, height: 800 })
  // await page.goto('https://www.amazon.com')
  // await page.type('#twotabsearchtextbox', 'chocolats')
  // await page.click('input.nav-input')
  // await page.waitForSelector('#resultsCol')
  // await page.screenshot({path: 'capture.png'})
  // await browser.close()
  const browser = await puppeteer.launch({headless: false, devtools: true});
  const page = await browser.newPage();

  await page.goto('https://developers.google.com/web/');

  // Type into search box.
  await page.type('#searchbox input', 'Headless Chrome');

  // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = '.devsite-suggest-all-results';
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);

  // Wait for the results page to load and display the results.
  const resultsSelector = '.gsc-results .gsc-thumbnail-inside a.gs-title';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      const title = anchor.textContent.split('|')[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);
  console.log(links.join('\n'));

  await browser.close();
}

export async function test(): Promise<void> {
  console.log('--- INTERNAL_NURSE ---');

  try {
    const browser = await puppeteer.launch({headless: false, devtools: true});
    const page = await browser.newPage();

    const pages = [
      'start',
      'login',
      'passcode',
      'appointmentsSorting',
      'appointmentsAddSearch',
    ];

    for (const item of pages) {
      try {
        await eval(item)(page);
        const currentDate = moment();
        await page.waitFor(1000);
        const nameFile = `${currentDate.format('YYYYMMDDHHmmssSSS')}.png`;
        const pathFile = path.join(__dirname, '..', 'test', 'patient', nameFile);
        await page.screenshot({ path: pathFile });
        console.log(item, 'OK');
      } catch (error) {
        console.error(item, 'ERROR', error);
      }
    }

    await browser.close();
  } catch (error) {
    console.log('--- INTERNAL_NURSE ERROR ---');
    console.error(error);
  }
}

async function start(page: any): Promise<any> {
  await page.setViewport({ width: 1920, height: 1080 });
  page.goto(URL);
  await page.waitForNavigation();
}

async function login(page: any): Promise<void> {
  await page.type('#username', INTERNAL_NURSE.login);
  await page.type('#password', INTERNAL_NURSE.password);
  page.click('button.c7z-button');
  await page.waitForNavigation();
}

async function passcode(page: any): Promise<void> {
  await page.type('#passcode', INTERNAL_NURSE.passcode);
  page.click('button.c7z-button');
  await page.waitForNavigation();
}

async function appointmentsSorting(page: any): Promise<void> {
  page.click('button.c7z-button');
  await page.waitForNavigation();
}

async function appointmentsAddSearch(page: any): Promise<void> {
  page.click('button.c7z-button');
}
