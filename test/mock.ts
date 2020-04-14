import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { Payment } from "../src/inpayments";
import { Transfer } from "../src/outpayments";

export function createMock(): [AxiosInstance, MockAdapter] {
  const client = axios.create({
    headers: {
      "Content-Type": "application/json"
    }
  });

  const mock = new MockAdapter(client);

  mock.onGet("/test").reply(200);

  mock.onPost("/inpayments").reply(201);

  mock.onGet(/\/inpayments\/[\w\-]+/).reply(200, {
    processingNumber: "string",
    amount: "2000",
    msisdn: "256772000000",
    narration: "test",
    status: "SUCCESSFUL"
  } as Payment);

  mock.onPost("/outpayments").reply(201);

  mock.onGet(/\/outpayments\/[\w\-]+/).reply(200, {
    processingNumber: "string",
    amount: "2000",
    msisdn: "256772000000",
    narration: "test",
    status: "SUCCESSFUL"
  } as Transfer);

  return [client, mock];
}
