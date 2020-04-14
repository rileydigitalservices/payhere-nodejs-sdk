import { AxiosError } from "axios";
import { Payment } from "./inpayments";
import { FailureReason } from "./common";
import { Transfer } from "./outpayments";

interface ErrorBody {
  code: FailureReason;
  message: string;
}

export class PayhereError extends Error {
  public transaction?: Payment | Transfer;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InternalProcessingError extends PayhereError {
  public name = "InternalProcessingError";
}

export class NotAllowedTargetEnvironmentError extends PayhereError {
  public name = "NotAllowedTargetEnvironmentError";
}

export class NotAllowedError extends PayhereError {
  public name = "NotAllowedError";
}

export class ResourceAlreadyExistError extends PayhereError {
  public name = "ResourceAlreadyExistError";
}

export class ResourceNotFoundError extends PayhereError {
  public name = "ResourceNotFoundError";
}

export class ServiceUnavailableError extends PayhereError {
  public name = "ServiceUnavailableError";
}

export class TransactionCancelledError extends PayhereError {
  public name = "TransactionCancelledError";
}

export class UnspecifiedError extends PayhereError {
  public name = "UnspecifiedError";
}

export function handleError(error: AxiosError): Error {
  if (!error.response) {
    return error;
  }

  const { code, message }: ErrorBody = error.response.data || {};

  return getError(code, message);
}

export function getError(code?: FailureReason, message?: string) {

  if (code === FailureReason.INTERNAL_PROCESSING_ERROR) {
    return new InternalProcessingError(message);
  }

  if (code === FailureReason.NOT_ALLOWED) {
    return new NotAllowedError(message);
  }

  if (code === FailureReason.NOT_ALLOWED_TARGET_ENVIRONMENT) {
    return new NotAllowedTargetEnvironmentError(message);
  }

  if (code === FailureReason.RESOURCE_ALREADY_EXIST) {
    return new ResourceAlreadyExistError(message);
  }

  if (code === FailureReason.RESOURCE_NOT_FOUND) {
    return new ResourceNotFoundError(message);
  }

  if (code === FailureReason.SERVICE_UNAVAILABLE) {
    return new ServiceUnavailableError(message);
  }

  return new UnspecifiedError();
}

export function getTransactionError(transaction: Payment | Transfer) {
  const error: PayhereError = getError(transaction.reason as FailureReason);
  error.transaction = transaction;

  return error;
}
