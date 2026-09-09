export class ApiError extends Error {
  public readonly details: string[];

  constructor(message: string, details: string[]) {
    super(message);
    this.name = 'ApiError';
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}