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

export const generateChartOptions = ({
  chartColors,
  vAxisFormat,
  dualYAxis,
  series,
}) => {
  const vAxisConfig = {
    baselineColor: "#555",
    format: vAxisFormat,
    gridlines: { color: "transparent" },
    minorGridlines: { color: "transparent" },
    textStyle: {
      color: "#495057",
      fontName: "Rubik",
      fontSize: 14,
    },
  };

  const vAxes = dualYAxis
    ? { 0: vAxisConfig, 1: vAxisConfig }
    : { 0: vAxisConfig };

  return {
    colors: chartColors,
    curveType: "function",
    crosshair: {
      color: "#495057",
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
        color: "#495057",
        fontName: "Rubik",
        fontSize: 14,
      },
    },
    height: "200px",
    legend: { position: "none" },
    series,
    vAxes,
    tooltip: {
      textStyle: {
        bold: false,
        color: "#495057",
        fontName: "Rubik",
        fontSize: 14,
      },
    },
    width: "100%",
  };
};
