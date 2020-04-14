const payhere = require("../lib/");

const { Inpayments } = payhere.create();

// initialise inpayments
const inpayments = Inpayments();

// Request to pay
inpayments
  .requestToPay({
    phone_number: "256774290781",
    amount: "50",
    processing_number: "947354",
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
