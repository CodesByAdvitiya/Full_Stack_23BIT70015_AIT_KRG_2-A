const express = require("express");
const app = express();
app.use(express.json());

// ---------------- SEAT DATA ----------------
let seats = {
  A1: { booked: false, lockedBy: null, lockExpiresAt: null },
  A2: { booked: false, lockedBy: null, lockExpiresAt: null },
  A3: { booked: false, lockedBy: null, lockExpiresAt: null }
};

// ---------------- REMOVE EXPIRED LOCKS ----------------
function clearExpiredLocks() {
  const now = Date.now();
  for (const seatId in seats) {
    const seat = seats[seatId];
    if (seat.lockExpiresAt && seat.lockExpiresAt < now) {
      // release lock
      seat.lockedBy = null;
      seat.lockExpiresAt = null;
    }
  }
}

// ---------------- HOME ROUTE ----------------
app.get("/", (req, res) => {
  res.send(`
    <h2>🎟️ Ticket Booking System API</h2>
    <p>Use these endpoints:</p>
    <ul>
      <li>GET /seats</li>
      <li>POST /lock/:seatId</li>
      <li>POST /book/:seatId</li>
    </ul>
  `);
});

// ---------------- LOCK SEAT ----------------
app.post("/lock/:seatId", (req, res) => {
  clearExpiredLocks();

  const seatId = req.params.seatId;
  const userId = req.body.userId;

  const seat = seats[seatId];

  if (!seat) return res.status(404).json({ error: "Invalid seat ID" });
  if (seat.booked) return res.status(400).json({ error: "Seat already booked" });

  // If seat locked and not expired
  if (seat.lockedBy && seat.lockExpiresAt > Date.now()) {
    return res.status(400).json({
      error: "Seat is currently locked",
      lockedBy: seat.lockedBy
    });
  }

  // Apply new lock
  seat.lockedBy = userId;
  seat.lockExpiresAt = Date.now() + 60000; // 60 seconds lock

  res.json({
    message: `Seat ${seatId} locked successfully`,
    lockedBy: userId,
    expiresAt: seat.lockExpiresAt
  });
});

// ---------------- BOOK SEAT ----------------
app.post("/book/:seatId", (req, res) => {
  clearExpiredLocks();

  const seatId = req.params.seatId;
  const userId = req.body.userId;

  const seat = seats[seatId];

  if (!seat) return res.status(404).json({ error: "Invalid seat ID" });
  if (seat.booked) return res.status(400).json({ error: "Seat already booked" });

  if (seat.lockedBy !== userId) {
    return res.status(403).json({
      error: "Seat not locked by you",
      lockedBy: seat.lockedBy
    });
  }

  // Book the seat
  seat.booked = true;
  seat.lockedBy = null;
  seat.lockExpiresAt = null;

  res.json({ message: `Seat ${seatId} booked successfully!`, bookedBy: userId });
});

// ---------------- GET ALL SEATS ----------------
app.get("/seats", (req, res) => {
  clearExpiredLocks();
  res.json(seats);
});

// ---------------- START SERVER ----------------
app.listen(4000, () => {
  console.log("🎟️ Booking system running at http://localhost:4000");
});
