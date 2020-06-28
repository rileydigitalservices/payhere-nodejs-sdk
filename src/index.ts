export { Payment, PaymentRequest } from "./inpayments";
export { Transfer, TransferRequest } from "./outpayments";
export * from "./errors";
export {
  TransactionStatus as Status,
  Environment,
  FailureReason,
  GlobalConfig,
  UserConfig
} from "./common";

import { AxiosInstance } from "axios";

import Inpayments from "./inpayments";
import Outpayments from "./outpayments";

import { createClient } from "./client";

import {
  validateGlobalConfig,
  validateUserConfig
} from "./validate";

import {
  Config,
  Environment,
  GlobalConfig,
  UserConfig
} from "./common";

export interface PayhereClient {
  Inpayments(): Inpayments;
  Outpayments(): Outpayments;
}

// const defaultGlobalConfig: GlobalConfig = {
//   baseUrl: "https://api-sandbox.payhere.africa",
//   environment: Environment.SANDBOX
// };

// const userConfig: UserConfig = {
//   appId: "11011",
//   username: "sdk",
//   password: "sdk@2020"
// };

/**
 * Initialise the library
 *
 * @param globalConfig Global configuration required to use in making requestests
 * @param userConfig configuration required to use in authentication
 */
export function create(globalConfig: GlobalConfig, userConfig: UserConfig): PayhereClient {
  validateGlobalConfig(globalConfig);
  validateUserConfig(userConfig);
  const baseUrl = Environment.SANDBOX ? `https://api-sandbox.payhere.africa/${globalConfig.version}`
                                      : `https://api.payhere.africa/${globalConfig.version}`;
  const modifiedGlobalConfig: GlobalConfig = {
    ...globalConfig,
    baseUrl
  };

  return {
    Inpayments(): Inpayments {
      const client: AxiosInstance = createClient({
        ...modifiedGlobalConfig,
        ...userConfig });

      return new Inpayments(client);
    },

    Outpayments(): Outpayments {

      const client: AxiosInstance = createClient({
        ...globalConfig,
        ...userConfig});

      return new Outpayments(client);
    }
  };
}
