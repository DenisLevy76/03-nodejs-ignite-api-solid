export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Account with the same e-mail already exists.')
  }
}
