import { Router } from "express"
import prodmodel from "../models/productmodel.js"
import commentss from "../models/commentmodel.js"
import user from "../models/usermodel.js"
import { v4 as uuidv4 } from "uuid"
const router = Router()



router.get('/get/:id', async (req, res) => {
    try {

        const response = await prodmodel.findAll({ where: { uid: req.params.id } })
        const comments = await commentss.findAll({ where: { productid: req.params.id } })


        const imageslinks = response[0].images
        const links = JSON.parse(imageslinks)
        const images = links.links

        const com = []

        const userids = comments.map(comment => comment.userid)
        const users = await user.findAll({ where: { uid: userids } })
        const data = new Map()

        for (const user of users) {
            data.set(user.uid, user.username)
        }

        for (const obj of comments) {
            com.push({ name: data.get(obj.userid), rewiu: obj.comment, rate: obj.rate })
        }

        const sum = ratesum(com)

        res.status(200).json({
            ...response[0].dataValues,
            revies: com,
            sum,
            images
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await prodmodel.findAll()

        const data = new Map()


        products.forEach(product => {
            data.set(product.categoryname, product.dataValues)
        });

        console.log(data)


        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.post('/', async (req, res) => {
    try {
        const link = { links: [] }
        link.links.push(req.body.images)
        const data = JSON.stringify(link)
        await prodmodel.create({
            uid: uuidv4(),
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            count: req.body.count,
            sizes: req.body.sizes,
            colorus: req.body.colorus,
            weight: req.body.weight,
            material: req.body.material,
            categoryname: req.body.categoryname,
            images: data
        })
        res.status(200).json({ message: 'Добавлено' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const uid = req.params.id
        const product = await prodmodel.findAll({where: {uid: uid} })
        await product[0].destroy()

        res.status(200).json({ message: 'Удалено' })
    } catch (e) {
        console.log(e)
        res.status(404).json({ message: 'не найдено такого товара' })
    }
})

router.put('/:id', async (req, res) => {
    try {

        const product = await prodmodel.findOne({ where: { uid: req.params.id } })
        const link = { links: [] }
        link.links.push(req.body.images)
        const data = JSON.stringify(link)

            product.name = req.body.name,
            product.price = req.body.price,
            product.description = req.body.description,
            product.count = req.body.count,
            product.sizes = req.body.sizes,
            product.colorus = req.body.colorus,
            product.weight = req.body.weight,
            product.material = req.body.material,
            product.categoryname = req.body.categoryname,
            product.images = data

        await product.save()

        res.status(200).json({ message: 'Изменено' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'error' })
    }
})

// router.get('/:category', async(req,res)=>{
//     try {
//         const response = 

//     } catch (error) {
//         console.log(error)
//         res.status(400).json({message: 'error'})
//     }
// })



function ratesum(rewiew) {
    const count = rewiew.length
    let sum = 0
    rewiew.forEach(obj => {
        sum += obj.rate
    });
    return sum / count
}


export default router

