const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function IssueRow(props) {
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.visualize), /*#__PURE__*/React.createElement("td", null, issue.add_basket), /*#__PURE__*/React.createElement("td", null, issue.event_name), /*#__PURE__*/React.createElement("td", null, issue.country), /*#__PURE__*/React.createElement("td", null, issue.ticker), /*#__PURE__*/React.createElement("td", null, issue.name), /*#__PURE__*/React.createElement("td", null, issue.ticker_px_close_1D), /*#__PURE__*/React.createElement("td", null, issue.announcement_date), /*#__PURE__*/React.createElement("td", null, issue.trade_date), /*#__PURE__*/React.createElement("td", null, issue.prediction_date), /*#__PURE__*/React.createElement("td", null, issue.days_to_announcement), /*#__PURE__*/React.createElement("td", null, issue.conviction), /*#__PURE__*/React.createElement("td", null, issue.side), /*#__PURE__*/React.createElement("td", null, '$' + issue.demand_usd.toFixed(2)), /*#__PURE__*/React.createElement("td", null, issue.demand_shares.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), /*#__PURE__*/React.createElement("td", null, issue.demand_adv.toFixed(2)), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_1D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_5D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_30D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_pct_chg_90D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_1D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_5D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_30D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_90D).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_ticker_30DpreA).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.ticker_vs_index_30DpreA).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, issue.average_volume.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume1D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume5D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume15D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume30D_A).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume1D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume5D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume15D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, (100 * issue.excess_volume30D_B).toFixed(2) + '%'), /*#__PURE__*/React.createElement("td", null, issue.exp_reporting_date), /*#__PURE__*/React.createElement("td", null, issue.benchmark_index), /*#__PURE__*/React.createElement("td", null, issue.lookback_duration), /*#__PURE__*/React.createElement("td", null, issue.lookback_end_days_ago), /*#__PURE__*/React.createElement("td", null, issue.creator));
}

function IssueTable(props) {
  function chartingSubmit(e, ticker) {
    var data = [];
    e.preventDefault();

    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].ticker == ticker) {
        data = props.data[i];
      }
    }

    new Charting().updateChart(ticker, data);
  }

  for (let i = 0; i < props.issues.length; i++) {
    props.issues[i].id = i + 1;
    props.issues[i].visualize = /*#__PURE__*/React.createElement("button", {
      onClick: e => chartingSubmit(e, ticker = props.issues[i].ticker)
    }, "Visualize");
    props.issues[i].add_basket = /*#__PURE__*/React.createElement("button", {
      onClick: e => Shortlist(e, ticker = props.issues[i].ticker)
    }, "Shortlist");
  }

  const issueRows = props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  }));
  return /*#__PURE__*/React.createElement("table", {
    id: "rebalanceTable",
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Charting"), /*#__PURE__*/React.createElement("th", null, "Trade Basket"), /*#__PURE__*/React.createElement("th", null, "Event Name"), /*#__PURE__*/React.createElement("th", null, "Country"), /*#__PURE__*/React.createElement("th", null, "Ticker"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Last Px"), /*#__PURE__*/React.createElement("th", null, "Announcement Date"), /*#__PURE__*/React.createElement("th", null, "Trade Date"), /*#__PURE__*/React.createElement("th", null, "Prediction Date"), /*#__PURE__*/React.createElement("th", null, "Days to Announce"), /*#__PURE__*/React.createElement("th", null, "Conviction"), /*#__PURE__*/React.createElement("th", null, "Side"), /*#__PURE__*/React.createElement("th", null, "Demand $USD"), /*#__PURE__*/React.createElement("th", null, "Demand Shares"), /*#__PURE__*/React.createElement("th", null, "Days to Trade"), /*#__PURE__*/React.createElement("th", null, "1D%Chg"), /*#__PURE__*/React.createElement("th", null, "5D%Chg"), /*#__PURE__*/React.createElement("th", null, "30D%Chg"), /*#__PURE__*/React.createElement("th", null, "90D%Chg"), /*#__PURE__*/React.createElement("th", null, "1D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "5D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "30D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "90D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "30D%Chg preA"), /*#__PURE__*/React.createElement("th", null, "30D%Chg preA vsIdx"), /*#__PURE__*/React.createElement("th", null, "Avg Volume"), /*#__PURE__*/React.createElement("th", null, "1Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "5Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "15Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "30Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "1Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "5Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "15Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "30Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "Exp Reporting Date"), /*#__PURE__*/React.createElement("th", null, "Benchmark"), /*#__PURE__*/React.createElement("th", null, "Benchmark Duration"), /*#__PURE__*/React.createElement("th", null, "Benchmark End (days ago)"), /*#__PURE__*/React.createElement("th", null, "Creator"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

class Charting extends React.Component {
  constructor() {
    super();
  }

  updateChart(new_ticker, new_data) {
    if (Chart.getChart('myChart')) {
      Chart.getChart('myChart').destroy();
    }

    var xValues = new_data.date;
    var yLineValues = new_data.px_last;
    var yBarValues = new_data.px_volume;
    const data = {
      labels: xValues,
      datasets: [{
        type: 'line',
        label: 'Historical Price',
        yAxisID: 'Price',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: yLineValues,
        hidden: false
      }, {
        type: 'bar',
        label: 'Historical Volume',
        yAxisID: 'Volume',
        data: yBarValues,
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
              callback: function (value, index, values) {
                return '$' + value;
              }
            },
            title: {
              display: true,
              text: 'Price'
            }
          },
          Volume: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Volume'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: new_ticker,
            maintainAspectRatio: false,
            responsive: true
          }
        }
      }
    };
    new Chart(document.getElementById('myChart'), config);
  }

  render() {
    var defaultTicker = '4938 TT Equity';

    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].ticker == defaultTicker) {
        var xValues = this.props.data[i].date;
        var yLineValues = this.props.data[i].px_last;
        var yBarValues = this.props.data[i].px_volume;
      }
    }

    const data = {
      labels: xValues,
      datasets: [{
        type: 'line',
        label: 'Historical Price',
        yAxisID: 'Price',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: yLineValues,
        hidden: false
      }, {
        type: 'bar',
        label: 'Historical Volume',
        yAxisID: 'Volume',
        data: yBarValues,
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
              callback: function (value, index, values) {
                return '$' + value;
              }
            },
            title: {
              display: true,
              text: 'Price'
            }
          },
          Volume: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Volume'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: defaultTicker,
            maintainAspectRatio: false,
            responsive: true
          }
        }
      }
    };
    new Chart(document.getElementById('myChart'), config);
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
    // need to code automated dropdown options i/o hardcode
    const eventList = [{
      id: 1,
      value: 'All Events'
    }, {
      id: 2,
      value: 'FTSE TW50 March'
    }, {
      id: 3,
      value: 'ASX50 March'
    }, {
      id: 4,
      value: 'ASX200 March'
    }, {
      id: 5,
      value: 'FTSE China 50 March'
    }];
    return /*#__PURE__*/React.createElement("select", {
      id: "eventDropdown",
      onInput: FilterTable
    }, /*#__PURE__*/React.createElement(DropdownOptions, {
      options: eventList
    }));
  }

}

class CountryFilter extends React.Component {
  render() {
    // need to code out automated dropdown options i/o hardcode
    const countryList = [{
      id: 1,
      value: 'All Countries'
    }, {
      id: 2,
      value: 'TT'
    }, {
      id: 3,
      value: 'AU'
    }, {
      id: 4,
      value: 'HK'
    }];
    return /*#__PURE__*/React.createElement("select", {
      id: "countryDropdown",
      onInput: FilterTable
    }, /*#__PURE__*/React.createElement(DropdownOptions, {
      options: countryList
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Index Rebalance Watcher (Beta)"), /*#__PURE__*/React.createElement(Charting, {
      data: this.state.historical
    }), /*#__PURE__*/React.createElement(EventFilter, null), /*#__PURE__*/React.createElement(CountryFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues,
      data: this.state.historical
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));