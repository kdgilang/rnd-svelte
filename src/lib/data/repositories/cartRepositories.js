import { CartsModel } from '$lib/data/models/carts';
import { connectDB, disconnectDB } from '$lib/data';


export const getCartsRepository = async (query) => {
  try {
    await connectDB();
    const carts = await CartsModel.find(query).exec();
    await disconnectDB();

    if (!carts) {
      throw Error('No carts found.');
    }

    return carts;
  } catch (error) {
    return { error }
  }
}

export const updateCartRepository = async (query, newData) => {
  try {
    newData.updated_date = Date.now();

    await connectDB();
    const carts = await CartsModel.findOneAndUpdate(query, newData).exec();
    await disconnectDB();

    if (!carts) {
      throw Error('Not found.');
    }

    return carts;
  } catch (error) {
    return { error }
  }
}

export const createCartRepository = async (data) => {
  try {
    await connectDB();
    const carts = await CartsModel.create(data);
    await disconnectDB();

    return carts;
  } catch (error) {
    return { error }
  }
}