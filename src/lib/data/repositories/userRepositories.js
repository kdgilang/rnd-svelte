import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';

export const updateUserRepository = async (query, newData) => {
  try {
    await connectDB();

    newData.updated_date = Date.now();
  
    const userModel = await UsersModel.findOneAndUpdate(query, {
      ...newData
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