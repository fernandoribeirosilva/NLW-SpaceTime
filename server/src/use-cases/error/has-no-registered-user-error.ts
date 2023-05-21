export class HasNoRegisteredUserError extends Error {
  constructor() {
    super('has no registered user.')
  }
}
