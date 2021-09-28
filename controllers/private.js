exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true, 
        data: 'OMG Cool! This is all of your secret stuff <3'
    })
}