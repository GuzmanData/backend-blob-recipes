const jwt = require('jsonwebtoken');



const generateJwt = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '6h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'There was a problem generating the token' )
            } else {
                resolve( token );
            }
        })

    });
}




module.exports = {
    generateJwt
}

