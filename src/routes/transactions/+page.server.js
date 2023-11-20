import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { getTransactionsRepository } from '$lib/data/repositories/transactionRepositories';

export async function load({ cookies }) {
  try {
    const token = cookies.get('userToken');
    const {user} = jwt.verify(token, JWT_SECRET_KEY);

    const transactions = await getTransactionsRepository({ user: user._id});
    
    return {
      transactions: JSON.parse(JSON.stringify(transactions))
    }
  } catch (error) {
    throw redirect('302', '/');
  }
}