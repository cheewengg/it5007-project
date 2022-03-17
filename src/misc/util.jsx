export const dateRangeMapping = {
  "5D": 5,
  "1M": 20,
  "6M": 20 * 6,
  "1Y": 261,
  Max: 100000,
};

export const lookBackRangeMapping = {
  "1D": 1,
  "5D": 5,
  "15D": 15,
  "30D": 30,
  "90D": 90,
};

export const generatePrimaryHeaderData = (primaryData) => {
  const { ticker, ric, name, benchmark_index, primaryChartData } = primaryData;

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
    benchmark_index,
    mostRecentDate,
    mostRecentPrice: rightBound,
    differenceAbs,
    differencePercent,
  };
};

export const graphQLFetch = async (query, variables = {}) => {
  try {
    const response = await fetch("/graphql", {
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
