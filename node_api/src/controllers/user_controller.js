const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt  = require('jsonwebtoken')
const global_constants = require('../middleware/global_constants')

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log({ email, password })
    await User.findOne({ email })
        .then ( user => {
            if(user === null){
                const message = `L'utilisateur n'existe pas.`
                return res.status(404).json({message})
            }

            //bcrypt.compare(pass en claire, pass en hash)
            bcrypt.compare(req.body.password, user.password)
            .then( isPasswordValid => {
                if(!isPasswordValid){
                    const message = `Le mot de passe est incorrect.`
                    return res.status(401).json({message})    
                }

                //JWT
                const token = jwt.sign(
                    //information utilisateur
                    {
                        userId: user.id, 
                        email: user.email,
                        name: user.name,
                        firstname: user.firstname,
                        role:{ 
                            designation: user.role.desigantion,
                            code: user.role.code
                        },
                        avatar: user.avatar
                    }, 
                    global_constants.private_key,        //clef secrete 
                    {expiresIn: '24h'}  //duree de validite
                )
                
                const message = `L'utilisateur est connecte avec succes.`
                return res.json({message, data: user, token})
            })          
        })
        .catch( error => {             
            const message = `L' utilisateur n'a pas pu etre connecte. Reessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        })
}

module.exports.save = async (req, res) => {
    const salt = await bcrypt.genSalt();    
    let { email, password, name, firstname, role, avatar } = req.body;
    
    //encrypt password
    bcrypt.hash(password, salt)
    .then( async hash => {
        //save user
        password = hash
        await User.create({ email, password, name, firstname, role, avatar })
            .then ( user => {                   
                const message = "user added successfully"                 
                res.status(201).json({message: message, data: user});
            })
            .catch( error => {
                return res.status(400).json({message: error.message, data: error})
            })            
        })        
}

module.exports.find = async (req, res) => {    
    
    await User.find()
        .populate('role')
        .then ( users => {    
            const response = {
                message: "list obtained successfully",
                data: users                 
            }
            res.status(201).json({ response: response });
        })
        .catch( error => {
            return res.status(400).json({message: error.message, data: error})
        })            
            
}

module.exports.findByRole = async (req, res) => {        
    const role_designation = req.params.role;

    await User.find()
        .populate('role')
        .then ( users => {   
            let result = users.filter( user => user.role.designation === role_designation) 
            
            const response = {
                message: `list of all ${role_designation} user obtained successfully`,
                data: result                 
            }
            res.status(201).json({ response: response });
        })
        .catch( error => {
            return res.status(400).json({message: error.message, data: error})
        })            
            
}


module.exports.findById = async (req, res) => {        
    await User.findById(req.params.id)
        .populate('role')   
        .then ( user => {    
            const response = {
                message: `user obtained successfully`,
                data: user                 
            }
            res.status(201).json({ response: response });
        })
        .catch( error => {
            return res.status(400).json({message: error.message, data: error})
        })            
            
}


module.exports.sendMail = async(req, res) => {
    // try {
    await sendMail('ainafitiavana0120@gmail.com', 'Bienvenue!', 'Votre compte a été créé avec succès.');
    const response = {
        message: "envoie mail success",
    };
    res.status(201).json(response);
    // } catch (error) {
    //     res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.', error });
    // }
};

