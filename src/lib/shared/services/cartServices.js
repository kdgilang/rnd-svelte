import { localProvider } from "../providers/localProvider"

export const createCartService = async (data) => {
  return localProvider('/carts', 'POST', data);
}