import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect, error } from '@sveltejs/kit';
import { getTransactionRepository, updateTransactionRepository } from '$lib/data/repositories/transactionRepositories';
import { flipProvider } from '$lib/shared/providers/flipProvider';

export async function load({ cookies, params }) {
  try {
    const token = cookies.get('userToken');
    const { user } = jwt.verify(token, JWT_SECRET_KEY);

    if (!user) {
      throw redirect('302', '/');
    }

    const transaction = await getTransactionRepository({ user: user._id, _id: params.slug });

    if (!transaction) {
      throw error(404, 'Not Found');
    }

    const flipRes = await flipProvider(`/${transaction.flip.link_id}/bill`, 'GET');

    await updateTransactionRepository({ _id: transaction._id }, {
      flip: flipRes
    });

    transaction.flip = flipRes;
    
    return {
      transaction: JSON.parse(JSON.stringify(transaction))
    }
  } catch (error) {
    return { errorMessage: error.message }
  }
}