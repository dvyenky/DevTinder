const Validate_Data = async (req, res, next) => {
  try {
    const allowed_fields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "age",
      "gender",
      "city",
      "photoUrl",
    ];
    const is_allowed = Object.keys(req.body).every((field) =>
      allowed_fields.includes(field),
    );
    return is_allowed;
  } catch (error) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = { Validate_Data };
