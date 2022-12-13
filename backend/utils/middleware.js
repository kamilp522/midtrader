const axios = require("axios");

const parseBetas = (longBeta, shortBeta) => {
  const parsedLongBeta = Number(longBeta.toFixed(2));
  const parsedShortBeta = Number(shortBeta.toFixed(2));

  return {
    longBeta: parsedLongBeta,
    shortBeta: parsedShortBeta,
  };
};

const getBetaRatio = (longBeta, shortBeta) => {
  return Number((longBeta / shortBeta).toFixed(2));
};

const calculatePairsTradeCapital = (ratio, capital) => {
  const longCapital = Number((capital / (1 + ratio)).toFixed());
  const shortCapital = Number((longCapital * ratio).toFixed());

  return { longCapital, shortCapital };
};

const getHolidays = async () => {
  const currentYear = new Date().getFullYear();
  const holidays = [];
  const yearsOfHolidays = 5;

  for (let i = 0; i < yearsOfHolidays; i++) {
    const holidaysResponse = await axios.request(
      setHolidaysOptions(currentYear - i)
    );

    if (holidaysResponse.data.status === 400) {
      return response.status(400).json({
        error: "holidays api couldn't fetch data correctly",
      });
    }

    for (let j = 0; j < holidaysResponse.data.length; j++) {
      holidays.push(holidaysResponse.data[j].date);
    }
  }

  const holidaysParsed = parseHolidays(holidays);
  return holidaysParsed;
};

const setHolidaysOptions = (year) => {
  return {
    method: "GET",
    url: `https://public-holiday.p.rapidapi.com/${year}/US`,
    headers: {
      "Accept-Encoding": "json",
      "X-RapidAPI-Key": process.env.RAPID_KEY,
      "X-RapidAPI-Host": "public-holiday.p.rapidapi.com",
    },
  };
};

const parseHolidays = (array) => {
  const holidaysParsed = array.map((holiday) => {
    const monthDay = holiday.slice(-5);
    const year = `-${holiday.slice(0, 4)}`;
    const dateWithBacktis = (monthDay + year).split("-").join("/");
    const dateNoLeadingZeros = dateWithBacktis.replace(/(^|\/)0+/g, "$1");

    return dateNoLeadingZeros;
  });
  return holidaysParsed;
};

module.exports = {
  parseBetas,
  getBetaRatio,
  calculatePairsTradeCapital,
  getHolidays,
};