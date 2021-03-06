import joi from "joi";

export async function addressSchema(req, res, next) {
  const { cep, city, uf, address, number, complement, reference, district } = req.body;

  const addressBody = {
    cep,
    city,
    uf,
    address,
    number,
    complement,
    district,
    reference
  }

  const addresSchema = joi.object({
    cep: joi.string().pattern(/(\d{5})-(\d{3})/).required(),
    city: joi.string().required(),
    uf: joi.string().pattern(/[A-Z]{2}/).required(),
    address: joi.string().required(),
    number: joi.string().pattern(/\d/).required(),
    complement: joi.string().required(),
    district: joi.string().required(),
    reference: joi.any()
  });

  const { error } = addresSchema.validate(addressBody, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map(detail => detail.message));

  next();
}