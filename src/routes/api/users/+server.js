import { json } from '@sveltejs/kit';
import { createUserRepository } from '$lib/data/repositories/userRepositories';

export const POST = async ({request}) => {
  try {
    const req = await request.json();

    const user = await createUserRepository(req);

    return json({ status: true, message: 'success!', user });
  } catch (err) {
    return json({ status: false, message: err.message });
  }
}