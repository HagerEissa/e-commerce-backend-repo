//middlewares
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('../models/user.model'); // Adjust the path
const userTypeModel = require('../models/userType.model'); // Adjust the path

//المكتبة دي بتُستخدم لإنشاء والتحقق من الـ JWT Tokens.
// التوكن (Token) ده زي كارت مرور أو تصريح يُستخدم عشان تأكدي إن الشخص اللي بيحاول يدخل سيستم معين هو شخص موثوق.

const secretKey = ",'*ujuMYe?@=*N7zZ4e9NWV3QM<9i*b4f8{0>0_6uBA<`vok[HHpr]13<rU15%V";
// هو زي كلمة السر اللي السستم بيستخدمها عشان يتأكد إن التوكن معمول عن طريقه.


exports.createAccessToken = (data)=>{
    return jwt.sign(data,secretKey,{expiresIn:'1h'})
}
/**
 * 
createAccessToken:
دي وظيفتها:
بتعمل توليد توكن جديد (Generate a Token) لما المستخدم يعمل تسجيل دخول (Login).
بياخد البيانات (مثلاً ID المستخدم أو اسمه) ويحوّلها لـ توكن باستخدام المفتاح السري.
إزاي؟
data: البيانات اللي عاوزة تضيفيها في التوكن (زي User ID).
secretKey: المفتاح السري اللي بيضمن إن التوكن مش هيتغير.
expiresIn: '1h': يعني التوكن ده صالح لمدة ساعة واحدة.
 */

exports.authMW = (req,res,next)=> {
    console.log('ooooooooo= ',req)
    try{
        const token = req.header('Authorization')?.replace('Bearer ','');
        if(token){
            const verified = jwt.verify(token,secretKey);
            req.user = verified;
            console.log("v",verified);
            next();
        }else{
            res.status(401).json({error:'access denied ,token missing'})
        }
    }catch(err){
        res.status(401).json({error:err.message})

    }
    
}
/*
دي Middleware وظيفتها:
تتحقق (Validate) إذا كان المستخدم معاه توكن صالح قبل ما يدخل على أي Route محمي (Protected Route).
الخطوات:
قراءة التوكن من الهيدر:

بتقرأ الهيدر اللي اسمه Authorization.
بتحذف الكلمة Bearer (لو موجودة) عشان تاخد التوكن بس.
التأكد من صحة التوكن:

بتستخدم المفتاح السري secretKey للتحقق إذا كان التوكن صحيح.
إضافة بيانات المستخدم:
لو التوكن صحيح، بيضيف بيانات المستخدم في req.user (عشان يبقى متاح في أي Route بعد كده).
*/

exports.isAdmin = async (req, res, next) => {
    try {
        // console.log('==>',req.user);
        
        if (req.user) {
            // console.log('hereeeeeeeeeeee= ')
            const user = await userModel.findById(req.user.userId).populate('userType').exec();
            if (user && user.userType.name === 'admin') {
                next();
            } else {
                res.status(403).json({ error: 'Access denied, admin only' });
            }
        } else {
            res.status(401).json({ error: 'Access denied, not authenticated' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};