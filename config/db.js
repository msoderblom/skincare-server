import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI; // database uri from mongodb atlas dashboard
  // startar kopplingen till db med hjälp av uri
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("MongoDB connection successfull");
};

export default connectDB;
