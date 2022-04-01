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
      <td>{new Date(issue.announcement_date * 1000).toLocaleDateString('en-US')}</td>
      <td>{new Date(issue.trade_date * 1000).toLocaleDateString('en-US')}</td>
      <td>{new Date(issue.prediction_date * 1000).toLocaleDateString('en-US')}</td>
      <td>{issue.days_to_announcement}</td>
      <td>{issue.conviction}</td>
      <td>{issue.side}</td>
      <td>{'$' + issue.demand_usd.toFixed(2)}</td>
      <td>{issue.demand_shares.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td>{issue.demand_adv.toFixed(2)}</td>
      <td>{(100 * issue.ticker_pct_chg_1D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_pct_chg_5D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_pct_chg_30D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_pct_chg_90D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_vs_index_1D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_vs_index_5D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_vs_index_30D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_vs_index_90D).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_vs_ticker_30DpreA).toFixed(2) + '%'}</td>
      <td>{(100 * issue.ticker_vs_index_30DpreA).toFixed(2) + '%'}</td>
      <td>{issue.average_volume.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td>{(100 * issue.excess_volume1D_A).toFixed(2) + '%'}</td>
      <td>{(100 * issue.excess_volume5D_A).toFixed(2) + '%'}</td>
      <td>{(100 * issue.excess_volume15D_A).toFixed(2) + '%'}</td>
      <td>{(100 * issue.excess_volume30D_A).toFixed(2) + '%'}</td>
      <td>{(100 * issue.excess_volume1D_B).toFixed(2) + '%'}</td>
      <td>{(100 * issue.excess_volume5D_B).toFixed(2) + '%'}</td>
      <td>{(100 * issue.excess_volume15D_B).toFixed(2) + '%'}</td>
      <td>{(100 * issue.excess_volume30D_B).toFixed(2) + '%'}</td>
      <td>{new Date(issue.exp_reporting_date * 1000).toLocaleDateString('en-US')}</td>
      <td>{issue.benchmark_index}</td>
      <td>{issue.lookback_duration}</td>
      <td>{issue.lookback_end_days_ago}</td>
      <td>{issue.creator}</td>
    </tr>
  );
}

function IssueTable(props) {
  function chartingSubmit(e, issues) {
    e.preventDefault();
    new Charting().updateChart(issues); 
  }

  // add visualization and shortlist buttons
  for (let i=0; i < props.issues.length; i++) {
    props.issues[i].id = i + 1;
    props.issues[i].visualize = <button onClick={(e) => chartingSubmit(e, issues=props.issues[i])}>Visualize</button>;
    props.issues[i].add_basket = <button onClick={(e) => Shortlist(e, ticker=props.issues[i].ticker)}>Shortlist</button>;
  }

  // add main rows with data
  const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);

  // add sorting columns functionality
  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
      v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
      )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

  document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    const tbody = table.querySelector('tbody');
    Array.from(tbody.querySelectorAll('tr'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
      .forEach(tr => tbody.appendChild(tr) );
  })));

  return (
    <table id="rebalanceTable" className="bordered-table">
      <thead bgcolor= "DarkGrey">
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
          <th>Demand USD $m</th>
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

function plotLineChart(tickerData, benchmarkData) {
  if (Chart.getChart('lineChart')) {
    Chart.getChart('lineChart').destroy();
  }
   
  var yTickerBenchmarkRatio = [];   // Calculate Ticker / Benchmark Price Ratio 
  var yTickerBenchmarkRatioNormalized = []; // Normalized (by Factor 100)

  for (let i=0; i < tickerData.px_last.length; i++) {
    yTickerBenchmarkRatio.push(tickerData.px_last[i] / benchmarkData.px_last[i]);
  }

  for (let i=0; i < yTickerBenchmarkRatio.length; i++) {
    yTickerBenchmarkRatioNormalized.push(yTickerBenchmarkRatio[i] * 100 / yTickerBenchmarkRatio[0]);
  }

  const data = {
    labels: tickerData.stringDates,
    datasets: [
      {
        type: 'line',
        label: tickerData.ticker,
        yAxisID: 'Price',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: tickerData.px_last,
        hidden: true,
      }, {
        type: 'line',
        label: benchmarkData.ticker,
        yAxisID: 'BenchmarkPrice',
        backgroundColor: 'transparent',
        borderColor: 'Blue',
        borderDash: [5, 8],
        pointRadius: 0,
        data: benchmarkData.px_last,
        hidden: true,
      }, {
        type: 'line',
        label: 'Ticker/Benchmark Price Ratio',
        yAxisID: 'TickerBenchmarkRatio',
        backgroundColor: 'BlueViolet',
        borderColor: 'BlueViolet',
        data: yTickerBenchmarkRatioNormalized,
        hidden: false,
      }, {
        type: 'bar',
        label: 'Ticker Volume',
        yAxisID: 'Volume',
        backgroundColor: 'DarkGrey',
        data: tickerData.px_volume,
        hidden: false,
      }
    ]
  };

  const config = {
    data: data,
    options: {
      scales: {
        Price: {
          type: 'linear',
          position: 'left',
          ticks: {
            display: false,
          },
          title: {
            display: false,
            
          },
        }, 
        BenchmarkPrice: {
          type: 'linear',
          position: 'left', 
          title: {
            display: false,
            text: 'Benchmark Price (' + benchmarkData.currency + ')'
          },
          ticks: {
            display: false,
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
            text: 'Ticker Volume',
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: tickerData.ticker,
          maintainAspectRatio: false,
          responsive: true,
        },
        legend: {
          onClick: function(e, legendItem) {
            var idx = legendItem.datasetIndex;
            var scalesName = Object.keys(this.chart.config.options.scales)[idx]; 

            this.chart.config.data.datasets[idx].hidden = !this.chart.config.data.datasets[idx].hidden;
            this.chart.config.options.scales[scalesName].ticks.display = !this.chart.config.options.scales[scalesName].ticks.display;
            this.chart.config.options.scales[scalesName].title.display = !this.chart.config.options.scales[scalesName].title.display;
            this.chart.update();
          }
        },
      },
    }
  };
  
  new Chart(document.getElementById('lineChart'), config);
}

function plotExcessVolume(tickerData, benchmarkData) {
  if (Chart.getChart('excessVolumeChart')) {
    Chart.getChart('excessVolumeChart').destroy();
  }

  var refDate = new Date();
  var lookbackStDt = new Date(refDate.setDate(refDate.getDate() - 180)).getTime() / 1000;
  var lookbackEndDt = new Date(refDate.setDate(refDate.getDate() + 90)).getTime() / 1000;

  // continue excess volume coding here (calculate average volume, line 171 brianfreitas)

  const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
  
  var averageVolume = []
  for (let i=0; i < tickerData.date.length; i++) {
      if (
        tickerData.date[i] <= lookbackEndDt &&
        tickerData.date[i] >= lookbackStDt
      ) {
      averageVolume.push(tickerData.px_volume[i]);
    }
  }
  averageVolume = average(averageVolume)

  var excessVolDaily = [];
  var excessVolCumulative = []
  var excessVolCumulativeTotal = 0 
  var excessVolDates = [];

  for (let i=0; i < tickerData.date.length; i++) {
    if (tickerData.date[i] > lookbackEndDt) {
      excessVolDaily.push(tickerData.px_volume[i] - averageVolume);
      excessVolDates.push(new Date(tickerData.date[i] * 1000).toLocaleDateString('en-US'));
      
      excessVolCumulativeTotal = excessVolCumulativeTotal + (tickerData.px_volume[i] - averageVolume);
      excessVolCumulative.push(excessVolCumulativeTotal);
    }
  }

  controlStTitle = new Date(lookbackStDt * 1000).toLocaleDateString('en-US');
  controlEndTitle = new Date(lookbackEndDt * 1000).toLocaleDateString('en-US');
  
  console.log('lookback start', controlStTitle);
  console.log('lookback end', controlEndTitle);
  console.log(averageVolume);

  console.log(excessVolDaily);
  console.log(excessVolCumulative);

  tickerData.excessVolCumulative = excessVolCumulative;
  tickerData.excessVolDates = excessVolDates;

  const data = {
    labels: excessVolDates,
    datasets: [
      {
        type: 'bar',
        label: 'Ticker Volume',
        yAxisID: 'Volume',
        backgroundColor: 'Black',
        data: excessVolDaily,
        hidden: false,
      }
    ]
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
            text: 'Ticker Volume',
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "3 Month Excess Volume Analysis [Control Period: " + controlStTitle + " to " + controlEndTitle,
          maintainAspectRatio: false,
          responsive: true,
        },
        legend: {
          onClick: function(e, legendItem) {
            var idx = legendItem.datasetIndex;
            var scalesName = Object.keys(this.chart.config.options.scales)[idx]; 

            this.chart.config.data.datasets[idx].hidden = !this.chart.config.data.datasets[idx].hidden;
            this.chart.config.options.scales[scalesName].ticks.display = !this.chart.config.options.scales[scalesName].ticks.display;
            this.chart.config.options.scales[scalesName].title.display = !this.chart.config.options.scales[scalesName].title.display;
            this.chart.update();
          }
        },
      },
    }
  };
  new Chart(document.getElementById('excessVolumeChart'), config);
}

function plotExcessVolumeCumulative(tickerData) {
  if (Chart.getChart('excessVolumeCumulativeChart')) {
    Chart.getChart('excessVolumeCumulativeChart').destroy();
  }

  const data = {
    labels: tickerData.excessVolDates,
    datasets: [
      {
        type: 'bar',
        label: 'Ticker Volume',
        yAxisID: 'Volume',
        backgroundColor: 'Black',
        data: tickerData.excessVolCumulative,
        hidden: false,
      }
    ]
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
            text: 'Ticker Volume',
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "3 Month Excess Volume Cumulative Analysis",
          maintainAspectRatio: false,
          responsive: true,
        },
        legend: {
          onClick: function(e, legendItem) {
            var idx = legendItem.datasetIndex;
            var scalesName = Object.keys(this.chart.config.options.scales)[idx]; 

            this.chart.config.data.datasets[idx].hidden = !this.chart.config.data.datasets[idx].hidden;
            this.chart.config.options.scales[scalesName].ticks.display = !this.chart.config.options.scales[scalesName].ticks.display;
            this.chart.config.options.scales[scalesName].title.display = !this.chart.config.options.scales[scalesName].title.display;
            this.chart.update();
          }
        },
      },
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

    var tickerData = await graphQLFetch(tickerQuery, { ticker: ticker });
    var benchmarkData = await graphQLFetch(benchmarkQuery, { ticker: benchmark });

    tickerData = tickerData.queryData;
    benchmarkData = benchmarkData.queryData;

    var starting_point = (tickerData.px_last.length) - tickerData.date.length;
    benchmarkData.px_last = benchmarkData.px_last.slice(starting_point);
    benchmarkData.date = benchmarkData.date.slice(starting_point);
    tickerData.date = tickerData.date.slice(starting_point);

    
    var stringDates = [];
    for (let i=0; i < tickerData.date.length; i++) {
      stringDates.push(new Date(tickerData.date[i] * 1000).toLocaleDateString('en-US'));
    }
    tickerData.stringDates = stringDates;
    benchmarkData.stringDates = stringDates; 

    plotLineChart(tickerData, benchmarkData);
    plotExcessVolume(tickerData, benchmarkData); 
    plotExcessVolumeCumulative(tickerData); 
  }

  

  render() {   
    return (
      <div>
        <canvas id="lineChart" width="200" height="100" aria-label="lineChart" role="img"></canvas>
        <canvas id="excessVolumeChart" width="200" height="100" aria-label="excessVolumeChart" role="img"></canvas>
        <canvas id="excessVolumeCumulativeChart" width="200" height="100" aria-label="excessVolumeCumulativeChart" role="img"></canvas>
      </div>
    );
  }
}

class EventFilter extends React.Component {
  render() {
    var eventSet = new Set(); 
    var eventOptions = [{id: 0, value: 'All Events'}];
    var m = 1; 

    for (let i=0; i < this.props.issues.length; i++) {
      eventSet.add(this.props.issues[i].event_name);
    }

    for (const item of Array.from(eventSet).sort()) {
      eventOptions.push({id:m, value: item});  
      m++;
    }

    return (
      <select id="eventDropdown" onInput={FilterTable}>
        <DropdownOptions options={eventOptions} />
      </select>  
    );
  }
}

class CountryFilter extends React.Component {
  render() {
    var countrySet = new Set(); 
    var countryOptions = [{id: 0, value: 'All Countries'}];
    var m = 1; 

    for (let i=0; i < this.props.issues.length; i++) {
      countrySet.add(this.props.issues[i].country);
    }

    for (const item of Array.from(countrySet).sort()) {
      countryOptions.push({id:m, value: item});  
      m++;
    }

    return (
      <select id="countryDropdown" onInput={FilterTable}>
        <DropdownOptions options={countryOptions} />
      </select>  
    );
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [], tickerObj: {}, benchmarkObj: {} };
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
    this.setState({ issues: data.issueList});
  }

  render() {
    return (
      <React.Fragment>
        <h1>Index Rebalance Watcher (Beta)</h1>
        <Charting/>
        <EventFilter issues={this.state.issues}/> 
        <CountryFilter issues={this.state.issues}/> 
        <hr />
        <IssueTable issues={this.state.issues}/>
        <hr />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
