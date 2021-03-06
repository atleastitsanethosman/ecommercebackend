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
  if (!req.body.tag_name) {
    res.status(400).json({message: "must contain data to update!"})
    return
  }
  Tag.create(req.body)
    .then(data => {
      res.status(200).json({message: `${req.body.tag_name} added!`})
    }).catch(err => {
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const id = req.params.id;
  Tag.update(req.body, {
    where: {id: id}
  })
    .then(data => {
      if (data ==1) {
      res.status(200).json({message: `${req.body.tag_name} updated`})
    } else {
      res.status(200).json({message: `${req.body.tag_name} could not be updated`})
    }
  })
    .catch(err => {
      res.status(400).json(err)
    })
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
