var express = require('express');
var router = express.Router();
const storeHelper = require("../helpers/storeHelpers");
const { response } = require('../app');

/* GET home page. */
router.get('/extract', (req, res, next) => {
  storeHelper.extractPdf("public/dbms_note.pdf").then(text => {
    storeHelper.textSplit(text).then((splits) => {
      storeHelper.embedSplits(splits).then(embeddings => {
        const data = embeddings.embeddings;
        const namespace = "dbms_note";
        storeHelper.storeData(data, splits, namespace).then(response => {
          res.status(200).json(response);
        }).catch(err => {
          res.status(500).json({error: err});
        })
      })
    })
  })
});

router.post('/query', (req, res, next) => {
  const query = req.query.q;
  storeHelper.textSplit(query).then(splits => {
    storeHelper.embedSplits(splits).then(embeddings => {
      const data = embeddings.embeddings;
      const namespace = "dbms_note"
      storeHelper.queryData(data, namespace).then(queryResponse => {
        storeHelper.generatePrompt(queryResponse.matches, query).then(prompt => {
          storeHelper.getResult(prompt).then(result => {
            res.status(200).json({message: result.result});
          }).catch(err => {
            res.status(500).json({error: err});
          })
        }).catch(err => {
          res.status(500).json({error: err});
        })
      }).catch(err => {
        res.status(500).json({error: err});
      })
    }).catch(err => {
      res.status(500).json({error: err});
    })
  })
})
module.exports = router;
