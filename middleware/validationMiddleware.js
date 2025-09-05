const Joi = require("joi");

const validateCity = (req, res, next) => {
  const schema = Joi.object({
    city: Joi.string()
      .pattern(/^[a-zA-Z\s]+$/)
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.empty": "City name is required.",
        "string.min": "City name must be at least 2 characters long.",
        "string.max": "City name must not exceed 50 characters.",
        "string.pattern.base": "City name can only contain letters and spaces.",
        "any.required": "City name is required.",
      }),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = { validateCity };
