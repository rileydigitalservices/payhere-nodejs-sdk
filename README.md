# Payhere API NodeJS Client</h1>

<strong>World class payments for your apps with Payhere API</strong>

<div>
  Join our active, engaged community: <br>
  <a href="https://spectrum.chat/payhere-api-sdk/">Spectrum</a>
  <br><br>
</div>


[![Build Status](https://travis-ci.org/rileydigitalservices/payhere-node-sdk.svg?branch=master)](https://travis-ci.org/rileydigitalservices/payhere-node-sdk)

[![npm package](https://img.shields.io/npm/v/payhere-sdk/latest.svg?style=flat-square)](https://www.npmjs.com/package/payhere-sdk)
[![npm downloads](https://img.shields.io/npm/dt/payhere-sdk.svg?style=flat-square)](https://www.npmjs.com/package/payhere-sdk)
[![GitHub issues](https://img.shields.io/github/issues/rileydigitalservices/payhere-sdk.svg?style=flat-square)](https://github.com/rileydigitalservices/payhere-sdk)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/payhere-sdk.svg?style=flat-square)](https://www.npmjs.com/package/payhere-sdk)
![GitHub](https://img.shields.io/github/license/rileydigitalservices/payhere-sdk.svg?style=flat-square)
![David](https://img.shields.io/david/rileydigitalservices/payhere-sdk.svg?style=flat-square)
![David](https://img.shields.io/david/dev/rileydigitalservices/payhere-sdk.svg?style=flat-square)
[![Known Vulnerabilities](https://snyk.io/test/github/rileydigitalservices/payhere-node-sdk/badge.svg?targetFile=package.json)](https://snyk.io/test/github/rileydigitalservices/payhere-node-sdk?targetFile=package.json)
[![Coverage Status](https://coveralls.io/repos/github/rileydigitalservices/payhere-node-sdk/badge.svg?branch=master)](https://coveralls.io/github/rileydigitalservices/payhere-node-sdk?branch=master)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/payhere-api-sdk/)


## Usage

### Installation

Add the library to your project

```sh
npm install payhere-sdk --save-dev
```

## User Credentials

You get the `APP-ID`, `username` and `password` from `https://dashboard.payhere.africa/register`.

The credentials for the sandbox environment can be used straight away. In production, the credentials are provided for you after KYC requirements are met.

## Configuration

Before we can fully utilize the library, we need to specify global configurations. The global configuration must contain the following:

- `baseUrl`: An optional base url to the Payhere API. By default the staging base url will be used
- `environment`: Optional enviroment, either "sandbox" or "production". Default is 'sandbox'
- `version`: The API version being accessed. This is mandatory.

As an example, you might configure the library like this:

```js
const payhere = require("payhere-sdk");

const defaultGlobalConfig: payhere.GlobalConfig = {
  baseUrl: "http://sandbox.payhere.africa",
  environment: payhere.Environment.SANDBOX,
  version: "v1"
};

const userConfig: payhere.UserConfig = {
  appId: "11011",
  username: "sdk",
  password: "sdk@2020"
};

const { Inpayments, Outpayments } = payhere.create(defaultGlobalConfig, userConfig);
```

## Inpayments

Used for receiving money

You can create a inpayments client with the following:

```js
const inpayments = Inpayments();
```

#### Methods

1. `requestToPay(request: PaymentRequest): Promise<string>`: This operation is used to request a payment from a consumer (Payer). The payer will be asked to authorize the payment. The transaction is executed once the payer has authorized the payment. The transaction will be in status PENDING until it is authorized or declined by the payer or it is timed out by the system. Status of the transaction can be validated by using `getTransaction`

2. `getTransaction(transactionId: string): Promise<Payment>`: Retrieve transaction information using the `transactionId` returned by `requestToPay`. You can invoke it at intervals until the transaction fails or succeeds. If the transaction has failed, it will throw an appropriate error. The error will be a subclass of `PayhereError`. Check [`src/error.ts`](https://github.com/rileydigitalservices/payhere-node-sdk/blob/master/src/errors.ts) for the various errors that can be thrown

#### Sample Code

```js
const payhere = require("payhere-sdk");

const defaultGlobalConfig: payhere.GlobalConfig = {
  baseUrl: "http://sandbox.payhere.africa",
  environment: payhere.Environment.SANDBOX,
  version: "v1"
};

const userConfig: payhere.UserConfig = {
  appId: "11011",
  username: "sdk",
  password: "sdk@2020"
};

const { Inpayments } = payhere.create(defaultGlobalConfig, userConfig);

const inpayments = Inpayments();

// Request to pay
inpayments
  .requestToPay({
    amount: "50",
    processingNumber: "123456",
    msisdn: "256774290781",
    narration: "testing"
  })
  .then(transactionId => {
    console.log({ transactionId });

    // Get transaction status
    return inpayments.getTransaction(transactionId);
  })
  .then(transaction => {
    console.log({ transaction });
  })
  .catch(error => {
    console.log(error);
  });
```

## Outpayments

Used for sending money to users

You can create a outpayments client with the following

```js
const outpayments = Outpayments();
```

#### Methods

1. `transfer(request: TransferRequest): Promise<string>`

Used to transfer an amount from the owner’s account to a payee account. It returns a transaction id which can use to check the transaction status with the `getTransaction` function

2. `getTransaction(transactionId: string): Promise<Transfer>`: Retrieve transaction information using the `transactionId` returned by `transfer`. You can invoke it at intervals until the transaction fails or succeeds. If the transaction has failed, it will throw an appropriate error. The error will be a subclass of `PayhereError`. Check [`src/error.ts`](https://github.com/rileydigitalservices/payhere-node-sdk/blob/master/src/errors.ts) for the various errors that can be thrown

#### Sample Code

```js
const payhere = require("payhere-sdk");

const defaultGlobalConfig: payhere.GlobalConfig = {
  baseUrl: "http://sandbox.payhere.africa",
  environment: payhere.Environment.SANDBOX,
  version: "v1"
};

const userConfig: payhere.UserConfig = {
  appId: "11011",
  username: "sdk",
  password: "sdk@2020"
};
// initialise payhere library
const { Outpayments } = payhere.create(defaultGlobalConfig, userConfig);

// initialise outpayments
const outpayments = Outpayments();

// Transfer
outpayments
  .transfer({
    amount: "50",
    processingNumber: "123456",
    msisdn: "256774290781",
    narration: "testing"
  })
  .then(transactionId => {
    console.log({ transactionId });

    // Get transaction status
    return outpayments.getTransaction(transactionId);
  })
  .then(transaction => {
    console.log({ transaction });
  })
  .catch(error => {
    console.log(error);
  });
```