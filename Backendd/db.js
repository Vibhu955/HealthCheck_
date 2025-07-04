const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path:'E:/Projects/collab/Backendd/.env'})

main().catch(err => console.error(err));
// console.log(process.env.MONGO_URI); 
async function main() {
  await mongoose.connect(`${process.env.MONGO_URI}`);
  console.log("mongooose connected");
}
