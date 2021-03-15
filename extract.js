/* extractors */

function getAllImages() {
  let sources = [];
  let images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    let image = images[i];
    let source = image.src;
    if (source) {
      sources.push(image.src);
    }
  }
  return sources;
}

function getAllLinks() {
  let hrefs = [];
  let links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let href = link.href;
    if (href) {
      hrefs.push(href);
    }
  }
  return hrefs;
}
