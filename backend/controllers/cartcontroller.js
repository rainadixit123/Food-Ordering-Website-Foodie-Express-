const userModel=require('../models/userModel');

const addToCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({successs:true,msg:"Added to cart"});

    }
    catch(err){
console.log(err);
res.json({success:false,msg:"Error"});
    }
}

const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,msg:"Removed from cart"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"}); 
    }
}

const getCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData})
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"}); 
    }
}

module.exports={addToCart,removeFromCart,getCart};