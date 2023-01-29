const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.signup = async function(req,res){
    let data = req.body
    if(Object.keys(data).length == 0) return res.status(400).send({status:false,message:"please provide data"})

    let {name,email,password,role} = data

    if(!name) return res.status(400).send({status:false,message:"please provide name"})
    if(!email) return res.status(400).send({status:false,message:"please provide email"})
    if(!password) return res.status(400).send({status:false,message:"please provide password"})
    if(!role) return res.status(400).send({status:false,message:"please provide role"})

    let roleCheck = userModel.schema.obj.role.enum
    if(!roleCheck.includes(role)) return res.status(400).send({status:false,message:"please provide valid role"})

    let emailCheck = await userModel.findOne({email:email})
    if(emailCheck) return res.status(400).send({status:false,message:"please provide unique email"})

    const salt = await bcrypt.genSalt(password.length);
    const hashedPassword = await bcrypt.hash(password, salt);

    data.password = hashedPassword

    let finalData = await userModel.create(data)
    res.status(201).send({status:true,data:finalData})
}

module.exports.login = async function(req,res){
    let data = req.body
    let {email,password} = data

    if(!email) return res.status(400).send({status:false,message:"please provide email"})
    if(!password) return res.status(400).send({status:false,message:"please provide password"})

    checkEmail = await userModel.findOne({email:email})
    if(!checkEmail) return res.status(400).send({status:false,message:"incorrect email or password"})

    const isMatch = await bcrypt.compare(password, checkEmail.password);
    if(!isMatch) return res.status(400).send({status:false,message:"incorrect email or password"})
    let role = checkEmail.role
   
    let payload = {email, role}
    let token = jwt.sign(payload,'myPassSecret')

    return res.status(200).send({status:true,data:token})
}