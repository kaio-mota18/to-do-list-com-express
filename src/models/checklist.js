const mongoose = require('mongoose') //usa-se o mongoose para usar o mongo via node

const checklistSchema = mongoose.Schema({
  //mongoose.Schema permite criar um modelo/formato da coleção
  name: { type: String, required: true },
  tasks: [
    //cada checklist terá várias tasks. Portanto, é necessário colocar os objetos dentro de um array para que o sistema possa percorer eles
    {
      type: mongoose.Schema.Types.ObjectId, //essa é a sintaxe para conseguir pegar o id
      ref: 'Task' //a referência é igual como foi exportado o modelo
    }
  ]
})

module.exports = mongoose.model('Checklist', checklistSchema)
