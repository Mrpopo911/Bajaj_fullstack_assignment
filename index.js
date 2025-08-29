const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL = "ABCD123";

// Function to alternate caps in reverse string
function alternatingCaps(str) {
  let res = "";
  let upper = true;
  for (let ch of str) {
    res += upper ? ch.toUpperCase() : ch.toLowerCase();
    upper = !upper;
  }
  return res;
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let concat_alpha = [];
    let total_sum = 0;

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // numeric string
        let num = parseInt(item, 10);
        total_sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // alphabetic string
        alphabets.push(item.toUpperCase());
        concat_alpha.push(item);
      } else {
        // special character(s)
        special_characters.push(item);
      }
    });

    // Build concat string (reverse + alternating caps)
    let concatStr = concat_alpha.reverse().join("");
    concatStr = alternatingCaps(concatStr);

    res.json({
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: total_sum.toString(),
      concat_string: concatStr,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

// Default GET route
app.get("/", (req, res) => {
  res.send("API is running Use POST /bfhl");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

