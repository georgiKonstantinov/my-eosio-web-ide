# This reposiotry contains source code of EOS Software Lyfecycle Manager and developement environment based on EOSIO Web IDE. Below you can find instructions to run the setup! 

# EOSIO Quickstart Web IDE for decentralized applications ![EOSIO Alpha](https://img.shields.io/badge/EOSIO-Alpha-blue.svg)

[![Software License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](./LICENSE)

EOSIO Quickstart Web IDE lets developers start building full-stack EOSIO applications in a matter of minutes. 

Powered by Gitpod.io and Docker, it provides developers with a personal single-node EOSIO blockchain for development and testing purposes without a need of going through advanced local environment setup. It also includes an example application with a smart contract and web frontend, connected to the blockchain. Developers can also use EOSIO tools like cleos and  eosio.cdt straight out of the box. This project requires zero installation on the user's machine. All code is stored and managed on the developer's personal GitHub account, with the changes saved automatically.

We built this project with ease of use and simplicity in mind. It can be used by new developers trying out or learning EOSIO, as well as advanced developers and teams. It is especially useful in the environments where users don't have full control over the systems they work on (universities, banks, government organizations, etc.) or when they have lower-than-required computer specs to run EOSIO locally.

We hope you will find this project useful and welcome feedback on future improvements.

# Setup

1. Fork this repo to your personal GitHub account so that you can save your work into your personal Github account.

2. Point your browser to the following URL https://gitpod.io/#https://github.com/your-github-account/eosio-web-ide to start the IDE. You will be automatically prompted to create a Gitpod account (all types of Gitpod accounts (including free) will work). You can also choose to provide multiple developers push access to your personal github fork of this repo to collaborate with them (one developer working on the smart contract (C++) while the other working on the front-end decentralized application (EOSJS), etc.). Each such developer sharing access to the forked repo will get their own copy of the EOSIO blockchain components to enable independent development.

You can test drive the system by accessing the IDE at https://gitpod.io/#https://github.com/EOSIO/eosio-web-ide (however you will not be able to save your work into the EOSIO/eosio-web-ide Github repository)

# Instructions

The following instructions assume that the Web IDE was started successfully (see [Setup](#setup)).

## Opening a terminal

To open a terminal, use the Terminal drop-down menu in the IDE user interface.

## Deploying SLM smart contracts

The source code for the smart contracts is at `contract` folder within the IDE. To deploy the contracts, run this in a terminal:

```
./init

```

This will produce `*.abi` and `*.wasm` and will use cleos to deploy them in the blockchain


## Creating users and genarationg sample data using the smart contracts

Run this in a terminal the available sample scrips:
```
./gen-demo-data
./test-contracts
```


## Viewing the front-end decentralized web app (EOSJS):

The source code for the React WebApp is started from `webapp/src/index.tsx` within the IDE. To preview the SLM WebApp Dapps run this in a terminal:

```
gp preview $(gp url 8000)

```

## Resetting the chain

To remove the existing chain and create another:

* Switch to the terminal running `nodeos`
* Press `ctrl+c` to stop it
* Run the following

```
rm -rf ~/eosio/chain
nodeos --config-dir ~/eosio/chain/config --data-dir ~/eosio/chain/data -e -p eosio --plugin eosio::chain_api_plugin --contracts-console

```

Note: if the web app is currently open, then it will cause errors or data disapearing in the UI. 

