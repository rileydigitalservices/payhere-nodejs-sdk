import { AssertionError } from "assert";

import * as payhere from "../src";

import { expect } from "./chai";

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

describe("PayhereClient", function() {
  describe("#create", function() {
    context("when there is no app id", function() {
      it("throws an error", function() {
        expect(payhere.create.bind({})).to.throw(AssertionError);
      });
    });

    context("when there is a app id", function() {
      it("throws doesn't throw  an error", function() {
        expect(
          payhere.create.bind({ defaultGlobalConfig, userConfig })
        ).to.not.throw();
      });

      it("returns a creator for Inpayments client", function() {
        expect(payhere.create(defaultGlobalConfig, userConfig))
          .to.have.property("Inpayments")
          .that.is.a("function");
      });

      it("returns a creator for Outpayments client", function() {
        expect(payhere.create(defaultGlobalConfig, userConfig))
          .to.have.property("Outpayments")
          .that.is.a("function");
      });
    });
  });
});
