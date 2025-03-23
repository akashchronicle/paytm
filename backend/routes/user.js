const express = require('express');
const zod = require('zod');
const { User } = require('../Model/userSchema'); // Ensure this path is correct
const jwt = require('jsonwebtoken');
const router = express.Router();
const {authMiddlewareCheck} = require('../authMiddleware/middleware')
const { JWT_SECRET } = require('../config');
const Account = require('../Model/bank')
// Define Zod schema for validating signup body
const signupBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
});

router.post('/signup', async (req, res) => {
    console.log("Received Body:", req.body);  // Debugging
    
    const success = signupBody.safeParse(req.body);
    if (!success.success) {
        // console.log("Zod Validation Failed:", success.error);
        return res.status(411).json({
            message: "Incorrect inputs or missing fields",
        });
    }
    
    const { email, password, firstName, lastName } = req.body;
    // console.log("Validated Data:", { email, password, firstName, lastName });

    // Check if the email (email) already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken",
        });
    }

    // Create a new user
    const user = await User.create({ email, password, firstName, lastName });
    const userId = user._id;

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })




    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
        msg: "User created successfully",
        token: token,
    });
});



const signinBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
})

router.get('/signin',async (req,res)=>{
  
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const{email,password}= req.body;

    const olduser= await User.findOne({email: email,password:password})
    if(!olduser){
        return res.json({
            msg:"User Not exits"
        })
    }

    const token = jwt.sign({userId:olduser._id},JWT_SECRET,{expiresIn:'1h'})
    res.json({
        msg:"User found sucessfully",
        token:token
    })
});


const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
	password: zod.string().optional()
})

router.put('/update',authMiddlewareCheck,async(req,res)=>{
    const {success}= updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Sahi dalo input"
        })
    }
    await User.updateOne({_id:req.userId},req.body)
    res.json({
        msg:"Updated Successfully"
    })
})

router.get('/search',async(req,res)=>{
    const filter= req.query.filter || "";
    const users= await User.find({
        $or:[{
            firstName:{
                "$regex":filter,
                "$options":"i"
            }
        },{
            lastName:{
                "$regex":filter,
                "$options":"i"
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})


module.exports = router;
