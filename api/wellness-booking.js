// Vercel Serverless Function: Wellness Facilities Live Booking API
// Stores live bookings for Sauna & Hot Tub to prevent double bookings across mobile QR codes & iPad kiosk

let globalBookingsStore = {};

// Convert "HH:MM" to minutes from midnight
function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.trim().split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
}

// Check time overlap and facility conflict
function isBookingConflict(b1, b2) {
    // Facility check: 'combo' conflicts with both 'sauna' and 'hottub'
    const facilityConflict = (b1.facility === 'combo' || b2.facility === 'combo' || b1.facility === b2.facility);
    if (!facilityConflict) return false;

    // Time range check
    const [b1StartStr, b1EndStr] = b1.slot.split(' - ');
    const [b2StartStr, b2EndStr] = b2.slot.split(' - ');

    const b1Start = timeToMinutes(b1StartStr);
    const b1End = timeToMinutes(b1EndStr);
    const b2Start = timeToMinutes(b2StartStr);
    const b2End = timeToMinutes(b2EndStr);

    // Overlap condition: start of one < end of other AND end of one > start of other
    return (b1Start < b2End && b1End > b2Start);
}

// Send automatic behind-the-scenes WhatsApp notification to designated host/housekeeper phone
async function sendServerSideWhatsAppNotification(booking) {
    try {
        const targetPhone = process.env.WELLNESS_HOST_WHATSAPP || process.env.HOST_WHATSAPP; // e.g. "+27821234567"
        const callMeBotApiKey = process.env.CALLMEBOT_API_KEY; // Free CallMeBot API key
        const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL; // Custom Webhook / Zapier / Make

        // Twilio Credentials
        const twilioSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioFrom = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'; // Twilio default WhatsApp Sandbox

        const facilityName = booking.facility === 'combo'
            ? 'Sauna & Hot Tub Combo (1 Hr)'
            : booking.facility === 'sauna' ? 'Riverside Sauna' : 'Mountain Hot Tub';

        const msgText = `🔔 *New Wellness Booking!*\n\n` +
            `• *Facility:* ${facilityName}\n` +
            `• *Date:* ${booking.date}\n` +
            `• *Time:* ${booking.slot}\n` +
            `• *Suite:* ${booking.suite}\n` +
            `• *Guest:* ${booking.guestName}` +
            (booking.phone ? ` (${booking.phone})` : '');

        // Option A: Official Twilio WhatsApp API
        if (twilioSid && twilioAuthToken && targetPhone) {
            const cleanPhone = targetPhone.replace(/[^0-9+]/g, '');
            const toFormatted = cleanPhone.startsWith('whatsapp:') ? cleanPhone : `whatsapp:${cleanPhone}`;
            const fromFormatted = twilioFrom.startsWith('whatsapp:') ? twilioFrom : `whatsapp:${twilioFrom}`;

            const params = new URLSearchParams();
            params.append('From', fromFormatted);
            params.append('To', toFormatted);
            params.append('Body', msgText);

            const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
            const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString('base64');

            const twilioRes = await fetch(twilioUrl, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            if (twilioRes.ok) {
                console.log('Automated Twilio WhatsApp message dispatched to:', toFormatted);
                return;
            } else {
                const twData = await twilioRes.text();
                console.error('Twilio WhatsApp error response:', twData);
            }
        }

        // Option B: CallMeBot Free API
        if (targetPhone && callMeBotApiKey) {
            const cleanPhone = targetPhone.replace(/[^0-9+]/g, '');
            const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(msgText)}&apikey=${encodeURIComponent(callMeBotApiKey)}`;
            await fetch(url);
            console.log('Automated CallMeBot WhatsApp dispatched to:', cleanPhone);
            return;
        }

        // Option C: Custom Webhook (Zapier / Make / Evolution API)
        if (webhookUrl) {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ booking, message: msgText, targetPhone })
            });
            console.log('Automated WhatsApp Webhook triggered');
            return;
        }
    } catch (err) {
        console.error('Error sending background WhatsApp notification:', err);
    }
}

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

            const newCandidate = { facility, slot };

            // Check double-booking / conflict
            const conflict = globalBookingsStore[date].find(existing => isBookingConflict(existing, newCandidate));

            if (conflict) {
                const confName = conflict.facility === 'combo' 
                    ? 'Sauna & Hot Tub Combo' 
                    : conflict.facility === 'sauna' ? 'Riverside Sauna' : 'Mountain Hot Tub';

                return res.status(409).json({
                    error: `This time slot overlaps with an existing booking for ${confName} (${conflict.slot}).`,
                    existingBooking: conflict
                });
            }

            const newBooking = {
                id: 'wb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
                date,
                facility, // 'sauna' | 'hottub' | 'combo'
                slot, // '08:00 - 08:30' or '08:00 - 09:00'
                suite,
                guestName: guestName || 'Guest',
                phone: phone || '',
                notes: notes || '',
                createdAt: new Date().toISOString()
            };

            globalBookingsStore[date].push(newBooking);

            // Fire background WhatsApp dispatch (non-blocking)
            sendServerSideWhatsAppNotification(newBooking);

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


