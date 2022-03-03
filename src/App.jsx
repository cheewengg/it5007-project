const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the issue filter.</div>
    );
  }
}

function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.event_name}</td>
      <td>{issue.country}</td>
      <td>{issue.ticker}</td>
      <td>{issue.ticker_px_close_1D}</td>
      <td>{issue.announcement_date}</td>
      <td>{issue.trade_date}</td>
      <td>{issue.prediction_date}</td>
      <td>{issue.days_to_announcement}</td>
      <td>{issue.conviction}</td>
      <td>{issue.Side}</td>
      <td>{issue.demand_usd}</td>
      <td>{issue.demand_shares}</td>
      <td>{issue.demand_adv}</td>
      <td>{issue.ticker_pct_chg_1D}</td>
      <td>{issue.ticker_pct_chg_5D}</td>
      <td>{issue.ticker_pct_chg_30D}</td>
      <td>{issue.ticker_pct_chg_90D}</td>
      <td>{issue.ticker_vs_index_1D}</td>
      <td>{issue.ticker_vs_index_5D}</td>
      <td>{issue.ticker_vs_index_30D}</td>
      <td>{issue.ticker_vs_index_90D}</td>
      <td>{issue.ticker_vs_ticker_30DpreA}</td>
      <td>{issue.ticker_vs_index_30DpreA}</td>
      <td>{issue.average_volume}</td>
      <td>{issue.excess_volume1D_A}</td>
      <td>{issue.excess_volume5D_A}</td>
      <td>{issue.excess_volume15D_A}</td>
      <td>{issue.excess_volume30D_A}</td>
      <td>{issue.excess_volume1D_B}</td>
      <td>{issue.excess_volume5D_B}</td>
      <td>{issue.excess_volume15D_B}</td>
      <td>{issue.excess_volume30D_B}</td>
      <td>{issue.exp_reporting_date}</td>
      <td>{issue.benchmark_index}</td>
      <td>{issue.lookback_duration}</td>
      <td>{issue.lookback_end_days_ago}</td>
    </tr>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Country</th>
          <th>Ticker</th>
          <th>Last Px</th>
          <th>Announcement Date</th>
          <th>Trade Date</th>
          <th>Prediction Date</th>
          <th>Days to Announce</th>
          <th>Conviction</th>
          <th>Side</th>
          <th>Demand $USD</th>
          <th>Demand Shares</th>
          <th>Days to Trade</th>
          <th>1D%Chg</th>
          <th>5D%Chg</th>
          <th>30D%Chg</th>
          <th>90D%Chg</th>
          <th>1D%Chg vsIdx</th>
          <th>5D%Chg vsIdx</th>
          <th>30D%Chg vsIdx</th>
          <th>90D%Chg vsIdx</th>
          <th>30D%Chg preA</th>
          <th>30D%Chg preA vsIdx</th>
          <th>Avg Volume</th>
          <th>1Dv1 Excess Volume</th>
          <th>5Dv1 Excess Volume</th>
          <th>15Dv1 Excess Volume</th>
          <th>30Dv1 Excess Volume</th>
          <th>1Dv2 Excess Volume</th>
          <th>5Dv2 Excess Volume</th>
          <th>15Dv2 Excess Volume</th>
          <th>30Dv2 Excess Volume</th>
          <th>Exp Reporting Date</th>
          <th>Benchmark</th>
          <th>Benchmark Duration</th>
          <th>Benchmark End (days ago)</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
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
      owner: form.owner.value, title: form.title.value,
      due: new Date(new Date().getTime() + 1000*60*60*24*10),
    }
    this.props.createIssue(issue);
    form.owner.value = ""; form.title.value = "";
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button>Add</button>
      </form>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
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
    this.state = { issues: [] };
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
        ticker_px_close_1D
        announcement_date
        trade_date
        prediction_date
        days_to_announcement
        conviction
        Side
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
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Index Rebalance Watchlist (Beta)</h1>
        <IssueAdd createIssue={this.createIssue} />
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
