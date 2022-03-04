/*
 * localhost: mongo indexrebalance scripts/init.mongo.js
 * Atlas: mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab: mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.intropic.drop();
db.brianfreitas.drop();

const intropicInitData = [
  {
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
    side: '1',
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
    creator: 'Intropic',
  },
  {
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
    side: '1',
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
    creator: 'Intropic',
  },
];

const brianfreitasInitData = [
  {
    event_name: 'FTSE TW50 March',
    country: 'TT',
    ticker: '4938 TT Equity',
    name: 'Pegatron Corp',
    ticker_px_close_1D: 69.9,
    announcement_date: 'Mar 03, 22',
    trade_date: 'Mar 18, 22',
    prediction_date: 'Feb 21, 22',
    days_to_announcement: '0 days',
    conviction: 'Low',
    side: -1,
    demand_usd: -34.156116,
    demand_shares: -13565484.157770805,
    demand_adv: -2.3363649865654432,
    ticker_pct_chg_1D: -0.005689900426742445,
    ticker_pct_chg_5D: 0.013043478260869712,
    ticker_pct_chg_30D: -0.014104372355430161,
    ticker_pct_chg_90D: 0.02945508100147265,
    ticker_vs_index_1D: 0.02351905150021938,
    ticker_vs_index_5D: -0.00834733310793978,
    ticker_vs_index_30D: 8624351.333333334,
    ticker_vs_index_90D: -0.295090413786687,
    ticker_vs_ticker_30DpreA: -3.6913451632796037,
    ticker_vs_index_30DpreA: -4.076761459952781,
    average_volume: 215304,
    excess_volume1D_A: -0.295090413786687,
    excess_volume5D_A: -0.39063476135727315,
    excess_volume15D_A: -2.3267532486300975,
    excess_volume30D_A: -3.6913451632796037,
    excess_volume1D_B: -3.6913451632796037,
    excess_volume5D_B: -3.6913451632796037,
    excess_volume15D_B: -3.6913451632796037,
    excess_volume30D_B: -3.6913451632796037,
    exp_reporting_date: "Mar 25, 22",
    benchmark_index: 'TW50 Index',
    lookback_duration: '92 days',
    lookback_end_days_ago: '181 days',
    creator: 'Brian Freitas',
  },
  {
    event_name: 'ASX50 March',
    country: 'TT',
    ticker: 'BSL AU Equity',
    name: 'BlueScope Steel Ltd',
    ticker_px_close_1D: 69.9,
    prediction_date: 'Feb 18, 22',
    announcement_date: 'Mar 04, 22',
    trade_date: 'Mar 18, 22',
    days_to_announcement: '0 days',
    conviction: 'High',
    side: -1,
    demand_usd: -34.156116,
    demand_shares: -13565484.157770805,
    demand_adv: -2.3363649865654432,
    ticker_pct_chg_1D: -0.005689900426742445,
    ticker_pct_chg_5D: 0.013043478260869712,
    ticker_pct_chg_30D: -0.014104372355430161,
    ticker_pct_chg_90D: 0.02945508100147265,
    ticker_vs_index_1D: 0.02351905150021938,
    ticker_vs_index_5D: -0.00834733310793978,
    ticker_vs_index_30D: 8624351.333333334,
    ticker_vs_index_90D: -0.295090413786687,
    ticker_vs_ticker_30DpreA: -3.6913451632796037,
    ticker_vs_index_30DpreA: -4.076761459952781,
    average_volume: 215304,
    excess_volume1D_A: -0.295090413786687,
    excess_volume5D_A: -0.39063476135727315,
    excess_volume15D_A: -2.3267532486300975,
    excess_volume30D_A: -3.6913451632796037,
    excess_volume1D_B: -3.6913451632796037,
    excess_volume5D_B: -3.6913451632796037,
    excess_volume15D_B: -3.6913451632796037,
    excess_volume30D_B: -3.6913451632796037,
    exp_reporting_date: "Mar 25, 22",
    benchmark_index: 'TW50 Index',
    lookback_duration: '92 days',
    lookback_end_days_ago: '181 days',
    creator: 'Brian Freitas',
  },
];

db.intropic.insertMany(intropicInitData);
db.brianfreitas.insertMany(brianfreitasInitData);

const count = db.intropic.count();
const count2 = db.brianfreitas.count();

print('Inserted', count, 'intropic');
print('Inserted', count2, 'brianfreitas');