import { redirect } from '@sveltejs/kit';
import { connectDB, disconnectDB } from '$lib/data';
import { UsersModel } from '$lib/data/models/users';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const waNumber = cookies.get('waNumber');

  await connectDB();
  const user = await UsersModel.findOne({ waNumber }).exec();
  await disconnectDB();

  // check if user session exists on signin page
	if (!user) {
    throw redirect('302', '/signin');
	}

	return {
		waNumber
	};
}
