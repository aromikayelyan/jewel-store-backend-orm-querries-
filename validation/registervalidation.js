import {body} from 'express-validator'



const registerValidation = [
    body('username', 'Укажите имя').isLength({ min: 3}),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5}),

]

export default registerValidation