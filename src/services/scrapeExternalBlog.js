async function scrapeExternalContent(url) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);

  return $("article").text().trim() ||
         $("main").text().trim() ||
         $("body").text().trim();
}

module.exports = scrapeExternalContent;
