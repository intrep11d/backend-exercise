// middleware/validationMiddleware.js
module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      res.status(400).json({ errors: errorMessages });
    } else {
      next();
    }
  };