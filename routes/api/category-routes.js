const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{model: Product}]
  }).then(data => {res.status(200).json(data)})
  .catch((err) => {
  res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const id = req.params.id;
  Category.findByPk(id, {
    include: [{model: Product}]
  }).then(data => {res.status(200).json(data)})
  .catch((err) => {
  res.status(500).json(err);
  })

});

router.post('/', (req, res) => {
  // create a new category
  if (!req.body.category_name) {
    res.status(400).json({message: "must contain data to update!"})
    return
  }
  Category.create(req.body)
    .then(data => {
      res.status(200).json({message: `${req.body.category_name} added!`})
    }).catch(err => {
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  Category.update(req.body, {
    where: {id: id}
  })
    .then(data => {
      if (data ==1) {
      res.status(200).json({message: `${req.body.category_name} updated`})
    } else {
      res.status(200).json({message: `${req.body.category_name} could not be updated`})
    }
  })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  Category.destroy({
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
