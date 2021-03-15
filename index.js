const express = require('express');
const app = express();
const port = 8002;

const puppeteer = require('puppeteer');

app.get('/api', async (req, res) => {
  let url = req.query.url;

  let resp = {};
  let error = false;

  if (url) {
    if (!url.startsWith('http')) {
      url = 'http://' + url;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      console.log('page: ' + url);
      await page.goto(url);//, { waitUntil: 'networkidle0' });

      let title = await page.title();

      console.log('detecting...');
      await page.addScriptTag({ path: 'extract.js' });

      let resources = await page.evaluate(getResources);

      if (resources) {
        console.log('resources found');
        resp = {
          msg: 'resources found',
          resources: resources,
          page_title: title
        };
      } else {
        console.log('no resources found');
        resp = {
          msg: 'no resources found'
        };
      }
    } catch(e) {
      console.log(e);
      resp = {
        msg: 'invalid page'
      };
    }

    await browser.close();

  } else {
    resp = {
      msg: "'url' parameter not provided"
    };
  }
  res.json(resp);
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`extractor listening at http://localhost:${port}`);
});

function getResources() {
  let resources = {};
  let images = getAllImages();
  let links = getAllLinks();
  resources.images = images;
  resources.links = links;
  return resources;
}
