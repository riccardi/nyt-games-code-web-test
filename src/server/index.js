
import express from 'express'
import path from 'path'

const clientAssets = require(KYT.ASSETS_MANIFEST)

const app = express()
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)))

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html style="background-color:#34485E">
      <head>
        <meta charset="utf-8" />
        <title>Games Web Code Test</title>
      </head>
      <body>
        <div id='root'></div>
        <script src='${clientAssets.main.js}' type="text/javascript"></script>

        <link href="https://fonts.googleapis.com/css?family=Open+Sans|Space+Mono|Inconsolata" rel="stylesheet">
        <link href="${clientAssets.main.css || ''}" rel="stylesheet" type="text/css"/>
      </body>
    </html>
  `)
})

app.listen(parseInt(KYT.SERVER_PORT, 10))
