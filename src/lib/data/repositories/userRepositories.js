import { dbProvider } from "$lib/shared/providers/dbProvider"

export const createUserRepository = async (user) => {
  return dbProvider('/users', 'POST', user)
}

export const verificationRepository = async (data) => {
  return dbProvider('/users/verify', 'POST', data)
}

export const sendVerificationRepository = async (waNumber) => {
  return dbProvider('/users/send-verification', 'POST', waNumber)
}

export const authRepository = async (data) => {
  return dbProvider('/users/auth', 'POST', data)
}