import { localProvider } from "$lib/shared/providers/localProvider";

export const payService = async () => {
  return localProvider('/payments', 'POST')
}