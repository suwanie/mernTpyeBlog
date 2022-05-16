import mongoose from "mongoose";

const URL = process.env.MONGO_URL;

// const connDB = async () => {
//   try {
const conn = mongoose.connect(`${URL}`, {}, (err) => {
  if (err) throw err;
  console.log("몽고디비 연결 잘 된");
});

//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// module.exports = connDB;
