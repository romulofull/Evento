// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/event-bot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const feedbackSchema = new mongoose.Schema({
  name: String,
  feedback: String,
});

const Registration = mongoose.model('Registro', registrationSchema);
const Feedback = mongoose.model('Encuesta', feedbackSchema);


app.post('/registro', async (req, res) => {
  const { name, email } = req.body;
  const registration = new Registration({ name, email });
  await registration.save();
  res.status(200).send('Registro exitoso');
});


app.post('/encuesta', async (req, res) => {
  const { name, feedback } = req.body;
  const newFeedback = new Feedback({ name, feedback });
  await newFeedback.save();
  res.status(200).send('Encuesta recibida');
});


app.get('/encuesta', async (req, res) => {
  const feedbacks = await Feedback.find();
  res.status(200).json(feedbacks);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
