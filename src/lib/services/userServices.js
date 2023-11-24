import { localProvider } from "$lib/providers/localProvider";

export const createUserService = async (user) => {
  return localProvider('/users', 'POST', user)
}

export const verificationService = async (data) => {
  return localProvider('/users/verify', 'POST', data)
}

export const authService = async (data) => {
  return localProvider('/users/auth', 'POST', data)
}