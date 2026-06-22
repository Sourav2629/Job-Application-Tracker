const axios = require('axios');

// --- Free Gemini model ---------------------------------------------------
// gemini-2.5-flash-lite is on Google's free tier (generous daily quota).
// If you ever get a "model not found" (404) error, Google has changed the
// free lineup — check https://ai.google.dev/gemini-api/docs/models and just
// update this one string. Nothing else needs to change.
const GEMINI_MODEL = 'gemini-2.5-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// @desc    Turn a pasted job description into structured fields
// @route   POST /api/ai/parse-job
// @access  Private
exports.parseJob = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please paste a longer job description (at least 20 characters).'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'AI is not configured on the server (GEMINI_API_KEY is missing).'
      });
    }

    const prompt = `You extract structured data from a job posting.
Read the job description below and return ONLY a JSON object — no markdown, no backticks, no explanation — with exactly these keys:
{
  "companyName": string,   // hiring company, "" if not found
  "role": string,          // job title, "" if not found
  "location": string,      // city/country or "Remote", "" if not found
  "salary": string,        // pay or salary range exactly as written, "" if not found
  "notes": string          // 1-2 short sentences summarising the key requirements/responsibilities
}

Job description:
"""
${description}
"""`;

    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
        // Ask Gemini to return strict JSON so parsing is reliable
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        },
        timeout: 20000
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Strip stray code fences just in case the model adds them
    const cleaned = text.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return res.status(502).json({
        success: false,
        message: 'AI returned an unexpected format. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        companyName: parsed.companyName || '',
        role: parsed.role || '',
        location: parsed.location || '',
        salary: parsed.salary || '',
        notes: parsed.notes || ''
      }
    });
  } catch (err) {
    const status = err.response?.status;

    if (status === 429) {
      return res.status(429).json({
        success: false,
        message: 'AI rate limit reached on the free tier. Wait a minute and try again.'
      });
    }
    if (status === 404) {
      return res.status(500).json({
        success: false,
        message: 'AI model not found — the model name may have changed. Update GEMINI_MODEL in controllers/ai.js.'
      });
    }

    console.error('Gemini parse error:', err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to analyse the job description. Please try again.'
    });
  }
};
