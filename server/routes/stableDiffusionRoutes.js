import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const router = express.Router();
const apiKey = process.env.STABLE_DIFFUSION_API_KEY;
const apiUrl = "https://stablediffusionapi.com/api/v3/text2img";

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: apiKey,
        prompt: prompt,
        width: "1024",
        height: "1024",
        samples: "1",
      }),
    };
    const aiResponse = await fetch(apiUrl, requestOptions);
    const image = await aiResponse.text();

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

export default router;
