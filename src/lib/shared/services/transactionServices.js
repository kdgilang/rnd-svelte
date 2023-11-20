import { localProvider } from "../providers/localProvider"

export const createTransactionService = async (data) => {
  return localProvider('/transactions', 'POST', data);
}