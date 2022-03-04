const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function IssueRow(props) {
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.event_name), /*#__PURE__*/React.createElement("td", null, issue.country), /*#__PURE__*/React.createElement("td", null, issue.ticker), /*#__PURE__*/React.createElement("td", null, issue.name), /*#__PURE__*/React.createElement("td", null, issue.ticker_px_close_1D), /*#__PURE__*/React.createElement("td", null, issue.announcement_date), /*#__PURE__*/React.createElement("td", null, issue.trade_date), /*#__PURE__*/React.createElement("td", null, issue.prediction_date), /*#__PURE__*/React.createElement("td", null, issue.days_to_announcement), /*#__PURE__*/React.createElement("td", null, issue.conviction), /*#__PURE__*/React.createElement("td", null, issue.side), /*#__PURE__*/React.createElement("td", null, issue.demand_usd), /*#__PURE__*/React.createElement("td", null, issue.demand_shares), /*#__PURE__*/React.createElement("td", null, issue.demand_adv), /*#__PURE__*/React.createElement("td", null, issue.ticker_pct_chg_1D), /*#__PURE__*/React.createElement("td", null, issue.ticker_pct_chg_5D), /*#__PURE__*/React.createElement("td", null, issue.ticker_pct_chg_30D), /*#__PURE__*/React.createElement("td", null, issue.ticker_pct_chg_90D), /*#__PURE__*/React.createElement("td", null, issue.ticker_vs_index_1D), /*#__PURE__*/React.createElement("td", null, issue.ticker_vs_index_5D), /*#__PURE__*/React.createElement("td", null, issue.ticker_vs_index_30D), /*#__PURE__*/React.createElement("td", null, issue.ticker_vs_index_90D), /*#__PURE__*/React.createElement("td", null, issue.ticker_vs_ticker_30DpreA), /*#__PURE__*/React.createElement("td", null, issue.ticker_vs_index_30DpreA), /*#__PURE__*/React.createElement("td", null, issue.average_volume), /*#__PURE__*/React.createElement("td", null, issue.excess_volume1D_A), /*#__PURE__*/React.createElement("td", null, issue.excess_volume5D_A), /*#__PURE__*/React.createElement("td", null, issue.excess_volume15D_A), /*#__PURE__*/React.createElement("td", null, issue.excess_volume30D_A), /*#__PURE__*/React.createElement("td", null, issue.excess_volume1D_B), /*#__PURE__*/React.createElement("td", null, issue.excess_volume5D_B), /*#__PURE__*/React.createElement("td", null, issue.excess_volume15D_B), /*#__PURE__*/React.createElement("td", null, issue.excess_volume30D_B), /*#__PURE__*/React.createElement("td", null, issue.exp_reporting_date), /*#__PURE__*/React.createElement("td", null, issue.benchmark_index), /*#__PURE__*/React.createElement("td", null, issue.lookback_duration), /*#__PURE__*/React.createElement("td", null, issue.lookback_end_days_ago), /*#__PURE__*/React.createElement("td", null, issue.creator));
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  }));
  return /*#__PURE__*/React.createElement("table", {
    id: "rebalanceTable",
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Event Name"), /*#__PURE__*/React.createElement("th", null, "Country"), /*#__PURE__*/React.createElement("th", null, "Ticker"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Last Px"), /*#__PURE__*/React.createElement("th", null, "Announcement Date"), /*#__PURE__*/React.createElement("th", null, "Trade Date"), /*#__PURE__*/React.createElement("th", null, "Prediction Date"), /*#__PURE__*/React.createElement("th", null, "Days to Announce"), /*#__PURE__*/React.createElement("th", null, "Conviction"), /*#__PURE__*/React.createElement("th", null, "Side"), /*#__PURE__*/React.createElement("th", null, "Demand $USD"), /*#__PURE__*/React.createElement("th", null, "Demand Shares"), /*#__PURE__*/React.createElement("th", null, "Days to Trade"), /*#__PURE__*/React.createElement("th", null, "1D%Chg"), /*#__PURE__*/React.createElement("th", null, "5D%Chg"), /*#__PURE__*/React.createElement("th", null, "30D%Chg"), /*#__PURE__*/React.createElement("th", null, "90D%Chg"), /*#__PURE__*/React.createElement("th", null, "1D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "5D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "30D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "90D%Chg vsIdx"), /*#__PURE__*/React.createElement("th", null, "30D%Chg preA"), /*#__PURE__*/React.createElement("th", null, "30D%Chg preA vsIdx"), /*#__PURE__*/React.createElement("th", null, "Avg Volume"), /*#__PURE__*/React.createElement("th", null, "1Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "5Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "15Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "30Dv1 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "1Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "5Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "15Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "30Dv2 Excess Volume"), /*#__PURE__*/React.createElement("th", null, "Exp Reporting Date"), /*#__PURE__*/React.createElement("th", null, "Benchmark"), /*#__PURE__*/React.createElement("th", null, "Benchmark Duration"), /*#__PURE__*/React.createElement("th", null, "Benchmark End (days ago)"), /*#__PURE__*/React.createElement("th", null, "Creator"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

class Charting extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the charting area");
  }

}

function filterTable() {
  let eventDropdown, event, eventFilter;
  let countryDropdown, country, countryFilter;
  let table, rows, cells;
  eventDropdown = document.getElementById("eventDropdown");
  eventFilter = eventDropdown.value;
  countryDropdown = document.getElementById("countryDropdown");
  countryFilter = countryDropdown.value;
  table = document.getElementById("rebalanceTable");
  rows = table.getElementsByTagName('tr');

  for (let row of rows) {
    cells = row.getElementsByTagName("td");
    event = cells[0] || null;
    country = cells[1] || null;
    console.log(event, eventFilter);
    console.log(country, countryFilter);

    if (eventFilter === "All Events" || !event || eventFilter === event.textContent && (countryFilter === "All Countries" || !country || countryFilter === country.textContent)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

class EventFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("select", {
      id: "eventDropdown",
      onInput: filterTable
    }, /*#__PURE__*/React.createElement("option", null, "All Events"), /*#__PURE__*/React.createElement("option", null, "FTSE TW50 March"), /*#__PURE__*/React.createElement("option", null, "ASX50 March"), /*#__PURE__*/React.createElement("option", null, "ASX200 March"));
  }

}

class CountryFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("select", {
      id: "countryDropdown",
      onInput: filterTable
    }, /*#__PURE__*/React.createElement("option", null, "All Countries"), /*#__PURE__*/React.createElement("option", null, "TT"), /*#__PURE__*/React.createElement("option", null, "AU"), /*#__PURE__*/React.createElement("option", null, "HK"));
  }

}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
    };
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Example Input1"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Example Input2"
    }), /*#__PURE__*/React.createElement("button", null, "Add to Trade Basket"));
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
      issues: []
    };
    this.createIssue = this.createIssue.bind(this);
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
    const data = await graphQLFetch(query);

    if (data) {
      this.setState({
        issues: data.issueList
      });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;
    const data = await graphQLFetch(query, {
      issue
    });

    if (data) {
      this.loadData();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Index Rebalance Watchlist (Beta)"), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }), /*#__PURE__*/React.createElement(Charting, null), /*#__PURE__*/React.createElement(EventFilter, null), /*#__PURE__*/React.createElement(CountryFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));