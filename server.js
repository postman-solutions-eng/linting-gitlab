#! /usr/bin/env node

const axios = require('axios')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const rulesUrl = process.env.POSTMAN_RULES

async function getRules () {
  const rules = await axios.get(rulesUrl, {
    headers: {
      'PRIVATE-TOKEN': process.env.GITLAB_PAT
    }
  })
  
  app.get('/governance-rules', (req, res) => {
    res.json(rules.data)
    process.exit()
  })
  
  app.listen(port, () => {})  
}

getRules()
