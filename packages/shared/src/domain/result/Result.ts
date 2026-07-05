export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  private readonly _value?: T;
  private readonly _error?: AppError;

  private constructor(isSuccess: boolean, error?: AppError, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error.");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result must contain an error.");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;
    this._error = error;
    
    Object.freeze(this);
  }

  public get value(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result. Error: ${JSON.stringify(this._error)}`);
    }
    return this._value as T;
  }

  public get error(): AppError {
    if (this.isSuccess) {
      throw new Error("Cant retrieve the error from a successful result.");
    }
    return this._error as AppError;
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static failure<U>(error: AppError): Result<U> {
    return new Result<U>(false, error, undefined);
  }
}
