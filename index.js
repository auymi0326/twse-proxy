const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/twse/*', async (req, res) => {
  const path = req.path.replace('/twse', '')
  const url = `https://openapi.twse.com.tw${path}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    res.setHeader('Cache-Control', 'public, max-age=55')
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`))
