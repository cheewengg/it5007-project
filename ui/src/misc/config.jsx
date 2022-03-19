export const generatePrimaryChartOptions = ({ darkTheme, upslope }) => {
  const chartColor = upslope ? "#37b24d" : "#f03e3e";
  const backgroundColor = darkTheme ? "#171a1d" : "";
  const gridLineColor = darkTheme ? "#495057" : "transparent";
  const axisLabelColor = darkTheme ? "#ced4da" : "#495057";
  const crossHairColor = darkTheme ? "#ced4da" : "#495057";

  return {
    legend: { position: "bottom" },
    areaOpacity: 0.1,
    backgroundColor: { fill: backgroundColor },
    colors: [chartColor],
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
    tooltip: {
      showColorCode: false,
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

export const generateSecondaryChartOptions = ({ darkTheme }) => {
  const backgroundColor = darkTheme ? "#171a1d" : "";
  const gridLineColor = darkTheme ? "#495057" : "transparent";
  const axisLabelColor = darkTheme ? "#ced4da" : "#495057";
  const crossHairColor = darkTheme ? "#ced4da" : "#495057";

  return {
    backgroundColor: { fill: backgroundColor },
    crosshair: {
      trigger: "focus",
      color: crossHairColor,
      orientation: "vertical",
      opacity: 0.3,
    },
    curveType: "function",
    legend: { position: "bottom" },
    width: "100%",
    height: "200px",
    focusTarget: "category",
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
  };
};
