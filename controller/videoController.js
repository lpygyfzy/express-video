exports.list = async (req, res) => {
    console.log('userlist',req.method);
    res.send('/video-list');
}

exports.delete = async (req, res) => {
    console.log('userDelete',req.method);
}