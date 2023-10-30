import { json } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';

export const POST = async ({request}) => {
  try {
    const req = await request.json();
    await connectDB();
    const res = await UsersModel.create(req);
    await disconnectDB();

    return json(res);
  } catch (err) {
    return json(err);
  }
}