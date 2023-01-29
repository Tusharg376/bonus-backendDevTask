const userModel = require('../models/userModel')

modeule.exports = async function(req,res){
    let data = req.body
    if(Object.keys(data) == 0) return res.status(400).send({status:false,message:"please provide data"})

    let {name,email,password,role} = data

    if(!name) return res.status(400).send({status:false,message:"please provide name"})
    if(!email) return res.status(400).send({status:false,message:"please provide email"})
    if(!password) return res.status(400).send({status:false,message:"please provide password"})
    if(!role) return res.status(400).send({status:false,message:"please provide role"})

    let roleCheck = userModel.schema.obj.role.enum
    if(!role.includes(roleCheck)) return res.status(400).send({status:false,message:"please provide valid role"})

    let emailCheck = await userModel.findOne({email:email})
    if(emailCheck) return res.status(400).send({status:false,message:"please provide unique email"})
    
    let finalData = await userModel.create(data)
    res.status(201).send({status:true,data:finalData})
}