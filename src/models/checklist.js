// O mongoose é um pacote que permite integrar o MongoDB ao NodeJs
const mongoose = require('mongoose')

// A função .Schema permite criar uma pré-estrutura ao banco de dados. Vale ressaltar que o Mongo não exige que a arquitetura do bacno de dados esteja pronta antes do seu efeitvo uso. Entrentanto, caso o usuário deseje criar uma estrutura, usa-se esse método .Schema
const checklistSchema = mongoose.Schema({
  name: { type: String, required: true },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
})

module.exports = mongoose.model('Checklist', checklistSchema)
