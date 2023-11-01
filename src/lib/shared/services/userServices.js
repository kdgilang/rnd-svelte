import { dbProvider } from "$lib/shared/providers/dbProvider";

export const createUserService = async (user) => {
  return dbProvider('/users', 'POST', user)
}

export const verificationService = async (data) => {
  return dbProvider('/users/verify', 'POST', data)
}

export const sendVerificationService = async (waNumber) => {
  return dbProvider('/users/send-verification', 'POST', waNumber)
}

export const authService = async (data) => {
  return dbProvider('/users/auth', 'POST', data)
}