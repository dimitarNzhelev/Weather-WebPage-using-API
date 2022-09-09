const express = require("express");
const app = express();
const https = require("https");
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const City = req.body.city;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    City +
    "&appid=3c6d7e879b80df5420cedafdd00129fc&units=metric";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in " + City + " is " + temp + " degrees</h1>"
      );
      res.write("<p>The weather is currently " + weatherDescription + ".</p>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
