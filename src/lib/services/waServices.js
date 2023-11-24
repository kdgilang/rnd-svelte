import { localProvider } from "$lib/providers/localProvider";

/**
 * 
 * @param {String} waNumber 
 * @returns Promise<Object>
 */
export const sendWaOtpService = async (waNumber) => {
  return localProvider('/wa/otp', 'POST', waNumber)
}