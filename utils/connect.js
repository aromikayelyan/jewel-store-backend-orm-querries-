import Sequelize from "sequelize"

const NAME = 'myschema'
const USER = 'root'
const PASSWORD = '12345678'


const sequelize = new Sequelize(NAME, USER, PASSWORD, {
    host: 3306,
    dialect: 'mysql'
})

export default sequelize


