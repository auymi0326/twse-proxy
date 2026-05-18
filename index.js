const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/twse/*', async (req, res) => {
  const path = req.path.replace('/twse', '')
  const url = `https://openapi.twse.com.tw${path}`
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.twse.com.tw/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8'
      }
    })
    const text = await response.text()
    try {
      const data = JSON.parse(text)
      res.setHeader('Cache-Control', 'public, max-age=55')
      res.json(data)
    } catch {
      // 回傳原始內容方便除錯
      res.setHeader('Content-Type', 'text/plain')
      res.send(text.slice(0, 500))
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`))
