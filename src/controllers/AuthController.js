const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const User = require('../models/user');
const validator=require('../utils/AuthValidator');

exports.signUp = (req, res) => {
    console.log(req.body)
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password,8),
    });
    //save
    user.save((err, user)=> {
        if (err) {
            res.status(500)
                .send({message: err})
            return false;

        } else {
            res.status(200).send({message: 'You have successfully registered on React applicaiton'});
        }
    })
}
exports.signIn = (req,res) => {
    User.findOne({
        email: req.body.email,
    })
        .exec((err, user)=> {
            if(err) {
                res.status(500)
                    .send({message: err})
            } else if (!user){
                res.status(404)
                    .send({message: 'User not found'})
            }
            else{
                //comparing two passwords
                const passwordIsValid=bcrypt.compareSync(req.body.password,user.password);
                if (!passwordIsValid) {
                    return res.status(401).send({access_token: null, message: 'Invalid login credentials'})
                }
                //signing token
                const token=jwt.sign({id: user.id}, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.SECRET_EXPIRATION
                });
                res.status(200)
                    .send({
                        user: {
                            id: user._id,
                            email: user.email,
                            username: user.username,
                        },
                        message: "Login successfully",
                        accessToken: token,
                    })

            }

        })

}
