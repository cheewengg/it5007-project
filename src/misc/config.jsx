// "#37b24d"
export const generateOptions = ({ title, darkTheme, upslope }) => {
  const chartColor = upslope ? "#37b24d" : "#f03e3e";
  const backgroundColor = darkTheme ? "#171a1d" : "";
  const gridLineColor = darkTheme ? "#495057" : "transparent";
  const axisLabelColor = darkTheme ? "#ced4da" : "#495057";
  const crossHairColor = darkTheme ? "#ced4da" : "#495057";

  return {
    title: title,
    legend: { position: "bottom" },
    areaOpacity: 0.1,
    backgroundColor: { fill: backgroundColor },
    colors: [chartColor],
    crosshair: {
      trigger: "focus",
      color: crossHairColor,
      orientation: "vertical",
      opacity: 0.3,
    },
    hAxis: {
      gridlines: { color: "transparent" },
      minorGridlines: { color: "transparent" },
      textStyle: { color: axisLabelColor },
    },
    vAxis: {
      gridlines: { color: gridLineColor },
      minorGridlines: { color: "transparent" },
      textStyle: { color: axisLabelColor },
    },
  };
};
