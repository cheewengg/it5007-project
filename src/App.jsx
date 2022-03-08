const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function IssueRow(props) {
  const issue = props.issue;
 
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.visualize}</td>
      <td>{issue.add_basket}</td>
      <td>{issue.event_name}</td>
      <td>{issue.country}</td>
      <td>{issue.ticker}</td>
      <td>{issue.name}</td>
      <td>{issue.ticker_px_close_1D}</td>
      <td>{issue.announcement_date}</td>
      <td>{issue.trade_date}</td>
      <td>{issue.prediction_date}</td>
      <td>{issue.days_to_announcement}</td>
      <td>{issue.conviction}</td>
      <td>{issue.side}</td>
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
      <td>{issue.creator}</td>
    </tr>
  );
}

function IssueTable(props) {
  for (let i=0; i < props.issues.length; i++) {
    props.issues[i].id = i + 1;
    // props.issues[i].visualize = <button onClick={(e) => Chart(e, ticker=props.issues[i].ticker)}>Visualize</button>;
    props.issues[i].visualize = <button onClick={(e) => ChartFunc(e, ticker=props.issues[i].ticker)}>Visualize</button>;
    props.issues[i].add_basket = <button onClick={(e) => Shortlist(e, ticker=props.issues[i].ticker)}>Shortlist</button>;
  }
  const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
  
  return (
    <table id="rebalanceTable" className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Charting</th>
          <th>Trade Basket</th>
          <th>Event Name</th>
          <th>Country</th>
          <th>Ticker</th>
          <th>Name</th>
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
          <th>Creator</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

function Shortlist() {
  console.log('Placeholder for Shortlisting ' + ticker + ' to Trade Basket')
}

  
function ChartFunc() {
  console.log('Inside Chart Function');
  console.log(ticker);

  // console.log(ticker);

  Chart.getChart('myChart').destroy();

  var xValues = [10,20,30,40,50,60,70,80,90,100,110];
  var yLineValues = [54,58,52,57,62,68,69,67,72,74,73];
  var yBarValues = [100,101,110,120,80,60,110,100,90,100,105];

  const data = {
    labels: xValues,
    datasets: [{
      type: 'line',
      label: 'Test Price History',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: yLineValues,
    }, {
      type: 'bar',
      label: 'Test Volume History',
      data: yBarValues, 
    }
  ]
  };

  const config = {
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'), 
    config
  );
}

class Charting extends React.Component {
  render() {
    // need to replace these hardcoded values with actual historical price data
    var xValues = [10,20,30,40,50,60,70,80,90,100,110];
    var yLineValues = [54,58,52,57,62,68,69,67,72,74,73];
    var yBarValues = [100,101,110,120,80,60,110,100,90,100,105];

    const data = {
      labels: xValues,
      datasets: [{
        type: 'line',
        label: 'Test Price History',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: yLineValues,
      }, {
        type: 'bar',
        label: 'Test Volume History',
        data: yBarValues, 
      }
    ]
    };
  
    const config = {
      data: data,
      options: {}
    };

    new Chart(
      document.getElementById('myChart'), 
      config
    );

    return (
      <div>
        <canvas id="myChart" width="400" height="200" aria-label="myChart" role="img"></canvas>
      </div>
    );
  }
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

    event = cells[3] || null;   // be careful, identification of value is index-based
    country = cells[4] || null;

    eventBool = ((eventFilter === ("All Events") || !event || (eventFilter === event.textContent)))
    countryBool = ((countryFilter === "All Countries") || !country || (countryFilter === country.textContent))
    
    if (eventBool && countryBool) {
        row.style.display = "";
    }
    else {
      row.style.display = "none";
    }
  }
}

function DropdownOptions({ options }) {
  return (
      options.map(option => 
      <option key={option.id} value={option.value}>                                   
        {option.value}
      </option>
    )
  );
};


class EventFilter extends React.Component {
  render() {

    // need to code automated dropdown options i/o hardcode
    const eventList = [
      {
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
      }
    ];

    return (
      <select id="eventDropdown" onInput={FilterTable}>
        <DropdownOptions options={eventList} />
      </select>  
    );
  }
}

class CountryFilter extends React.Component {
  render() {

    // need to code out automated dropdown options i/o hardcode
    const countryList = [
      {
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
      }
    ];
    
    return (
      <select id="countryDropdown" onInput={FilterTable}>
        <DropdownOptions options={countryList} />
      </select>  
    );
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
      due: new Date(new Date().getTime() + 1000*60*60*24*10),
    }
    this.props.createIssue(issue);
    form.owner.value = ""; 
    form.title.value = "";
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Example Input1" />
        <input type="text" name="title" placeholder="Example Input2" />
        <button>Add to Trade Basket</button>
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
        {/* <IssueAdd createIssue={this.createIssue} /> */}
        <Charting />
        <EventFilter /> 
        <CountryFilter /> 
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
