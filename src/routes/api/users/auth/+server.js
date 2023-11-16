import { json } from '@sveltejs/kit';
import { createUserService, sendVerificationService } from "$lib/shared/services/userServices";

export const POST = async ({request}) => {
  try {
    const { waNumber } = await request.json();

    const res = await sendVerificationService(waNumber);

    if (res?.errorMessage) {
      throw Error(res.errorMessage);
    }

    const userRes = await createUserService({
      name: '-',
      waNumber: res.waNumber,
      verification: {
        status: false,
        code: res.code
      }
    });

    if (userRes?.errors) {
      throw Error(userRes.message);
    }

    return json({ status: true, message: 'success', waNumber });
  } catch (error) {
    return json({ errorMessage: error?.message });
  }
}