const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    //        useCreateIndex: true,
    //        useFindAndModify: false
        });
    
        console.log('Online databases');

    } catch (error) {
        console.log(error);
        throw new Error('Failed to start the database');
    }

}

module.exports = {
    dbConnection
}
