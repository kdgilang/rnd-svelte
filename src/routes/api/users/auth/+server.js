import { json } from '@sveltejs/kit';
import { createUserRepository, sendVerificationRepository } from "$lib/data/repositories/userRepositories";

export const POST = async ({request}) => {
  try {
    const { name, waNumber } = await request.json();

    const res = await sendVerificationRepository(waNumber);

    if (res?.error) {
      throw res?.error;
    }

    await createUserRepository({
      name,
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