import { json } from '@sveltejs/kit';
import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { flipProvider } from '$lib/providers/flipProvider';
import { dateFormatted } from '$lib/utils/dateFormatted';
import { getCartsRepository } from '$lib/data/repositories/cartRepositories';
import { createTransactionRepository } from '$lib/data/repositories/transactionRepositories';


export const POST = async ({cookies}) => {
  try {
    const token = cookies.get('userToken');
    const { user } = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

    if (!user) {
      throw Error('Unauthorized.');
    }

    const carts = await getCartsRepository({ user: user._id });

    if (carts.length < 1) {
      throw Error('Empty cart.');
    }

    const totalAmount = carts?.reduce((prev, item) => (
      prev + (item?.product.price * item.quantity)
    ), 0) + 10000;

    const payload = {
      title: 'Berbuah bill',
      amount: totalAmount,
      type: 'SINGLE',
      expired_date: dateFormatted(new Date(Date.now() + 8 * (60 * 60 * 1000))),
      redirect_url: 'https://berbuah.vercel.app/transactions',
      is_address_required: 0,
      is_phone_number_required: 1,
      sender_name: user.name,
      sender_address: user.address,
      sender_phone_number: user.waNumber,
      customer: {
        name: user.name,
        address: user.address,
        phone: `+${user.waNumber}`,
      }
    };

    const res = await flipProvider('/bill', 'POST', payload);

    if (res.errors?.length) {
      throw Error(res.errors[0]?.message);
    }

    await createTransactionRepository({
      user: user._id,
      carts: carts.map(cart => cart._id),
      flip: res
    });

    const { link_url } = res;

    return json({ status: true, message: 'success!', link_url });
  } catch (err) {
    return json({ status: false, message: err.message });
  }
}