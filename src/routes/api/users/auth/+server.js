import { json } from '@sveltejs/kit';
import { createUserService, sendVerificationService } from "$lib/shared/services/userServices";

export const POST = async ({request}) => {
  try {
    const { waNumber } = await request.json();

    const res = await sendVerificationService(waNumber);

    console.log(res);

    if (res?.error) {
      throw res?.error;
    }

    await createUserService({
      name: '',
      waNumber: res.waNumber,
      verification: {
        status: false,
        code: res.code
      }
    });

    return json({ status: true, message: 'success', waNumber });
  } catch (error) {
    return json({ error });
  }
}