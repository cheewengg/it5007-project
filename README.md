# Index Rebalance Watchlist 

## To Start New Development Environment

### Docker Pull Image 
- docker pull garyngkaiyi/webapp
- docker run -dit -p 3000:3000 --name devtest2 garyngkaiyi/webapp

### Git Config User & E-mail
- git config --global user.name "Your Name"
- git config --global user.email "Your Email" 

### Git Pull Latest Code 
- git clone https://github.com/cheewengg/rebalance.git
- enter github name & github password
- git checkout code 

### NPM Install 
npm install --save-dev @babel/core@7 @babel/cli@7
npm install --save-dev @babel/preset-react@7

### Compile Latest Source Code
- npx babel src --presets @babel/react --out-dir public

### Launch MongoDB Server (Separate Ubuntu CLI) 
- mongod --dbpath ~/data/db


### Initialize MongoDB Database
- mongo indexrebalance scripts/init.mongo.js
