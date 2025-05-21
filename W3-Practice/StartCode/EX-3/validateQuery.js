export function validateQuery(req, res, next) {
  const { minCredits, maxCredits } = req.query;

  // Check if minCredits and maxCredits, if present, are valid integers
  if (minCredits && !Number.isInteger(Number(minCredits))) {
    return res.status(400).json({ error: "minCredits must be an integer" });
  }
  if (maxCredits && !Number.isInteger(Number(maxCredits))) {
    return res.status(400).json({ error: "maxCredits must be an integer" });
  }

  // Check if minCredits > maxCredits
  if (minCredits && maxCredits && Number(minCredits) > Number(maxCredits)) {
    return res.status(400).json({ error: "minCredits should not be greater than maxCredits" });
  }

  next();
}
