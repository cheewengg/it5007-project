# Index Rebalance Watcher

## To Start New Development Environment
	1. Docker Pull Image 
		- docker pull garyngkaiyi/webapp
		- docker run -dit -p 3000:3000 -p 5000:5000 --name webapp garyngkaiyi/webapp:latest

		- if you need to share local directory with container 
		- docker run -dit -p 3000:3000 --name webapp -v {"C:/Users/..."}:/rebalance ubuntu

	2. Git Config User & E-mail
		- git config --global user.name "Your Name"
		- git config --global user.email "Your Email" 

	3. Git Pull Latest Code 
		- git clone https://github.com/cheewengg/rebalance.git
		- enter github name & github personal access token (if you are not being prompted at this stage, enter your username and personal access token using windows credential manager)
		- cd rebalance
		- git checkout code 

	4. NPM Install 
		- npm install --save-dev @babel/core@7 @babel/cli@7
		- npm install --save-dev @babel/preset-react@7

	5. Compile Latest Source Code
		- npx babel src --presets @babel/react --out-dir public

	6. Launch MongoDB Server (Separate Ubuntu CLI) 
		- mongod --dbpath ~/data/db

	7. Import and Format csv data to MongoDB Database
		- mongoimport --db indexrebalance --collection brianfreitas --drop --type csv --headerline --ignoreBlanks --file data/brian_freitas_processed.csv
		
		- mongoimport --db indexrebalance --collection intropic --drop --type csv --headerline --ignoreBlanks --file data/intropic_processed.csv

		- mongoimport --db indexrebalance --collection historical --drop --type csv --headerline --ignoreBlanks --file data/historical.csv

		- mongo indexrebalance scripts/init.mongo.js

	8. Launch WebApp Server
		- screen npm start (or npm start) (or screen node server.js)


## To Prepare Windows PC for Development (one-time)
	1. Download Docker Desktop 
		- https://www.docker.com/products/docker-desktop
		
	2. Install Windows Subsystem for Linux 
		- https://docs.microsoft.com/en-us/windows/wsl/install

	3. Open Powershell (as admin)
		- dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
		- dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
		- wsl --set-default-version 2

	4. May Need Restart 


## To Re-Create Docker Image
This should not be necessary unless you feel that you would like to recreate the entire docker environment from scratch.

	1. Get Ubuntu Image (Powershell as admin) 
		- docker pull ubuntu
		- docker run -dit -p 3000:3000 --name webapp ubuntu		

	2. Setup Working Environment
		- apt update
		- apt upgrade
		
	3. Install Visual Studio Code Plugin
		- Open VS Code, Extension, Docker 
		- You may run an Ubuntu shell on your image

	4. Install Curl (ubuntu shell) 
		- apt install -y curl
		- apt install -y screen

	5. Install Node Version Manager & Node Package Manager(ubuntu shell)
		- https://github.com/nvm-sh/nvm gives the below: 
		
		- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
		- nvm install 10
		- nvm alias default 10
		- node --version
		- npm --version
		- npm install -g npm@6
		
	6. Install Git 
		apt install -y git 

	7. Install Express
		npm install express
		npm uninstall express
		npm install express@4

	8. Install Mongo DB (worked only in CLI, not code cli)
		apt-get install -y wget
		apt-get update && apt-get install -y gnupg2
		
		MongoDB installation for WSL --> https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database
		Install MongoCLI --> https://docs.mongodb.com/mongocli/stable/install/

	9. Commit Docker Container to Image
		docker commit containerName imageName

	10. Push Docker Image to Repository 
		create public or private repository using docker web UI (requires signin)

		docker tag garyngkayi/webapp garyngkaiyi/webapp
		docker push garyngkaiyi/webapp

	11. Copy Files to and From Container 
		docker cp sourcefile container:directory
		
		copy local files --> docker container or reverse
		- docker cp intropic_processed.csv webapp:rebalance/data
		- docker cp brian_freitas_processed.csv webapp:rebalance/data
		- docker cp historical.csv webapp:rebalance/data
			
		copy docker files --> local PC 
		- docker ps
		- docker cp 135950565ad8:/somefile.txt ~/Desktop/somefile.txt
