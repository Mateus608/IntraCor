const isAdmin = (req, res, next) => {
    if (req.session.usuario && req.session.nivel === 'admin') {
        return next(); 
    }
    res.redirect('/cliente'); 
};

module.exports = { isAdmin };