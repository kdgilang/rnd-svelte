import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const token = cookies.get('userToken');
  const userData = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

  // check if user session exists on signin page
  if (!userData?.user) {
    throw redirect('302', '/signin');
  }
}