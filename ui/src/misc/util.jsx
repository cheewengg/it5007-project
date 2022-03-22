export const graphQLFetch = async (query, variables = {}) => {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == "BAD_USER_INPUT") {
        const details = error.extensions.errors.join("\n ");
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
};

export const formatDate = (epochTime) => {
  const date = new Date(epochTime * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(year, month, day);
};

export const formatFloat = (nbr) => parseFloat(nbr.toFixed(2));

export const renderDate = (epochTime) => {
  const date = new Date(epochTime * 1000);
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const displayDate = `${day}/${month}/${year}`;

  return displayDate;
};

export const generatePrimaryHeaderData = (primaryData) => {
  const {
    ticker,
    ric,
    companyName,
    benchmarkIdx,
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
    companyName,
    benchmarkIdx,
    currency,
    mostRecentDate,
    mostRecentPrice: rightBound.toFixed(2),
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
      textStyle: {
        color: axisLabelColor,
        fontName: "Rubik",
        fontSize: 14,
      },
    },
    height: "200px",
    legend: { position: "none" },
    vAxis: {
      baselineColor: "#555",
      format: vAxisFormat,
      gridlines: { color: gridLineColor },
      minorGridlines: { color: "transparent" },
      textStyle: {
        color: axisLabelColor,
        fontName: "Rubik",
        fontSize: 14,
      },
    },
    tooltip: {
      textStyle: {
        bold: false,
        color: axisLabelColor,
        fontName: "Rubik",
        fontSize: 14,
      },
    },
    width: "100%",
  };
};
