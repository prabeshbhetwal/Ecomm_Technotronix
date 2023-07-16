import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn && console.log("MongoDb Connected.");
  } catch (error) {
    console.log(error);
  }
};

export default mongoConnect;
