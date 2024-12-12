import { Router } from "express"
import cart from "../models/cartmodel.js"
import user from "../models/usermodel.js"
import products from "../models/productmodel.js"


const router = Router()


router.get('/', async (req, res) => {
    try {
        const { userid } = req.body
        const product = await cart.findAll({ where: { userid: userid } })

        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.post('/', async (req, res) => {
    try {
        const { userid, productid } = req.body

        const candidate = await user.findOne({ where: { uid: userid } })
        const product = await products.findOne({ where: { uid: productid } })
        const cartdata = await cart.findOne({ where: { productid, userid } })

        if (candidate && product) {

            if (cartdata) {
                const newcount = cartdata.count + 1
                await cart.update({ count: newcount }, { where: { productid, userid } });
                res.status(200).json({ message: "Количество товара успешно обновлено", cartdata });
            } else {
                await cart.create({
                    productid: req.body.productid,
                    userid: req.body.userid,
                    count: 1
                })
                res.status(200).json({ message: "ti dabavil v karzinu" })
            }

        } else {
            res.status(200).json({ message: "ti ne dabavil" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error, try again' })

    }
})

router.put('/:productid', async (req, res) => {
    try {
        const { productid } = req.params
        let { userid } = req.body

        const cartItem = await cart.findOne({ where: { productid, userid } })

        if (cartItem) {
            const count = cartItem.count + 1
            await cart.update({ count }, { where: { productid, userid } });
            res.status(200).json({ message: "Количество товара успешно обновлено", cartItem });
        } else {
            res.status(404).json({ message: "Товар не найден в корзине" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова' });
    }
});

router.delete('/:productid', async (req, res) => {
    try {
        const { productid } = req.params
        let { userid } = req.body      
        const cartItem = await cart.findOne({ where: { productid, userid } })

        if (cartItem) {
            let count = cartItem.count
            if (count >= 1) {
                count = count - 1
                await cart.update({ count }, { where: { productid, userid } });
                res.status(200).json({ message: "Количество товара успешно обновлено", cartItem })
            }
            if (count == 0) {
                const product = await cart.findAll({
                    where: {
                        userid, productid
                    }
                })
                await product[0].destroy()
            }
        } else {
            res.status(404).json({ message: "Товар не найден в корзине" });
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова' });
    }

})



export default router