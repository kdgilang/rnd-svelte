import { ProductsModel } from '$lib/data/models/products';
import { connectDB, disconnectDB } from '$lib/data';


export const getAllProductsRepository = async () => {
  try {
    await connectDB();
    const productsModel = await ProductsModel.find({ status: true }).exec();
    await disconnectDB();
  
    if (!productsModel) {
      throw Error('No products found.');
    }

    return productsModel;
  } catch (error) {
    return { error }
  }
}
