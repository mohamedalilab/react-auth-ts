const asyncFunction = require("./asyncFunction");
const Ajv = require("ajv").default;

const validateMW = (schema) =>
  asyncFunction(async (req, res, nxt) => {
    // 1. validate req.body:
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(req.body);
    
    if (!isValid) {
      const errors = validate.errors?.map(err => `${err.instancePath || 'root'} ${err.message}`).join(', ') || 'Invalid data';
      return res.status(400).json({ message: errors });
    }
    
    // 2. set req.valid = 1:
    req.valid = 1;
    nxt();
  });

module.exports = validateMW;
