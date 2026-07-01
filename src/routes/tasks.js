import { Router } from 'express'
import pool from '../db.js'

const router = Router()

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ message: 'El título es requerido' })
    }

    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, completed } = req.body

    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
      [title, completed, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json({ message: 'Tarea eliminada' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router