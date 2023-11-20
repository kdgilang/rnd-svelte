import { TransactionsModel } from '$lib/data/models/transactions';
import { connectDB, disconnectDB } from '$lib/data';

export const getTransactionRepository = async (query) => {
  try {
    await connectDB();
    const transaction = await TransactionsModel.findOne(query)
      .populate({
        path: 'carts',
        populate: {
          path: 'product'
        }
      }).lean();
    await disconnectDB();

    if (!transaction) {
      throw Error('No transaction found.');
    }

    return transaction;
  } catch (error) {
    console.error('getTransactionRepository:', error);
    throw error;
  }
}

export const getTransactionsRepository = async (query) => {
  try {
    await connectDB();
    const transactions = await TransactionsModel.find(query)
      .populate('carts').lean();
    await disconnectDB();

    if (!transactions) {
      throw Error('No transactions found.');
    }

    return transactions;
  } catch (error) {
    console.error('getTransactionsRepository:', error);
    throw error;
  }
}

export const updateTransactionRepository = async (query, newData) => {
  try {
    newData.updated_date = Date.now();

    await connectDB();
    const Transactions = await TransactionsModel.findOneAndUpdate(query, newData).exec();
    await disconnectDB();

    if (!Transactions) {
      throw Error('No transaction found.');
    }

    return Transactions;
  } catch (error) {
    console.error('updateTransactionRepository:', error);
    throw error;
  }
}

export const createTransactionRepository = async (data) => {
  try {
    await connectDB();
    const transactions = await TransactionsModel.create(data);
    await disconnectDB();

    return transactions;
  } catch (error) {
    console.error('createTransactionRepository:', error);
    throw error;
  }
}