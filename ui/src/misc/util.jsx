export const dateRangeMap = {
  "5D": 5,
  "1M": 20,
  "6M": 20 * 6,
  "1Y": 261,
  MAX: 100000,
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
// animation: {
//   startup: true,
//   easing: "out",
//   duration: 300,
// },

export const generateChartOptions = ({
  chartColors,
  darkTheme,
  upSlope,
  vAxisFormat,
}) => {
  const axisLabelColor = darkTheme ? "#ced4da" : "#495057";
  const backgroundColor = darkTheme ? "#171a1d" : "";
  // const colors =
  //   upSlope === undefined ? chartColors : upSlope ? ["#37b24d"] : ["#f03e3e"];
  const crossHairColor = darkTheme ? "#ced4da" : "#495057";
  const gridLineColor = darkTheme ? "#495057" : "transparent";

  return {
    backgroundColor: { fill: backgroundColor },
    colors: chartColors,
    crosshair: {
      color: crossHairColor,
      opacity: 0.3,
      orientation: "vertical",
      trigger: "focus",
    },
    focusTarget: "category",
    hAxis: {
      format: "MMM y",
      gridlines: { color: "transparent" },
      minorGridlines: { color: "transparent" },
      showTextEvery: 30,
      textStyle: { color: axisLabelColor, fontName: "Rubik", fontSize: 14 },
      viewWindowMode: "maximized",
    },
    height: "200px",
    legend: { position: "none" },
    vAxis: {
      format: vAxisFormat,
      gridlines: { color: gridLineColor },
      minorGridlines: { color: "transparent" },
      textStyle: { color: axisLabelColor, fontName: "Rubik", fontSize: 14 },
    },
    width: "100%",
  };
};

export const primaryChartOptions = generateChartOptions({
  chartColors: ["#4263eb"],
  darkTheme: false,
  vAxisFormat: "short",
});

export const secondaryChartPxOptions = generateChartOptions({
  chartColors: ["#4263eb", "#f03e3e"],
  darkTheme: false,
});

export const secondaryChartVolOptions = generateChartOptions({
  chartColors: ["#4263eb"],
  darkTheme: false,
});
