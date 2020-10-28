const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['category_id']
      }
    ]
  })
      .then(products => res.json(products))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
        id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product, 
        attributes: ['category_id'] 
      }
    ]
})
    .then(products => {
        if (!products) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.join(products);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
