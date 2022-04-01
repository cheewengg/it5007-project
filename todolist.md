## Must Add / Change 
- Graph: Add Excess Volume Analysis
- Excess Volume V2 only counts if price % chg vs INDEX matches direction (add vs Index part)

## Table Formatting
- Format dates properly (currently string, change to epoch)

## Infrastructure
- Dropdown list should allow multiple dropdown options
- Shortlist button needs functionality (add to list and master "export to csv" button) 
- Optimize load graph data (currently loading entire historical datasetleading to slow startup time). Change to load only the ticker that is clicked. 
- put methods into appropriate Class (organize app.jsx)


## Add New (if time)
- Page2: Where do analysts have the similarities? (on ticker name) 
    - Add a master conviction column that aggregates all analysts recommmendations (if same name)
    - For now 100% = 4/4 analysts rank this with full confidence
    
    
- Page2: What has changed since last analyst prediction? (need change data or at least last prediction)
- Page3: Track performance from announcement to effective date, from effective date to t+15 etc...
    - Performance is measured in volume, ie."OFFICIAL_CLOSE_AUCTION_VOLUME" will be the value to compare to our "Demand Shares" data


### Changelog (April 1st, 2022) 
    - Charting: Excess Volume Analysis Added 
    - Optimization: Improved ticker data api call performance
    - Optimization: Removed error message on initial load 

### Changelog (March 18th, 2022)
    - Graphing: Add currency to y-axis price and benchmark titles 
    - DataTable: correct dates from string to "Dates" format

### Changelog (March 17th, 2022)
    - Database: Loaded remaining Intropic API data and corresponding Bloomberg historical data 
    - Database: Intropic, BrianFreitas, and Bloomberg data may now be uploaded directly to MongoDB cloud
    - Graphing: Added ticker/benchmark price ratio (ticker and benchmark raw price hidden by default)
    - Graphing: Display x-axis dates with correct "Dates" format
    - Interaction: Dropdown options are now dynamic (include all events and countries)
    
### Changelog (March 16th, 2022)
    - Deployment: Exposed web application at https://rebalances.herokuapp.com/ 
    - Database: MongoDB Cloud configured and deployed

### Changelog (March 14th, 2022) 
    - DataTable: Columns may now be sorted by clicking column headers 

### Changelog (March 11, 2022)
    - Graphing: Add benchmark data to graph (static csv)
    - Config: Moved benchmark period from 9 months ago for 3 months to 6 months ago for 3 months 

### Changelog (March 9th, 2022)
    - Graphing: Historical ticker price and volume added to graph (static data from csv)
    - Interaction: Dropdown menu to filter DataTable added (dropdown options static)

### Changelog (March 7th, 2022)
    - Initial Commit: Web application skeleton (DataTable) deployed with static data (csv) and locally hosted