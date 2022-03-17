## Must Add / Change 
- Graph: Add Excess Volume Analysis
- Excess Volume V2 only counts if price % chg vs INDEX matches direction (add vs Index part)

## Graph & Graph Formatting 
- Price (left y-axis column): Add Currency to y-axis values (KRW, USD, AUD, GBP, etc)
- Price (left y-axis column): Add commas to numbers above 1,000 (usually KRW)

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


### Changelog (March 17th, 2022)
    - Loaded remaining Intropic API data and corresponding Bloomberg historical data 
    - Added ticker price / benchmark price ratio to chart (ticker and benchmark raw price hidden by default)
    - Dropdown options are now dynamic (include all events and countries)
    - Intropic and BrianFreitas data now uploads directly to MongoDB cloud (backend enhancement)
    - Display chart x-axis dates with correct "Dates" format


### Changelog (March 16th, 2022)
    - MongoDB Cloud (Atlas) configured and deployed

### Changelog (March 14th, 2022) 
    - Sorting: Columns may now be sorted

### Changelog (March 11, 2022)
    - Add benchmark data to graph
    - Moved benchmark period from 9 months ago for 3 months to 6 months ago for 3 months 