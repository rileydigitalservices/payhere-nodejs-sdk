import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import Outpayments from "../src/outpayments";

import { createMock } from "./mock";

import { TransferRequest } from "../src/outpayments";

describe("Outpayments", function() {
  let outpayments: Outpayments;
  let mockAdapter: MockAdapter;
  let mockClient: AxiosInstance;

  beforeEach(() => {
    [mockClient, mockAdapter] = createMock();
    outpayments = new Outpayments(mockClient);
  });

  describe("transfer", function() {
    context("when the amount is missing", function() {
      it("throws an error", function() {
        const request = {} as TransferRequest;
        return expect(outpayments.transfer(request)).to.be.rejectedWith(
          "amount is required"
        );
      });
    });

    context("when the amount is not numeric", function() {
      it("throws an error", function() {
        const request = { amount: "alphabetic" } as TransferRequest;
        return expect(outpayments.transfer(request)).to.be.rejectedWith(
          "amount must be a number"
        );
      });
    });

    it("makes the correct request", function() {
      const request: TransferRequest = {
        amount: "50",
        processingNumber: "123456",
        msisdn: "256774290781",
        narration: "testing"
      };
      return expect(
        outpayments.transfer({ ...request })
      ).to.be.fulfilled.then(() => {
        expect(mockAdapter.history.post).to.have.lengthOf(1);
        expect(mockAdapter.history.post[0].url).to.eq(
          "/outpayments"
        );
        expect(mockAdapter.history.post[0].data).to.eq(JSON.stringify(request));
        expect(mockAdapter.history.post[0].headers["APP-ID"]).to.be.a(
          "string"
        );
      });
    });
  });

  describe("getTransaction", function() {
    it("makes the correct request", function() {
      return expect(
        outpayments.getTransaction("reference")
      ).to.be.fulfilled.then(() => {
        expect(mockAdapter.history.get).to.have.lengthOf(1);
        expect(mockAdapter.history.get[0].url).to.eq(
          "/outpayments/reference"
        );
      });
    });
  });
});
