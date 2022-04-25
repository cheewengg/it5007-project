# Setup

## Run a Docker Container (Windows CMD or equivalent)
docker run -dit -p 3000:3000 -p 8000:8000 --name webapp ubuntu:latest

## Install NVM and GIT
apt update && apt upgrade
apt install wget 
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
apt install git
nvm install 14.1.0
nvm use 14.1.0

## Clone Project 
git clone https://github.com/cheewengg/rebalance.git


## Commands to Launch Webapp
```
cd api
npm install
screen npm start
```

```
cd ../ui
npm install
npm run compile
screen npm start
```

View application @ http://localhost:8000/
