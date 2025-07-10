import Url from "../models/Url.js";
import validUrl from "valid-url";
import nanoid from "../utils/generateCode.js";

const BASE_URL = process.env.BASE_URL;

export const shortenUrl = async (req, res) => {
  const { url } = req.body;

  if (!validUrl.isUri(url))
    return res.status(400).json({ error: "Invalid URL" });

  try {
    let shortCode = nanoid();
    const shortUrl = `${BASE_URL}/${shortCode}`;

    const existing = await Url.findOne({ originalUrl: url });
    if (existing)
      return res.json({ shortUrl: `${BASE_URL}/${existing.shortCode}` });

    await Url.create({ originalUrl: url, shortCode });
    res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const redirectToOriginal = async (req, res) => {
  const code = req.params.code;

  try {
    const url = await Url.findOne({ shortCode: code });
    if (!url) return res.status(404).json({ error: "Short URL not found" });

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ error: "Short URL expired" });
    }

    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
