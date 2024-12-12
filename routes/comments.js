import { Router } from "express"
import commentsmodel from "../models/commentmodel.js"
import prodmodel from "../models/productmodel.js"
import usermodel from "../models/usermodel.js"


const router = Router()


router.get('/', async (req, res) => {
    try {
        
        const {productid} = req.body
        const comments = await commentsmodel.findAll({where: { productid }} )
        
        const com = []


        for (const obj of comments) {
            const users = await usermodel.findAll({where: {uid: obj.userid}})
            com.push({name:users[0].username, rewiu:obj.comment, rate: obj.rate})
        }

        res.status(200).json(com)
    } catch (e) {
        console.log(e)
        res.status(500).json({message:'error, try again'})
    }
})

router.post('/', async (req, res) => {
    try {
        const { userid, productid, comment, rate } = req.body
        const candidate = await usermodel.findOne({ where: { uid: userid } })
        const product = await prodmodel.findOne({ where: { uid: productid } })
        

        if (candidate && product && rate) {
            if(rate <= 0 || rate > 5 || comment.length <= 1){
                res.status(200).json({ message: "ti ne astavil comment"})
            }else{
                await commentsmodel.create({
                    productid,
                    userid,
                    comment,
                    rate
                })
                res.status(200).json({ message: "ti astavil comment" })
            }
        } else {
            res.status(200).json({ message: "ti ne astavil comment" })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({message:'error, try again'})
    }
})




export default router