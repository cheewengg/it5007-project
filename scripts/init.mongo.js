/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.intropic.drop();

const issuesDB = [
  {
    id: 1, 
    status: 'New', 
    owner: 'Ravan', 
    effort: 5,
    created: new Date('2019-01-15'), 
    due: undefined,
    title: 'Error in console when clicking Add',

    event_name: 'KOSPI2 March', 
    country: 'KS', 
    ticker: '049770 KS Equity',
    name: 'Dongwon F&B Co Ltd', 
    ticker_px_close_1D: 5.91,
    announcement_date: '2022/03/02', 
    trade_date: '2022/02/21', 
    prediction_date: '2022/02/18',
    days_to_announcement: '3 days',
    conviction: '1',
    Side: '1',
    demand_usd: 9.5103,
    demand_shares: 1.6092,
    demand_adv: 6.9019,
    ticker_pct_chg_1D: 2.15,
    ticker_pct_chg_5D: 7.45,
    ticker_pct_chg_30D: 4.79,
    ticker_pct_chg_90D: -57.42,
    ticker_vs_index_1D: 1.52,
    ticker_vs_index_5D: 10.69,
    ticker_vs_index_30D: 13.20,
    ticker_vs_index_90D: -45.71,
    ticker_vs_ticker_30DpreA: 18.67,
    ticker_vs_index_30DpreA: 17.01,
    average_volume: 69395,
    excess_volume1D_A: 1430,
    excess_volume5D_A: -37629,
    excess_volume15D_A: -44313,
    excess_volume30D_A: -160263,
    excess_volume1D_B: 1430,
    excess_volume5D_B: -17704,
    excess_volume15D_B: 164,
    excess_volume30D_B: -91200,
    exp_reporting_date: '2022/02/23',
    benchmark_index: 'RTY Index',
    lookback_duration: '92 days',
    lookback_end_days_ago: '130 days',
    remarks: 'some notes here',
  },
  {
    id: 2, 
    status: 'Assigned', 
    owner: 'Eddie', 
    effort: 14,
    created: new Date('2019-01-16'), 
    due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',

    event_name: 'FTSE China 50 March', 
    country: 'HK', 
    ticker: '9633 HK Equity',
    name: 'Nongfu Spring', 
    ticker_px_close_1D: 1.54,
    trade_date: '2022/02/28', 
    announcement_date: '2022/03/03',
    prediction_date: '2022/02/18',
    days_to_announcement: '3 days',
    conviction: '1',
    Side: '1',
    demand_usd: 9.5103,
    demand_shares: 1.6092,
    demand_adv: 6.9019,
    ticker_pct_chg_1D: 2.15,
    ticker_pct_chg_5D: 7.45,
    ticker_pct_chg_30D: 4.79,
    ticker_pct_chg_90D: -57.42,
    ticker_vs_index_1D: 1.52,
    ticker_vs_index_5D: 10.69,
    ticker_vs_index_30D: 13.20,
    ticker_vs_index_90D: -45.71,
    ticker_vs_ticker_30DpreA: 18.67,
    ticker_vs_index_30DpreA: 17.01,
    average_volume: 69395,
    excess_volume1D_A: 1430,
    excess_volume5D_A: -37629,
    excess_volume15D_A: -44313,
    excess_volume30D_A: -160263,
    excess_volume1D_B: 1430,
    excess_volume5D_B: -17704,
    excess_volume15D_B: 164,
    excess_volume30D_B: -91200,
    exp_reporting_date: '2022/02/23',
    benchmark_index: 'RTY Index',
    lookback_duration: '92 days',
    lookback_end_days_ago: '130 days',
    remarks: 'another note here',
  },
];

db.intropic.insertMany(issuesDB);
const count = db.intropic.count();
print('Inserted', count, 'intropic');

