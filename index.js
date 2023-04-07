const express = require('express')
const app = express()
const rules = require('./rules.json')

app.get('/governance-rules', (req, res) => {
  console.log('\n\n Hit local server instead.')
  res.json(rules)
})

app.listen(3000, () => console.log(`Running!`))