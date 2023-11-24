import { localProvider } from "$lib/providers/localProvider";

export const payService = async () => {
  return localProvider('/payments', 'POST')
}