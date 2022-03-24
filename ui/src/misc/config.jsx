import { generateChartOptions } from "./util.jsx";
import {
  searchPrimaryData,
  searchSecondaryDataPx,
  searchSecondaryDataVol,
} from "./search.jsx";

export const DEFAULT_QUERY = "114090 KS Equity";

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

export const searchPrimaryDataConfig = {
  searchData: searchPrimaryData,
  dateRange: 100000,
};

export const searchSecondaryDataPxConfig = {
  searchData: searchSecondaryDataPx,
  dateRange: 100000,
  lookBackDuration: 90,
};

export const searchSecondaryDataVolConfig = {
  searchData: searchSecondaryDataVol,
  dateRange: 100000,
  lookBackDuration: 1,
};

export const primaryChartOptions = generateChartOptions({
  darkTheme: false,
  vAxisFormat: "short",
  dualYAxis: true,
  series: {
    0: {
      type: "line",
      targetAxisIndex: 0,
      color: "#4263eb",
    },
    1: {
      type: "bars",
      targetAxisIndex: 1,
      color: "#868e96",
    },
  },
});

export const secondaryChartPxOptions = generateChartOptions({
  chartColors: ["#4263eb", "#f03e3e"],
  darkTheme: false,
});

export const secondaryChartVolOptions = generateChartOptions({
  darkTheme: false,
  series: {
    0: {
      type: "bars",
      targetAxisIndex: 0,
      color: "#4263eb",
    },
  },
});
