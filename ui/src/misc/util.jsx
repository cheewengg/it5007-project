export const dateRangeMap = {
  "5D": 5,
  "1M": 20,
  "6M": 20 * 6,
  "1Y": 261,
  Max: 100000,
};

export const lookBackRangePxMap = {
  "1D": 1,
  "5D": 5,
  "15D": 15,
  "30D": 30,
  "90D": 90,
};

export const lookBackRangeVolMap = {
  "1D": 1,
  "5D": 5,
  "10D": 10,
  "15D": 15,
  "20D": 20,
};

export const renderDate = (epochTime) => {
  const date = new Date(epochTime * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(year, month, day);
};

export const generatePrimaryHeaderData = (primaryData) => {
  const {
    ticker,
    ric,
    name,
    benchMarkIdx,
    currency,
    announcementDate,
    primaryChartData,
  } = primaryData;

  if (!ticker) return {};
  const mostRecentDate =
    primaryChartData[primaryChartData.length - 1][0].toString();
  const leftBound = primaryChartData[1][1];
  const rightBound = primaryChartData[primaryChartData.length - 1][1];

  const differenceAbs = (rightBound - leftBound).toFixed(2);
  const differencePercent = ((differenceAbs / leftBound) * 100).toFixed(2);

  return {
    ticker,
    ric,
    name,
    benchMarkIdx,
    currency,
    mostRecentDate,
    mostRecentPrice: rightBound,
    announcementDate: announcementDate.toString(),
    differenceAbs,
    differencePercent,
  };
};
// const chartColor = upslope ? "#37b24d" : "#f03e3e";
// areaOpacity: 0.1,
// colors: [chartColor],

export const generateChartOptions = ({ darkTheme }) => {
  const backgroundColor = darkTheme ? "#171a1d" : "";
  const gridLineColor = darkTheme ? "#495057" : "transparent";
  const axisLabelColor = darkTheme ? "#ced4da" : "#495057";
  const crossHairColor = darkTheme ? "#ced4da" : "#495057";

  return {
    legend: { position: "none" },
    backgroundColor: { fill: backgroundColor },
    focusTarget: "category",
    crosshair: {
      trigger: "focus",
      color: crossHairColor,
      orientation: "vertical",
      opacity: 0.3,
    },
    legend: {
      position: "none",
    },
    hAxis: {
      gridlines: { color: "transparent" },
      minorGridlines: { color: "transparent" },
      textStyle: { color: axisLabelColor },
      format: "MMM dd, y",
      showTextEvery: 2,
    },
    vAxis: {
      gridlines: { color: gridLineColor },
      minorGridlines: { color: "transparent" },
      textStyle: { color: axisLabelColor },
    },
    width: "100%",
    height: "200px",
  };
};

export const primaryChartOptions = generateChartOptions({
  darkTheme: false,
});

export const secondaryChartOptions = generateChartOptions({
  darkTheme: false,
});
