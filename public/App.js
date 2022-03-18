const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function IssueRow(props) {
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.visualize), /*#__PURE__*/React.createElement("td", null, issue.add_basket), /*#__PURE__*/React.createElement("td", null, issue.event_name), /*#__PURE__*/React.createElement("td", null, issue.country), /*#__PURE__*/React.createElement("td", null, issue.ticker), /*#__PURE__*/React.createElement("td", null, issue.name), /*#__PURE__*/React.createElement("td", null, issue.ticker_px_close_1D), /*#__PURE__*/React.createElement("td", null, new Date(issue.announcement_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, new Date(issue.trade_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, new Date(issue.prediction_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, issue.days_to_announcement), /*#__PURE__*/React.createElement("td", null, issue.conviction), /*#__PURE__*/React.createElement("td", null, issue.side), /*#__PURE__*/React.createElement("td", null, '$' + issue.demand_usd.toFixed(2)), /*#__PURE__*/React.createElement("td", null, issue.demand_shares.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), /*#__PURE__*/React.createElement("td", null, issue.demand_adv.toFixed(2)), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_1D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_5D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_30D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_90D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_1D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_5D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_30D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_90D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_ticker_30DpreA).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_30DpreA).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, issue.average_volume.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume1D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume5D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume15D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume30D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume1D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume5D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume15D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume30D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, new Date(issue.exp_reporting_date * 1000).toLocaleDateString('en-US')), /*#__PURE__*/React.createElement("td", null, issue.benchmark_index), /*#__PURE__*/React.createElement("td", null, issue.lookback_duration), /*#__PURE__*/React.createElement("td", null, issue.lookback_end_days_ago), /*#__PURE__*/React.createElement("td", null, issue.creator));
}

function IssueTable(props) {
  function chartingSubmit(e, ticker_name, benchmark_name, announcement_date) {
    e.preventDefault();

    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].ticker == ticker_name) {
        ticker_data = props.data[i];
      }

      if (props.data[i].ticker == benchmark_name) {
        benchmark_data = props.data[i];
      }
    }

    new Charting().updateChart(ticker_name, ticker_data, benchmark_name, benchmark_data, announcement_date);
  } // add visualization and shortlist buttons


  for (let i = 0; i < props.issues.length; i++) {
    props.issues[i].id = i + 1;
    props.issues[i].visualize = /*#__PURE__*/React.createElement("button", {
      onClick: e => chartingSubmit(e, ticker = props.issues[i].ticker, benchmark = props.issues[i].benchmark_index, announcement_date = props.issues[i].announcement_date)
    }, "Visualize");
    props.issues[i].add_basket = /*#__PURE__*/React.createElement("button", {
      onClick: e => Shortlist(e, ticker = props.issues[i].ticker)
    }, "Shortlist");
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
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Charting"), /*#__PURE__*/React.createElement("th", null, "Trade Basket"), /*#__PURE__*/React.createElement("th", null, "Event Name"), /*#__PURE__*/React.createElement("th", null, "Country"), /*#__PURE__*/React.createElement("th", null, "Ticker"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Last Px"), /*#__PURE__*/React.createElement("th", null, "Announcement Date"), /*#__PURE__*/React.createElement("th", null, "Trade Date"), /*#__PURE__*/React.createElement("th", null, "Prediction Date"), /*#__PURE__*/React.createElement("th", null, "Days to Announce"), /*#__PURE__*/React.createElement("th", null, "Conviction"), /*#__PURE__*/React.createElement("th", null, "Side"), /*#__PURE__*/React.createElement("th", null, "Demand USD $m"), /*#__PURE__*/React.createElement("th", null, "Demand Shares"), /*#__PURE__*/React.createElement("th", null, "Days to Trade"), /*#__PURE__*/React.createElement("th", null, "1D%Chg"), /*#__PURE__*/React.createElement("th", null, "5D%Chg"), /*#__PURE__*/React.createElement("th", null, "30D%Chg"), /*#__PURE__*/React.createElement("th", null, "90D%Chg"), /*#__PURE__*/React.createElement("th", null, "1D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "5D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "30D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "90D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "30D%Chg preA"), /*#__PURE__*/React.createElement("th", null, "30D%Chg preA vsIdx"), /*#__PURE__*/React.createElement("th", null, "Avg Volume"), /*#__PURE__*/React.createElement("th", null, "1Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "5Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "15Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "30Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "1Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "5Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "15Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "30Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "Exp Reporting Date"), /*#__PURE__*/React.createElement("th", null, "Benchmark"), /*#__PURE__*/React.createElement("th", null, "Benchmark Duration"), /*#__PURE__*/React.createElement("th", null, "Benchmark End (days ago)"), /*#__PURE__*/React.createElement("th", null, "Creator"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

class Charting extends React.Component {
  constructor() {
    super();
  }

  updateChart(new_ticker_name, new_ticker_data, new_benchmark_name, new_benchmark_data, announcement_date) {
    if (Chart.getChart('myChart')) {
      Chart.getChart('myChart').destroy();
    }

    var xValues = [];
    var offset6M = 24 * 60 * 60 * 180; // 180 days (i.e. 6 mths ago)

    var offset3M = 24 * 60 * 60 * 90; // 90 days (i.e. 3 mths ago)

    console.log(new Date(announcement_date * 1000).toLocaleDateString());
    console.log(new Date((announcement_date - offset3M) * 1000).toLocaleDateString());
    console.log(new Date((announcement_date - offset6M) * 1000).toLocaleDateString());

    for (let i = 0; i < new_ticker_data.date.length; i++) {
      xValues.push(new Date(new_ticker_data.date[i] * 1000).toLocaleDateString('en-US'));
    }

    var yTickerPrices = new_ticker_data.px_last;
    var yTickerVolumes = new_ticker_data.px_volume;
    var yTickerCurrency = new_ticker_data.currency;
    var starting_point = new_benchmark_data.px_last.length - xValues.length;
    var yBenchmarkPrices = new_benchmark_data.px_last.slice(starting_point);
    var yBenchmarkCurrency = new_benchmark_data.currency;
    var yTickerBenchmarkRatio = []; // Calculate Ticker / Benchmark Price Ratio 

    var yTickerBenchmarkRatioNormalized = []; // Normalized (by Factor 100)

    for (let i = 0; i < yTickerPrices.length; i++) {
      yTickerBenchmarkRatio.push(yTickerPrices[i] / yBenchmarkPrices[i]);
    }

    for (let i = 0; i < yTickerBenchmarkRatio.length; i++) {
      yTickerBenchmarkRatioNormalized.push(yTickerBenchmarkRatio[i] * 100 / yTickerBenchmarkRatio[0]);
    }

    const data = {
      labels: xValues,
      datasets: [{
        type: 'line',
        label: new_ticker_name,
        yAxisID: 'Price',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: yTickerPrices,
        hidden: true
      }, {
        type: 'line',
        label: new_benchmark_name,
        yAxisID: 'BenchmarkPrice',
        backgroundColor: 'transparent',
        borderColor: 'Blue',
        borderDash: [5, 8],
        pointRadius: 0,
        data: yBenchmarkPrices,
        hidden: true
      }, {
        type: 'line',
        label: 'Ticker/Benchmark Price Ratio',
        yAxisID: 'TickerBenchmarkRatio',
        backgroundColor: 'BlueViolet',
        borderColor: 'BlueViolet',
        data: yTickerBenchmarkRatioNormalized,
        hidden: false
      }, {
        type: 'bar',
        label: 'Ticker Volume',
        yAxisID: 'Volume',
        backgroundColor: 'DarkGrey',
        data: yTickerVolumes,
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
              display: false,
              text: 'Ticker Price (' + yTickerCurrency + ')'
            }
          },
          BenchmarkPrice: {
            type: 'linear',
            position: 'left',
            title: {
              display: false,
              text: 'Benchmark Price (' + yBenchmarkCurrency + ')'
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
            text: new_ticker_name,
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
    new Chart(document.getElementById('myChart'), config);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("canvas", {
      id: "myChart",
      width: "200",
      height: "100",
      "aria-label": "myChart",
      role: "img"
    }));
  }

}

function Shortlist() {
  console.log('Placeholder for Shortlisting ' + ticker + ' to Trade Basket');
}

function FilterTable() {
  let table, rows, cells;
  let event, eventFilter, eventBool;
  let country, countryFilter, countryBool;
  table = document.getElementById("rebalanceTable");
  rows = table.getElementsByTagName('tr');
  eventFilter = document.getElementById("eventDropdown").value;
  countryFilter = document.getElementById("countryDropdown").value;

  for (let row of rows) {
    cells = row.getElementsByTagName("td");
    event = cells[3] || null; // be careful, identification of value is index-based

    country = cells[4] || null;
    eventBool = eventFilter === "All Events" || !event || eventFilter === event.textContent;
    countryBool = countryFilter === "All Countries" || !country || countryFilter === country.textContent;

    if (eventBool && countryBool) {
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

;

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

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      historical: []
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
        ticker_px_close_1D
        announcement_date
        trade_date
        prediction_date
        days_to_announcement
        conviction
        side
        demand_usd
        demand_shares
        demand_adv
        ticker_pct_chg_1D
        ticker_pct_chg_5D
        ticker_pct_chg_30D
        ticker_pct_chg_90D
        ticker_vs_index_1D
        ticker_vs_index_5D
        ticker_vs_index_30D
        ticker_vs_index_90D
        ticker_vs_ticker_30DpreA
        ticker_vs_index_30DpreA
        average_volume
        excess_volume1D_A
        excess_volume5D_A
        excess_volume15D_A
        excess_volume30D_A
        excess_volume1D_B
        excess_volume5D_B
        excess_volume15D_B
        excess_volume30D_B
        exp_reporting_date
        benchmark_index
        lookback_duration
        lookback_end_days_ago
        creator
      }
    }`;
    const query2 = `query {
      historicalData {
        ticker
        currency
        date
        px_last
        px_volume
      }
    }`;
    const data = await graphQLFetch(query);
    const data2 = await graphQLFetch(query2);
    this.setState({
      issues: data.issueList,
      historical: data2.historicalData
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Index Rebalance Watcher (Beta)"), /*#__PURE__*/React.createElement(Charting, null), /*#__PURE__*/React.createElement(EventFilter, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement(CountryFilter, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues,
      data: this.state.historical
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));