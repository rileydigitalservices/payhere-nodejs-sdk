const payhere = require("../lib");

const { Outpayments } = payhere.create();

// initialise collections
const outpayments = Outpayments();

// Transfer
outpayments
  .transfer({
    phone_number: "256774290781",
    amount: "50",
    processing_number: "947354",
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
