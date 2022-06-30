function jsonDateReviver(key, value) {
  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function IssueRow(props) {
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.visualize), /*#__PURE__*/React.createElement("td", null, issue.event_name), /*#__PURE__*/React.createElement("td", null, issue.country), /*#__PURE__*/React.createElement("td", null, issue.ticker), /*#__PURE__*/React.createElement("td", null, issue.name), /*#__PURE__*/React.createElement("td", null, new Date(issue.prediction_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, new Date(issue.announcement_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, new Date(issue.trade_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, issue.days_to_announcement), /*#__PURE__*/React.createElement("td", null, issue.conviction), /*#__PURE__*/React.createElement("td", null, issue.side), /*#__PURE__*/React.createElement("td", null, '$' + issue.demand_usd.toFixed(2)), /*#__PURE__*/React.createElement("td", null, issue.demand_shares.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), /*#__PURE__*/React.createElement("td", null, issue.demand_adv.toFixed(2)), /*#__PURE__*/React.createElement("td", null, new Date(issue.exp_reporting_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, issue.benchmark_index), /*#__PURE__*/React.createElement("td", null, issue.creator));
}

function IssueTable(props) {
  function chartingSubmit(e, issues) {
    e.preventDefault();
    new Charting().updateChart(issues);
  } // add visualization button


  for (let i = 0; i < props.issues.length; i++) {
    props.issues[i].id = i + 1;
    props.issues[i].visualize = /*#__PURE__*/React.createElement("button", {
      onClick: e => chartingSubmit(e, issues = props.issues[i])
    }, "Visualize");
  } // add main rows with data


  const issueRows = props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  })); // add sorting columns functionality

  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) => v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2))(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

  document.querySelectorAll('th').forEach(th => th.addEventListener('click', () => {
    const table = th.closest('table');
    const tbody = table.querySelector('tbody');
    Array.from(tbody.querySelectorAll('tr')).sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc)).forEach(tr => tbody.appendChild(tr));
  }));
  return /*#__PURE__*/React.createElement("table", {
    id: "rebalanceTable",
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", {
    bgcolor: "DarkGrey"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Charting"), /*#__PURE__*/React.createElement("th", null, "Event Name"), /*#__PURE__*/React.createElement("th", null, "Country"), /*#__PURE__*/React.createElement("th", null, "Ticker"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Review Cut-Off Date"), /*#__PURE__*/React.createElement("th", null, "Announcement Date"), /*#__PURE__*/React.createElement("th", null, "Trade Date"), /*#__PURE__*/React.createElement("th", null, "Days to Announce"), /*#__PURE__*/React.createElement("th", null, "Conviction"), /*#__PURE__*/React.createElement("th", null, "Side"), /*#__PURE__*/React.createElement("th", null, "Demand USD $m"), /*#__PURE__*/React.createElement("th", null, "Demand Shares"), /*#__PURE__*/React.createElement("th", null, "Days to Trade"), /*#__PURE__*/React.createElement("th", null, "Exp Reporting Date"), /*#__PURE__*/React.createElement("th", null, "Benchmark"), /*#__PURE__*/React.createElement("th", null, "Creator"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

function FilterTable() {
  let table, rows, cells;
  let event, eventFilter, eventBool;
  let country, countryFilter, countryBool;
  let creator, creatorFilter, creatorBool;
  table = document.getElementById("rebalanceTable");
  rows = table.getElementsByTagName('tr');
  eventFilter = document.getElementById("eventDropdown").value;
  countryFilter = document.getElementById("countryDropdown").value;
  creatorFilter = document.getElementById("creatorDropdown").value;

  for (let row of rows) {
    cells = row.getElementsByTagName("td");
    event = cells[2] || null; // be careful, identification of value is index-based (idx)

    country = cells[3] || null;
    creator = cells[17] || null;
    eventBool = eventFilter === "All Events" || !event || eventFilter === event.textContent;
    countryBool = countryFilter === "All Countries" || !country || countryFilter === country.textContent;
    creatorBool = creatorFilter === "All Creators" || !creator || creatorFilter === creator.textContent;

    if (eventBool && countryBool && creatorBool) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

function DropdownOptions({
  options
}) {
  return options.map(option => /*#__PURE__*/React.createElement("option", {
    key: option.id,
    value: option.value
  }, option.value));
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }

    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

function plotLineChart(tickerData, benchmarkData) {
  if (Chart.getChart('lineChart')) {
    Chart.getChart('lineChart').destroy();
  }

  var yTickerBenchmarkRatio = []; // Calculate Ticker / Benchmark Price Ratio 

  var yTickerBenchmarkRatioNormalized = []; // Normalized (by Factor 100)

  for (let i = 0; i < tickerData.px_last.length; i++) {
    yTickerBenchmarkRatio.push(tickerData.px_last[i] / benchmarkData.px_last[i]);
  }

  for (let i = 0; i < yTickerBenchmarkRatio.length; i++) {
    yTickerBenchmarkRatioNormalized.push(yTickerBenchmarkRatio[i] * 100 / yTickerBenchmarkRatio[0]);
  }

  const data = {
    labels: tickerData.stringDates,
    datasets: [{
      type: 'line',
      label: tickerData.ticker,
      yAxisID: 'Price',
      backgroundColor: 'Blue',
      borderColor: 'Blue',
      data: tickerData.px_last,
      hidden: true
    }, {
      type: 'line',
      label: benchmarkData.ticker,
      yAxisID: 'BenchmarkPrice',
      backgroundColor: 'Red',
      borderColor: 'Red',
      borderDash: [5, 8],
      pointRadius: 0,
      data: benchmarkData.px_last,
      hidden: true
    }, {
      type: 'line',
      label: 'Ticker/Benchmark Price Ratio',
      yAxisID: 'TickerBenchmarkRatio',
      backgroundColor: 'Green',
      borderColor: 'Green',
      data: yTickerBenchmarkRatioNormalized,
      hidden: false
    }, {
      type: 'bar',
      label: 'Ticker Volume',
      yAxisID: 'Volume',
      backgroundColor: 'Grey',
      data: tickerData.px_volume,
      hidden: false
    }]
  };
  const config = {
    data: data,
    options: {
      scales: {
        Price: {
          type: 'linear',
          position: 'left',
          ticks: {
            display: false
          },
          title: {
            display: false
          }
        },
        BenchmarkPrice: {
          type: 'linear',
          position: 'left',
          title: {
            display: false,
            text: 'Benchmark Price (' + benchmarkData.currency + ')'
          },
          ticks: {
            display: false
          }
        },
        TickerBenchmarkRatio: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Ticker/Benchmark Ratio'
          }
        },
        Volume: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Ticker Volume'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: tickerData.ticker + ' (Side = ' + tickerData.side + ')',
          maintainAspectRatio: false,
          responsive: true
        },
        legend: {
          onClick: function (e, legendItem) {
            var idx = legendItem.datasetIndex;
            var scalesName = Object.keys(this.chart.config.options.scales)[idx];
            this.chart.config.data.datasets[idx].hidden = !this.chart.config.data.datasets[idx].hidden;
            this.chart.config.options.scales[scalesName].ticks.display = !this.chart.config.options.scales[scalesName].ticks.display;
            this.chart.config.options.scales[scalesName].title.display = !this.chart.config.options.scales[scalesName].title.display;
            this.chart.update();
          }
        }
      }
    }
  };
  new Chart(document.getElementById('lineChart'), config);
}

function plotExcessVolume(tickerData) {
  if (Chart.getChart('excessVolumeChart')) {
    Chart.getChart('excessVolumeChart').destroy();
  }

  var lookbackStDt = new Date(tickerData.announcement_date * 1000).addDays(-240).getTime() / 1000;
  var lookbackEndDt = new Date(tickerData.announcement_date * 1000).addDays(-180).getTime() / 1000;
  var maxVertical = 0;
  var averageVolume = [];

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  for (let i = 0; i < tickerData.date.length; i++) {
    if (tickerData.date[i] >= lookbackStDt && tickerData.date[i] <= lookbackEndDt) {
      averageVolume.push(tickerData.px_volume[i]);
    }

    if (tickerData.px_volume[i] > maxVertical) {
      maxVertical = tickerData.px_volume[i];
    }
  }

  averageVolume = average(averageVolume);
  var excessVolDaily = [];
  var originalVolDaily = [];
  var excessVolCumulative = [];
  var excessVolCumulativeTotal = 0;
  var averageHorizontalLine = [];
  var controlStartPos = Infinity;
  var controlEndPos = Infinity;
  var predictionPos = tickerData.completeDates.length;
  var announcePos = tickerData.completeDates.length;
  var tradePos = tickerData.completeDates.length;
  var controlStartVerticalBar = [];
  var controlEndVerticalBar = [];
  var predictionVerticalBar = [];
  var announceVerticalBar = [];
  var tradeVerticalBar = [];

  for (let i = 0; i < tickerData.completeDates.length; i++) {
    if (tickerData.completeDates[i] > lookbackEndDt && Math.sign(tickerData.pctChgvsIdx[i]) == Math.sign(tickerData.side)) {
      excessVolDaily.push(tickerData.px_volume[i] - averageVolume);
      excessVolCumulativeTotal = excessVolCumulativeTotal + (tickerData.px_volume[i] - averageVolume);
      excessVolCumulative.push(excessVolCumulativeTotal);
      originalVolDaily.push(tickerData.px_volume[i]);
    } else {
      excessVolDaily.push(0);
      excessVolCumulative.push(0);
      originalVolDaily.push(tickerData.px_volume[i]);
    }

    if (tickerData.completeDates[i] >= lookbackStDt && i < controlStartPos) {
      controlStartPos = i;
    }

    if (tickerData.completeDates[i] >= lookbackEndDt && i < controlEndPos) {
      controlEndPos = i;
    }

    if (tickerData.completeDates[i] >= tickerData.prediction_date && i < predictionPos) {
      predictionPos = i;
    }

    if (tickerData.completeDates[i] >= tickerData.announcement_date && i < announcePos) {
      announcePos = i;
    }

    if (tickerData.completeDates[i] >= tickerData.trade_date && i < tradePos) {
      tradePos = i;
    }

    averageHorizontalLine.push(averageVolume);
    controlStartVerticalBar.push(null);
    controlEndVerticalBar.push(null);
    predictionVerticalBar.push(null);
    announceVerticalBar.push(null);
    tradeVerticalBar.push(null);
  }

  controlStartVerticalBar[controlStartPos] = maxVertical;
  controlEndVerticalBar[controlEndPos] = maxVertical;
  predictionVerticalBar[predictionPos] = maxVertical;
  announceVerticalBar[announcePos] = maxVertical;
  tradeVerticalBar[tradePos] = maxVertical;
  controlStTitle = new Date(lookbackStDt * 1000).toLocaleDateString('en-US');
  controlEndTitle = new Date(lookbackEndDt * 1000).toLocaleDateString('en-US');
  tickerData.excessVolCumulative = excessVolCumulative;
  tickerData.controlStartVerticalBar = controlStartVerticalBar;
  tickerData.controlEndVerticalBar = controlEndVerticalBar;
  tickerData.predictionVerticalBar = predictionVerticalBar;
  tickerData.announceVerticalBar = announceVerticalBar;
  tickerData.tradeVerticalBar = tradeVerticalBar;
  const data = {
    labels: tickerData.stringDates,
    datasets: [{
      type: 'bar',
      label: 'Ticker Excess Volume',
      yAxisID: 'Volume',
      backgroundColor: 'Black',
      data: excessVolDaily,
      hidden: false
    }, {
      type: 'bar',
      label: 'Ticker Original Volume',
      backgroundColor: 'Grey',
      data: originalVolDaily
    }, {
      type: 'line',
      label: '3 Mth Average Volume',
      backgroundColor: 'Aqua',
      data: averageHorizontalLine,
      borderWidth: 1,
      pointRadius: 1
    }, {
      type: 'bar',
      label: 'Control Period Start',
      backgroundColor: 'Green',
      data: tickerData.controlStartVerticalBar
    }, {
      type: 'bar',
      label: 'Control Period End',
      backgroundColor: 'Green',
      data: tickerData.controlEndVerticalBar
    }, {
      type: 'bar',
      label: 'Prediction Date',
      backgroundColor: 'Magenta',
      data: tickerData.predictionVerticalBar
    }, {
      type: 'bar',
      label: 'Announcement Date',
      backgroundColor: 'Red',
      data: tickerData.announceVerticalBar
    }, {
      type: 'bar',
      label: 'Trade Date',
      backgroundColor: 'Blue',
      data: tickerData.tradeVerticalBar
    }]
  };
  const config = {
    data: data,
    options: {
      scales: {
        Volume: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Ticker Volume'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "3 Month Excess Volume Analysis [Control Period: " + controlStTitle + " to " + controlEndTitle,
          maintainAspectRatio: false,
          responsive: true
        },
        legend: {
          onClick: function (e, legendItem) {
            var idx = legendItem.datasetIndex;
            var scalesName = Object.keys(this.chart.config.options.scales)[idx];
            this.chart.config.data.datasets[idx].hidden = !this.chart.config.data.datasets[idx].hidden;
            this.chart.config.options.scales[scalesName].ticks.display = !this.chart.config.options.scales[scalesName].ticks.display;
            this.chart.config.options.scales[scalesName].title.display = !this.chart.config.options.scales[scalesName].title.display;
            this.chart.update();
          }
        }
      }
    }
  };
  new Chart(document.getElementById('excessVolumeChart'), config);
}

function plotExcessVolumeCumulative(tickerData) {
  if (Chart.getChart('excessVolumeCumulativeChart')) {
    Chart.getChart('excessVolumeCumulativeChart').destroy();
  }

  var excessVolCumulativePadded = [0];
  var previous = 0;

  for (let i = 1; i < tickerData.excessVolCumulative.length; i++) {
    if (tickerData.excessVolCumulative[i] == 0 && tickerData.completeDates[i] <= tickerData.date[tickerData.date.length - 1]) {
      excessVolCumulativePadded.push(previous);
    } else {
      excessVolCumulativePadded.push(tickerData.excessVolCumulative[i]);
      previous = excessVolCumulativePadded[i];
    }
  }

  tickerData.excessVolCumulativePadded = excessVolCumulativePadded;
  const data = {
    labels: tickerData.stringDates,
    datasets: [{
      type: 'bar',
      label: 'Ticker Volume',
      yAxisID: 'Volume',
      backgroundColor: 'Black',
      data: tickerData.excessVolCumulativePadded,
      hidden: false
    }]
  };
  const config = {
    data: data,
    options: {
      scales: {
        Volume: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Ticker Volume'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "3 Month Excess Volume Cumulative Analysis",
          maintainAspectRatio: false,
          responsive: true
        },
        legend: {
          onClick: function (e, legendItem) {
            var idx = legendItem.datasetIndex;
            var scalesName = Object.keys(this.chart.config.options.scales)[idx];
            this.chart.config.data.datasets[idx].hidden = !this.chart.config.data.datasets[idx].hidden;
            this.chart.config.options.scales[scalesName].ticks.display = !this.chart.config.options.scales[scalesName].ticks.display;
            this.chart.config.options.scales[scalesName].title.display = !this.chart.config.options.scales[scalesName].title.display;
            this.chart.update();
          }
        }
      }
    }
  };
  new Chart(document.getElementById('excessVolumeCumulativeChart'), config);
}

class Charting extends React.Component {
  constructor() {
    super();
  }

  async updateChart(issue) {
    var ticker = issue.ticker;
    var benchmark = issue.benchmark_index;
    const tickerQuery = `mutation queryData($ticker: String) {
      queryData(ticker: $ticker) {
        ticker 
        currency
        date
        px_last
        px_volume
      }
    }`;
    const benchmarkQuery = `mutation queryData($ticker: String) {
      queryData(ticker: $ticker) {
        ticker 
        currency
        date
        px_last
        px_volume
      }
    }`;
    var tickerData = await graphQLFetch(tickerQuery, {
      ticker: ticker
    });
    var benchmarkData = await graphQLFetch(benchmarkQuery, {
      ticker: benchmark
    });
    tickerData = tickerData.queryData;
    benchmarkData = benchmarkData.queryData;
    tickerData.prediction_date = issue.prediction_date;
    tickerData.announcement_date = issue.announcement_date;
    tickerData.trade_date = issue.trade_date;
    tickerData.side = issue.side;
    var starting_point = tickerData.px_last.length - tickerData.date.length;
    benchmarkData.px_last = benchmarkData.px_last.slice(starting_point);
    benchmarkData.date = benchmarkData.date.slice(starting_point);
    tickerData.date = tickerData.date.slice(starting_point);
    var tickerPctChg = [null];
    var benchmarkPctChg = [null];

    for (let i = 0; i < tickerData.date.length; i++) {
      if (i >= 1 && i != tickerData.date.length) {
        tickerPctChg.push((tickerData.px_last[i] - tickerData.px_last[i - 1]) / tickerData.px_last[i - 1]);
        benchmarkPctChg.push((benchmarkData.px_last[i] - benchmarkData.px_last[i - 1]) / benchmarkData.px_last[i - 1]);
      }
    }

    var pctChgvsIdx = [null];

    for (let i = 1; i < tickerPctChg.length; i++) {
      pctChgvsIdx.push(tickerPctChg[i] - benchmarkPctChg[i]);
    }

    Date.prototype.addDays = function (days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    };

    var completeDates = [];
    var stringDates = [];
    var currDate = new Date(tickerData.date[tickerData.date.length - 1] * 1000);
    var stopDate = new Date(tickerData.trade_date * 1000).addDays(15);
    var counter = 0;

    while (currDate <= stopDate) {
      if (counter < tickerData.date.length) {
        completeDates.push(tickerData.date[counter]);
        stringDates.push(new Date(tickerData.date[counter] * 1000).toLocaleDateString('en-US'));
      } else {
        if (currDate.getDay() != 0 && currDate.getDay() != 6) {
          completeDates.push(currDate.getTime() / 1000);
          stringDates.push(currDate.toLocaleDateString('en-US'));
        }

        currDate = currDate.addDays(1);
      }

      counter = counter + 1;
    }

    tickerData.completeDates = completeDates;
    tickerData.stringDates = stringDates;
    tickerData.pctChg = tickerPctChg;
    tickerData.pctChgvsIdx = pctChgvsIdx;
    benchmarkData.stringDates = stringDates;
    benchmarkData.pctChg = benchmarkPctChg;
    plotLineChart(tickerData, benchmarkData);
    plotExcessVolume(tickerData);
    plotExcessVolumeCumulative(tickerData);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("canvas", {
      id: "lineChart",
      width: "200",
      height: "100",
      "aria-label": "lineChart",
      role: "img"
    }), /*#__PURE__*/React.createElement("canvas", {
      id: "excessVolumeChart",
      width: "200",
      height: "100",
      "aria-label": "excessVolumeChart",
      role: "img"
    }), /*#__PURE__*/React.createElement("canvas", {
      id: "excessVolumeCumulativeChart",
      width: "200",
      height: "100",
      "aria-label": "excessVolumeCumulativeChart",
      role: "img"
    }));
  }

}

class EventFilter extends React.Component {
  render() {
    var eventSet = new Set();
    var eventOptions = [{
      id: 0,
      value: 'All Events'
    }];
    var m = 1;

    for (let i = 0; i < this.props.issues.length; i++) {
      eventSet.add(this.props.issues[i].event_name);
    }

    for (const item of Array.from(eventSet).sort()) {
      eventOptions.push({
        id: m,
        value: item
      });
      m++;
    }

    return /*#__PURE__*/React.createElement("select", {
      id: "eventDropdown",
      onInput: FilterTable
    }, /*#__PURE__*/React.createElement(DropdownOptions, {
      options: eventOptions
    }));
  }

}

class CountryFilter extends React.Component {
  render() {
    var countrySet = new Set();
    var countryOptions = [{
      id: 0,
      value: 'All Countries'
    }];
    var m = 1;

    for (let i = 0; i < this.props.issues.length; i++) {
      countrySet.add(this.props.issues[i].country);
    }

    for (const item of Array.from(countrySet).sort()) {
      countryOptions.push({
        id: m,
        value: item
      });
      m++;
    }

    return /*#__PURE__*/React.createElement("select", {
      id: "countryDropdown",
      onInput: FilterTable
    }, /*#__PURE__*/React.createElement(DropdownOptions, {
      options: countryOptions
    }));
  }

}

class CreatorFilter extends React.Component {
  render() {
    var creatorSet = new Set();
    var creatorOptions = [{
      id: 0,
      value: 'All Creators'
    }];
    var m = 1;

    for (let i = 0; i < this.props.issues.length; i++) {
      creatorSet.add(this.props.issues[i].creator);
    }

    for (const item of Array.from(creatorSet).sort()) {
      creatorOptions.push({
        id: m,
        value: item
      });
      m++;
    }

    return /*#__PURE__*/React.createElement("select", {
      id: "creatorDropdown",
      onInput: FilterTable
    }, /*#__PURE__*/React.createElement(DropdownOptions, {
      options: creatorOptions
    }));
  }

}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      tickerObj: {},
      benchmarkObj: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        event_name
        country
        ticker
        name
        announcement_date
        trade_date
        prediction_date
        days_to_announcement
        conviction
        side
        demand_usd
        demand_shares
        demand_adv
        exp_reporting_date
        benchmark_index
        creator
      }
    }`;
    const data = await graphQLFetch(query);
    this.setState({
      issues: data.issueList
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Index Rebalance Watcher (Beta)"), /*#__PURE__*/React.createElement(Charting, null), /*#__PURE__*/React.createElement(EventFilter, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement(CountryFilter, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement(CreatorFilter, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));