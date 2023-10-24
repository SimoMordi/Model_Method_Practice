// connect mongoose to DB

const mongoose = require('mongoose');

let connectionString =`mongodb+srv://simomordi:${process.env.MONGO_PASS}@cluster0.fafsdfc.mongodb.net/Model_Method_Practice?retryWrites=true&w=majority`
console.log(connectionString);


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// log when connected
mongoose.connection.once('open', ()=> {
    console.log('connected to DATABASE');
});