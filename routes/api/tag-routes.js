const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model: Product}]
  }).then(data => {res.status(200).json(data)})
  .catch((err) => {
  res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.id;
  Tag.findByPk(id, {
    include: [{model: Product}]
  }).then(data => {res.status(200).json(data)})
  .catch((err) => {
  res.status(500).json(err);
  })

});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id;
  Tag.destroy({
    where: {id: id}
  }).then(num => {
    if(num == 1) {
      res.status(200).json({ message: 'Deleted ID ' + id })
    } else {
      res.status(500).json({ message: `could not delete id: ${id}, please confirm it exists`})
    }
  }).catch(err => {
    res.status(500).json(err);
  })

});

module.exports = router;
