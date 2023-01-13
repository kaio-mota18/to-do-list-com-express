const mongoose = require('mongoose') //importa a lib para utilizar o mongo via node

const tasktSchema = mongoose.Schema({
  name: { type: String, required: true }, //atributo name, seu tipo e ele é mandatório
  done: { type: Boolean, default: false }, //atributo done, tipo booleano, e se não tiver, quer dizer que eh falso
  checklist: {
    //cada tarefa(task) vai ser associada por referência a uma checklist
    type: mongoose.Schema.Types.ObjectId, //usa-se essa tipologia para que busque o ID de cada objeto
    ref: 'Checklist', //a referência é igual como é exportado o modelo
    required: true
  }
})

module.exports = mongoose.model('Task', tasktSchema)
