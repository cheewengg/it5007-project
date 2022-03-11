## Must Add / Change 
- Sorting: Add sorting for columns 
- Graph: Add Excess Volume Analysis
- Excess Volume V2 only counts if price % chg vs INDEX matches direction (add vs Index part)
- move benchmark period from 9 months ago for 3 months to 6 months ago for 3 months 


## Graph Formatting 
- Add benchmark data to graph 
- Price (left y-axis column): $ Sign for needs to be "KRW" for South Korean Won or "£" for British Pounds 
- Price (left y-axis column): Add commas to numbers above 1,000 (usually KRW)
- Date (x-axis): remove string & format properly


## Table Formatting
- Format dates properly (currently string)


## Infrastructure
- Dropdown menus need to function properly
- Shortlist button needs functionality (add to list and master "export to csv" button) 
- Query Graph data only when visualize for the specific ticker is clicked (right now i'm querying the entire collection)


## Add New (if time)
- Page2: Where do analysts have the similarities? (on ticker name) 
    - Add a master conviction column that aggregates all analysts recommmendations (if same name)
    - For now 100% = 4/4 analysts rank this with full confidence
    
    
- Page2: What has changed since last analyst prediction? (need change data or at least last prediction)
- Page3: Track performance from announcement to effective date, from effective date to t+15 etc...
    - Performance is measured in volume, ie."OFFICIAL_CLOSE_AUCTION_VOLUME" will be the value to compare to our "Demand Shares" data

- clean up python code (class Intropic & class BrianFreitas)
