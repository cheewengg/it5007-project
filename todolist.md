## Must Add / Change 
- Graph: Add Excess Volume Analysis
- Excess Volume V2 only counts if price % chg vs INDEX matches direction (add vs Index part)

## Graph & Graph Formatting 
- Add ratio of ticker/idx price to graph (line)
- Price (left y-axis column): $ Sign for needs to be "KRW" for South Korean Won or "£" for British Pounds (consider adding just KRW, USD, AUD, GBP etc)
- Price (left y-axis column): Add commas to numbers above 1,000 (usually KRW)

## Table Formatting
- Format dates properly (currently string)

## Infrastructure
- Dropdown menus need to function properly
- Shortlist button needs functionality (add to list and master "export to csv" button) 
- Load graph data only when visualize button for the specific ticker is clicked (right now i'm loading the entire collection which leads to slow startup time)
- put methods into appropriate Class (organize app.jsx)


## Add New (if time)
- Page2: Where do analysts have the similarities? (on ticker name) 
    - Add a master conviction column that aggregates all analysts recommmendations (if same name)
    - For now 100% = 4/4 analysts rank this with full confidence
    
    
- Page2: What has changed since last analyst prediction? (need change data or at least last prediction)
- Page3: Track performance from announcement to effective date, from effective date to t+15 etc...
    - Performance is measured in volume, ie."OFFICIAL_CLOSE_AUCTION_VOLUME" will be the value to compare to our "Demand Shares" data

- clean up python code (class Intropic & class BrianFreitas)


### Changelog (March 17th, 2022)
    - Loaded remaining Intropic API data and corresponding Bloomberg historical data 
    - Added ticker price / benchmark price ratio to chart (ticker and benchmark raw price hidden by default)
    - Intropic and BrianFreitas data now uploads directly to MongoDB cloud (backend enhancement)
    - Display chart x-axis dates with correct "Dates" format
    - Correct chart legend name for ticker (previously displaying index name)

### Changelog (March 16th, 2022)
    - MongoDB Cloud (Atlas) configured and deployed

### Changelog (March 14th, 2022) 
    - Sorting: Columns may now be sorted

### Changelog (March 11, 2022)
    - Add benchmark data to graph
    - Moved benchmark period from 9 months ago for 3 months to 6 months ago for 3 months 