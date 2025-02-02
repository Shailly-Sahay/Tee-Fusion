import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import FormData from "form-data"; // ✅ Import FormData

dotenv.config();

const router = express.Router();

// ✅ Enable CORS and JSON parsing
router.use(cors());
router.use(express.json());

// ✅ Debugging: Check if API key is loaded
console.log(
  "Stability AI API Key:",
  process.env.STABILITY_AI_KEY ? "Loaded" : "Missing"
);

// GET request (for testing the route)
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Stability AI Image Generator" });
});

// ✅ POST request (to generate an image)
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    console.log("Backend received prompt:", prompt);

    // ✅ Create a `FormData` object to send `multipart/form-data`
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("width", "512"); // Image width
    formData.append("height", "512"); // Image height
    formData.append("steps", "30"); // Number of steps
    formData.append("cfg_scale", "7"); // Controls how much the prompt is followed
    formData.append("samples", "1"); // Number of images to generate
    formData.append("style_preset", "enhance"); // Style preset

    // ✅ Call Stability AI API
    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_AI_KEY}`,
          Accept: "application/json", // ✅ Fixed Accept Header
          ...formData.getHeaders(), // ✅ Attach correct headers for FormData
        },
        body: formData, // ✅ Send as multipart/form-data
      }
    );

    const data = await response.json();
    console.log("Stability AI API response:", data);

    if (data.errors) {
      return res
        .status(500)
        .json({ message: "Error from Stability AI", error: data.errors });
    }

    // ✅ Stability AI returns an array of images
    const imageUrl = data.image || null; // Stability AI returns Base64, not a URL

    if (!imageUrl) {
      return res.status(500).json({ message: "Image generation failed" });
    }

    res
      .status(200)
      .json({ photo: imageUrl, message: "Image generated successfully!" });
  } catch (err) {
    console.error("Error generating image:", err);
    res
      .status(500)
      .json({ message: "Something went wrong :(", error: err.message });
  }
});

export default router;
