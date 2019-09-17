

module.exports = (req, res, next) => {
    //check if user logged in === do we have info about user in our session?
    console.log("req.ses", req.session)
    if(req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "You must be logged in to view this content"})
    }

};