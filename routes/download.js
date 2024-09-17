const express = require('express');
const router = express.Router();

// Placeholder for CV download logic
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  res.download(`uploads/${filename}`, (err) => {
    if (err) {
      res.status(500).send('Error downloading the file');
    }
  });
});

module.exports = router;