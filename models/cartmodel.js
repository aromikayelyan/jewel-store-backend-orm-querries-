import  Sequelize  from "sequelize"
import sequelize from "../utils/connect.js"



const cart = sequelize.define('Cart',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    productid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    count:{
        type: Sequelize.INTEGER,
        allowNull: false
    } 
})



export default cart

