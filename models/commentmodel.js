import  Sequelize  from "sequelize"
import sequelize from "../utils/connect.js"



const comments = sequelize.define('Comment', {
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
    comment:{
        type: Sequelize.STRING,
        allowNull: false
    },
    rate:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})



export default comments
