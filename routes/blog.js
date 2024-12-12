import { Router } from "express"
import blogmodel from "../models/blogmodel.js"
import { v4 as uuidv4 } from "uuid"

const router = Router()


router.post('/create', async (req, res) => {
    try {
        await blogmodel.create({
            uid: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            images: req.body.images
        })

        res.status(200).json({ message: 'Удачно добавлено' })

    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'error' })
    }
})


router.get('/getblogs', async (req, res) => {
    try {
        const blog = await blogmodel.findAll()
        res.status(200).json(blog)

    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'error' })
    }
})


router.delete('/:id', async (req, res) => {
    try {

        const blog = await blogmodel.findAll({ where: { uid: req.params.id } })
        await blog[0].destroy()

        res.status(200).json({ message: 'Удалено' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'error' })
    }
})



router.put('/:id', async (req, res) => {
    try {

        const blog = await blogmodel.findOne({ where: { uid: req.params.id } })
        blog.title = req.body.title
        blog.description = req.body.description
        blog.images = req.body.images
        await blog.save()

        res.status(200).json({ message: 'Изменено' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'error' })
    }
})




export default router
