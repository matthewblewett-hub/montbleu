// Vercel Serverless Function: Wellness Facilities Live Booking API
// Stores live bookings for Sauna & Hot Tub to prevent double bookings across mobile QR codes & iPad kiosk

let globalBookingsStore = {};

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const { date } = req.query;
            if (date) {
                return res.status(200).json({
                    date,
                    bookings: globalBookingsStore[date] || []
                });
            }
            return res.status(200).json({ bookings: globalBookingsStore });
        }

        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const { date, facility, slot, suite, guestName, phone, notes } = body;

            if (!date || !facility || !slot || !suite) {
                return res.status(400).json({ error: 'Missing required booking fields (date, facility, slot, suite).' });
            }

            if (!globalBookingsStore[date]) {
                globalBookingsStore[date] = [];
            }

            // Check double-booking
            const existing = globalBookingsStore[date].find(
                b => b.facility === facility && b.slot === slot
            );

            if (existing) {
                return res.status(409).json({
                    error: `This slot (${slot}) is already booked for ${facility === 'sauna' ? 'Riverside Sauna' : 'Mountain Hot Tub'}.`,
                    existingBooking: existing
                });
            }

            const newBooking = {
                id: 'wb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
                date,
                facility, // 'sauna' | 'hottub'
                slot, // '08:00 - 08:45'
                suite, // 'Mountain Suite', etc.
                guestName: guestName || 'Guest',
                phone: phone || '',
                notes: notes || '',
                createdAt: new Date().toISOString()
            };

            globalBookingsStore[date].push(newBooking);

            return res.status(200).json({
                success: true,
                message: 'Booking confirmed successfully!',
                booking: newBooking,
                dateBookings: globalBookingsStore[date]
            });
        }

        if (req.method === 'DELETE') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const { date, bookingId } = body;

            if (date && globalBookingsStore[date]) {
                globalBookingsStore[date] = globalBookingsStore[date].filter(b => b.id !== bookingId);
            }

            return res.status(200).json({
                success: true,
                message: 'Booking cancelled.',
                dateBookings: globalBookingsStore[date] || []
            });
        }

        return res.status(405).json({ error: 'Method Not Allowed' });
    } catch (err) {
        console.error('Wellness Booking API Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
