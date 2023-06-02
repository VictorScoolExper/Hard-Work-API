const validateMaterialParams = (req, res, next) => {
  const { material_name, description, unit } = req.body;
  const errors = {};

  if (!material_name || typeof material_name !== "string") {
    errors.material_name = "Material name is required.";
  }
  if (typeof description !== "string") {
    errors.description = "Description needs to be a string";
  }
  if(!unit || typeof unit !== "string"){
    errors.unit = "Unit does not have a valid value";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};

module.exports = {
    validateMaterialParams
}
