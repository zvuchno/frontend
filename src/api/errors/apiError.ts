export class ApiError extends Error {
  public readonly details: Record<string, string>;

  constructor(message: string, details: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.details = { ...details };
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
