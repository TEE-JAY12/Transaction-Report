const { DataTypes } = require('sequelize');

module.exports = (sequelize,DataTypes)=>{
    const Paypal = sequelize.define("Paypal",{
        transactionId:{
            type: DataTypes.STRING,
            allowNull: false,
            validdate: {
                notEmpty: true,
            },
        },
        transactionEventCode:{
            type: DataTypes.STRING,
            allowNull: false,
            validdate: {
                notEmpty: true,
            },
        },
        amount:{
            type: DataTypes.STRING,
            allowNull: false,
            validdate: {
                notEmpty: true,
            },
        },
        currencyCode:{
            type: DataTypes.STRING,
            allowNull: false,
            validdate: {
                notEmpty: true,
            },
        },
        transactionInitiationDate:{
            type: DataTypes.STRING,
            allowNull: false,
            validdate: {
                notEmpty: true,
            },
        },
        payerInfoAccountId:{
            type: DataTypes.STRING,
            allowNull: false,
            validdate: {
                notEmpty: true,
            },
        } 
     });
    return Paypal;
};



