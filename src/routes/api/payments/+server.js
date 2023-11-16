import { json } from '@sveltejs/kit';
import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { flipProvider } from '$lib/shared/providers/flipProvider';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { dateFormatted } from '$lib/shared/utils/dateFormatted';
import { getCartsRepository } from '$lib/data/repositories/cartRepositories';


export const POST = async ({cookies}) => {
  try {
    const token = cookies.get('userToken');
    const { user } = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

    if (!user) {
      throw Error('Access denied.');
    }

    const carts = await getCartsRepository({ user: user._id });

    const totalAmount = carts?.reduce((prev, item) => (
      prev + (item?.product.price * item.product.quantity)
    ), 0) + 10000;

    const payload = {
      title: 'Berbuah bill',
      amount: totalAmount,
      type: 'SINGLE',
      expired_date: dateFormatted(new Date(Date.now() + 8 * (60 * 60 * 1000))),
      redirect_url: `${PUBLIC_BASE_URL}/payment-status`,
      is_address_required: 0,
      is_phone_number_required: 1
    };

    const res = await flipProvider('/bill', 'POST', payload);

    if (res.errors?.length) {
      throw Error(res.errors[0]?.message);
    }

    return json({ status: true, message: 'success!'});
  } catch (err) {
    return json({ status: false, message: err.message });
  }
}