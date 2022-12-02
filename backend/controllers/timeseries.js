const timeseriesRouter = require("express").Router();

const axios = require("axios");

timeseriesRouter.post("/", async (request, response) => {
  const { symbol, chartInterval } = request.body;

  const options = {
    method: "GET",
    url: `https://api.twelvedata.com/time_series`,
    params: {
      country: "USA",
      interval: `${chartInterval}`,
      symbol: `${symbol}`,
    },
    headers: {
      "Accept-Encoding": "json",
      Authorization: `apikey ${process.env.TWELVE_KEY}`,
    },
  };

  const timeseries = await axios.request(options);

  if (timeseries.data.code === 400) {
    return response.status(400).json({
      error: "asset with that symbol wasn't found",
    });
  }

  if (timeseries.data.code === 401) {
    return response.status(401).json({
      error: "unauthorized request, check validity of an api key",
    });
  }

  if (timeseries.data.code === 429) {
    return response.status(429).json({
      error: "too many requests, reached api limit (5/minute 800/day)",
    });
  }

  response.json(timeseries.data);
});

module.exports = timeseriesRouter;