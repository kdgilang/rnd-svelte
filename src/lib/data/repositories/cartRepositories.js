import { CartsModel } from '$lib/data/models/carts';
import { connectDB, disconnectDB } from '$lib/data';


export const getCartsRepository = async (query) => {
  try {
    await connectDB();
    const carts = await CartsModel.find(query)
      .populate('product').lean();
    await disconnectDB();

    if (!carts) {
      throw Error('No carts found.');
    }

    return carts;
  } catch (error) {
    console.error('getCartsRepository:', error);
    throw error;
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
    console.error('updateCartRepository:', error);
    throw error;
  }
}

export const createCartRepository = async (data) => {
  try {
    await connectDB();
    const carts = await CartsModel.create(data);
    await disconnectDB();

    return carts;
  } catch (error) {
    console.error('createCartRepository:', error);
    throw error;
  }
}