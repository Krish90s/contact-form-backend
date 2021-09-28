const express = require("express");
const router = express.Router();
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const Joi = require("joi");
const emailId = process.env.EMAILID;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const msg = {
    to: emailId,
    from: "krishnanvenkat4@gmail.com", // Use the email address or domain you verified above
    subject: "Email From Recruiter",
    text: `Email From Recruiter`,
    html: `<h1>Email From Recruiter</h1>
    <p>Recruiter Name ${req.body.name}</p><br />
    <p>Recruiter Email ${req.body.email}</p><br />
    <p>Recruiter Message ${req.body.message}</p><br />`,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  res.send(true);
});

function validate(req) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
