const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path:'C:/Users/Vibhu/React js/collab/Backendd/.env'})

main().catch(err => console.error(err));

async function main() {
  await mongoose.connect(`${process.env.MONGO_URI}`);
  console.log("mongooose connected");
}
