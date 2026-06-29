import { Router } from 'express'

const router = Router()

let tasks = [
  { id: 1, title: 'Aprender Node.js', completed: false },
  { id: 2, title: 'Construir una API', completed: false }
]

// GET /tasks — obtener todas las tareas
router.get('/', (req, res) => {
  res.json(tasks)
})

// GET /tasks/:id — obtener una tarea por id
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' })
  }

  res.json(task)
})

// POST /tasks — crear una tarea
router.post('/', (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ message: 'El título es requerido' })
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

// PUT /tasks/:id — actualizar una tarea
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' })
  }

  const { title, completed } = req.body
  if (title !== undefined) task.title = title
  if (completed !== undefined) task.completed = completed

  res.json(task)
})

// DELETE /tasks/:id — eliminar una tarea
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' })
  }

  tasks.splice(index, 1)
  res.json({ message: 'Tarea eliminada' })
})

export default router