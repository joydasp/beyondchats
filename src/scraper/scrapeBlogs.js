const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const BLOG_URL = "https://beyondchats.com/blogs/";

async function scrapeBlogs() {
  try {
    const { data } = await axios.get(BLOG_URL, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    const links = [];

    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href && href.includes("/blogs/")) {
        links.push(href);
      }
    });

    const uniqueLinks = [...new Set(links)];
    const oldestFive = uniqueLinks.slice(-5);

    for (const link of oldestFive) {
      const url = link.startsWith("http")
        ? link
        : `https://beyondchats.com${link}`;

      const page = await axios.get(url);
      const $$ = cheerio.load(page.data);

      const title = $$("h1").text().trim();
      const content = $$("article").text().trim();

      if (!title || !content) continue;

      await Article.updateOne(
        { sourceUrl: url },
        { title, content, sourceUrl: url },
        { upsert: true }
      );

      console.log("Saved:", title);
    }

    console.log("🎉 Scraping completed");
  } catch (err) {
    console.error("Scraping error:", err.message);
  }
}

module.exports = scrapeBlogs;
