const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            ok:false,
            msg: 'Please validate the token before validating the role'
        });
    }

    const { rol } = req.user;
    
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            ok: false,
            msg: `You need administrator permissions for this action`
        });
    }

    next();
}


module.exports = {
    isAdminRole
}