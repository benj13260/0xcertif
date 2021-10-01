# Stake DAO protocol data analytics

by [@benjk6](https://twitter.com/benjK6)
Based on
[tomastrajan](https://raw.githubusercontent.com/tomastrajan/angular-ngrx-material-starter)

## Table of Content

- Goals
- Features
- Getting started

## Goals

Dashboard for Stake DAO protocol data analytics

### V1

- Retrieve strategies from MasterChef Contract 0xfea5e213bbd81a8a94d0e1edb09dbd7ceab61e1c
- Display yVault Contract information for each strategy (e.g sdeursCRV: 0xCD6997334867728ba14d7922f72c893fcee70e84) (token, balance and supply)
- Display yearly inflow / outflow information for each strategy

## APIs

- Use of Infura as ETH client to retrieve contract information
- Use bitQuery graphQL to retrieve inflow / outflow information

Copy: app.properties-fake.ts into app.properties.ts with own keys

## Getting started

- git clone ..
- npm install
- ng serve
- ng build
