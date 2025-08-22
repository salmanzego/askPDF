var express = require('express');
var router = express.Router();
const storeHelper = require("../helpers/storeHelpers");
const multer = require('multer');


const storage = multer.memoryStorage()
const upload = multer({ storage })

/* GET home page. */
// router.get('/extract', (req, res, next) => {
//   storeHelper.extractPdf("public/instr_m1.pdf").then(text => {
//     storeHelper.textSplit(text).then((splits) => {
//       storeHelper.embedSplits(splits).then(embeddings => {
//         const data = embeddings.embeddings;
//         const namespace = "dbms_note";
//         storeHelper.storeData(data, splits, namespace).then(response => {
//           res.status(200).json(response);
//         }).catch(err => {
//           res.status(500).json({ error: err });
//         })
//       })
//     })
//   })
// });

router.get('/pdfs', (req, res, next) => {
  storeHelper.getPdfList().then(data => {
    res.status(200).json({data: data, msg: "PDFs fetched successfully"});
  }).catch(err => {
    console.log('[ERROR_PDF_LIST] Failed to fetch PDF list:', err);
    res.status(500).json({ error: err });
  })
});

router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    const fileBuffer = req.file?.buffer
    if (!fileBuffer) return res.status(400).json({ error: 'No file uploaded' })

    const fileName = req.file.originalname.split(".")[0];

    storeHelper.extractPdf(fileBuffer).then(text => {
      storeHelper.textSplit(text).then((splits) => {
        storeHelper.embedSplits(splits).then(embeddings => {
          const data = embeddings;
          storeHelper.storeData(data, splits, fileName).then(response => {
            storeHelper.storePdfData(fileName).then(pdfResponse => {
              res.status(200).json({ message: pdfResponse.msg, response });
            }).catch(err => {
              console.log('[ERROR_STORE_PDF_DATA] Failed to store PDF data for file:', fileName, 'Error:', err);
              res.status(500).json({ error: err });
            })
          }).catch(err => {
            console.log('[ERROR_STORE_DATA] Failed to store data for file:', fileName, 'Error:', err);
            res.status(500).json({ error: err });
          })
        }).catch(err => {
          console.log('[ERROR_EMBED_SPLITS] Failed to embed splits for file:', fileName, 'Error:', err);
          res.status(500).json({ error: err });
        })
      }).catch(err => {
        console.log('[ERROR_TEXT_SPLIT] Failed to split text for file:', fileName, 'Error:', err);
        res.status(500).json({ error: err });
      })
    })
  } catch (err) {
    console.log('[ERROR_FILE_PROCESSING] Failed to process uploaded file:', err);
    res.status(500).json({ error: 'Failed to process file' })
  }
});

router.post('/query', (req, res, next) => {
  const query = req.body.message;
  const fileName = req.body.fileName;
  storeHelper.textSplit(query).then(splits => {
    storeHelper.embedSplits(splits).then(embeddings => {
      const data = embeddings;
      storeHelper.queryData(data, fileName).then(queryResponse => {
        storeHelper.generatePrompt(queryResponse.matches, query).then(prompt => {
          storeHelper.getResult(prompt).then(result => {
            res.status(200).json({ message: result.result });
          }).catch(err => {
            console.log('[ERROR_GET_RESULT] Failed to get result for query:', query, 'File:', fileName, 'Error:', err);
            res.status(500).json({ error: err });
          })
        }).catch(err => {
          console.log('[ERROR_GENERATE_PROMPT] Failed to generate prompt for query:', query, 'File:', fileName, 'Error:', err);
          res.status(500).json({ error: err });
        })
      }).catch(err => {
        console.log('[ERROR_QUERY_DATA] Failed to query data for query:', query, 'File:', fileName, 'Error:', err);
        res.status(500).json({ error: err });
      })
    }).catch(err => {
      console.log('[ERROR_EMBED_QUERY] Failed to embed query:', query, 'File:', fileName, 'Error:', err);
      res.status(500).json({ error: err });
    })
  })
})
module.exports = router;
