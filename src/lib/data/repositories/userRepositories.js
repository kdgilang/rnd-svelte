import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';

export const createUserRepository = async (user) => {
  try {
    await connectDB();
    const res = await UsersModel.create(user);
    await disconnectDB();

    return res;
  } catch (error) {
    console.error('createUserRepository:', error);
    throw error;
  }
}

export const updateUserRepository = async (query, user) => {
  try {
    await connectDB();

    user.updated_date = Date.now();
  
    const userModel = await UsersModel.findOneAndUpdate(query, {
      ...user
    }).exec();

    await disconnectDB();

    if (!userModel) {
      throw Error('Not found.');
    }
    
    return userModel;
  } catch (error) {
    console.error('updateUserRepository:', error);
    throw error;
  }
}

export const getUserByQueryRepository = async (query) => {
  try {
    await connectDB();
    const user = await UsersModel.findOne(query).exec();
    await disconnectDB();
  
    return user;
  } catch(error) {
    console.error('getUserByQueryRepository:', error);
    throw error;
  }
}