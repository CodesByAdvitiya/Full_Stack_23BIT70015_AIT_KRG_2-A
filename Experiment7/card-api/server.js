const express = require('express');
const app = express();
app.use(express.json());

// In-memory playing card collection
let cards = [
  { id: 1, suit: 'Hearts', value: 'A' },
  { id: 2, suit: 'Spades', value: '10' },
  { id: 3, suit: 'Diamonds', value: 'K' }
];

// -------------------- HOME ROUTE --------------------
app.get('/', (req, res) => {
  res.send(`
    <h2>Playing Cards REST API 🚀</h2>
    <p>Use the endpoints below:</p>
    <ul>
      <li>GET /cards</li>
      <li>GET /cards/:id</li>
      <li>POST /cards</li>
      <li>PUT /cards/:id</li>
      <li>DELETE /cards/:id</li>
    </ul>
  `);
});

// -------------------- GET ALL CARDS --------------------
app.get('/cards', (req, res) => {
  res.json(cards);
});

// -------------------- GET CARD BY ID --------------------
app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ error: 'Card not found' });
  res.json(card);
});

// -------------------- CREATE NEW CARD --------------------
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  // Validation
  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }

  const newCard = {
    id: cards.length + 1,
    suit,
    value
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// -------------------- UPDATE CARD --------------------
app.put('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ error: 'Card not found' });

  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }

  card.suit = suit;
  card.value = value;

  res.json(card);
});

// -------------------- DELETE CARD --------------------
app.delete('/cards/:id', (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Card not found' });

  const deletedCard = cards.splice(index, 1);
  res.json(deletedCard[0]);
});

// -------------------- START SERVER --------------------
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
