import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';

export const updateUserRepository = async (userId, newData) => {
  try {
    await connectDB();

    newData.updated_date = Date.now();
  
    const userModel = await UsersModel.findOneAndUpdate({ _id: userId, }, {
      ...newData
    }).exec();
  
    if (!userModel) {
      throw Error('User not found.');
    }

    await disconnectDB();
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