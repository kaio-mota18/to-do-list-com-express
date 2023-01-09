const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  done: { type: Boolean, required: true },
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true
  }
})

// O modelo criado pede dois atributos ao meu objeto: taskName e done. Por sua vez, esses atribuos possuem propriedades: seu tipo (String e Boolean respectivamente, e se são mandatórios)

module.exports = mongoose.model('Tasks', tasksSchema)
