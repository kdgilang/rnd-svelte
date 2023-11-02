import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';

export const updateUserRepository = async (query, newData) => {
  try {
    await connectDB();

    newData.updated_date = Date.now();
  
    const userModel = await UsersModel.findOneAndUpdate(query, {
      ...newData
    }).exec();
  
    if (!userModel) {
      throw Error('Not found.');
    }

    await disconnectDB();
    
    return userModel;
  } catch (error) {
    return { error }
  }
}

export const getUserByIdRepository = async (userId) => {
  try {
    await connectDB();
    const user = await UsersModel.findOne({ _id: userId }).exec();
    await disconnectDB();
  
    return user;
  } catch(error) {
    return { error }
  }
}