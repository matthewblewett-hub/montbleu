import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ShieldAlert, Sparkles, User, Phone, X, Smartphone, Plus, Lock, Unlock, Download, Send } from 'lucide-react';
import SectionObserver from '../components/ui/SectionObserver';
import Button from '../components/ui/Button';

// Mont Bleu Suites
const SUITES = [
    'Mountain Suite',
    'Olive Suite',
    'Protea Suite',
    'Oak Room',
    'Fynbos Room',
    'Staff / Housekeeper Booking'
];

// 30-minute session slots with 15-min cleaning buffers (45-min interval cycles)
const TIME_SLOTS_30 = [
    { start: '08:00', end30: '08:30', end60: '09:00', label30: '08:00 - 08:30', label60: '08:00 - 09:00' },
    { start: '08:45', end30: '09:15', end60: '09:45', label30: '08:45 - 09:15', label60: '08:45 - 09:45' },
    { start: '09:30', end30: '10:00', end60: '10:30', label30: '09:30 - 10:00', label60: '09:30 - 10:30' },
    { start: '10:15', end30: '10:45', end60: '11:15', label30: '10:15 - 10:45', label60: '10:15 - 11:15' },
    { start: '11:00', end30: '11:30', end60: '12:00', label30: '11:00 - 11:30', label60: '11:00 - 12:00' },
    { start: '11:45', end30: '12:15', end60: '12:45', label30: '11:45 - 12:15', label60: '11:45 - 12:45' },
    { start: '12:30', end30: '13:00', end60: '13:30', label30: '12:30 - 13:00', label60: '12:30 - 13:30' },
    { start: '13:15', end30: '13:45', end60: '14:15', label30: '13:15 - 13:45', label60: '13:15 - 14:15' },
    { start: '14:00', end30: '14:30', end60: '15:00', label30: '14:00 - 14:30', label60: '14:00 - 15:00' },
    { start: '14:45', end30: '15:15', end60: '15:45', label30: '14:45 - 15:15', label60: '14:45 - 15:45' },
    { start: '15:30', end30: '16:00', end60: '16:30', label30: '15:30 - 16:00', label60: '15:30 - 16:30' },
    { start: '16:15', end30: '16:45', end60: '17:15', label30: '16:15 - 16:45', label60: '16:15 - 17:15' },
    { start: '17:00', end30: '17:30', end60: '18:00', label30: '17:00 - 17:30', label60: '17:00 - 18:00' },
    { start: '17:45', end30: '18:15', end60: '18:45', label30: '17:45 - 18:15', label60: '17:45 - 18:45' },
    { start: '18:30', end30: '19:00', end60: '19:30', label30: '18:30 - 19:00', label60: '18:30 - 19:30' },
    { start: '19:15', end30: '19:45', end60: '20:15', label30: '19:15 - 19:45', label60: '19:15 - 20:15' },
    { start: '20:00', end30: '20:30', end60: '21:00', label30: '20:00 - 20:30', label60: '20:00 - 21:00' }
];

interface Booking {
    id: string;
    date: string;
    facility: 'sauna' | 'hottub' | 'combo';
    slot: string;
    suite: string;
    guestName: string;
    phone?: string;
    notes?: string;
    createdAt?: string;
}

// Convert "HH:MM" to minutes from midnight
const timeToMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.trim().split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
};

// Check if two bookings conflict
const isConflict = (b1Facility: string, b1Slot: string, b2Facility: string, b2Slot: string) => {
    const facConflict = (b1Facility === 'combo' || b2Facility === 'combo' || b1Facility === b2Facility);
    if (!facConflict) return false;

    const [b1StartStr, b1EndStr] = b1Slot.split(' - ');
    const [b2StartStr, b2EndStr] = b2Slot.split(' - ');

    const b1Start = timeToMinutes(b1StartStr);
    const b1End = timeToMinutes(b1EndStr);
    const b2Start = timeToMinutes(b2StartStr);
    const b2End = timeToMinutes(b2EndStr);

    return (b1Start < b2End && b1End > b2Start);
};

const WellnessBooking: React.FC = () => {
    // Current State
    const [activeFacility, setActiveFacility] = useState<'sauna' | 'hottub' | 'combo'>('sauna');
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    // Bookings Data Store
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    // Selected Slot for Booking Modal
    const [activeSlotObj, setActiveSlotObj] = useState<typeof TIME_SLOTS_30[0] | null>(null);

    // Modal Specific Options
    const [isComboUpgrade, setIsComboUpgrade] = useState(false);

    // Form Fields
    const [selectedSuite, setSelectedSuite] = useState(SUITES[0]);
    const [guestName, setGuestName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [bookingError, setBookingError] = useState<string | null>(null);

    // Confirmation State
    const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
    const [customWaRecipient, setCustomWaRecipient] = useState('');

    // Staff Mode State
    const [isStaffMode, setIsStaffMode] = useState(false);
    const [staffPin, setStaffPin] = useState('');
    const [showStaffPinModal, setShowStaffPinModal] = useState(false);
    const [pinError, setPinError] = useState(false);

    // Bedroom QR Sign View Modal
    const [showQRSignModal, setShowQRSignModal] = useState(false);

    // Generate upcoming 7 days for date picker
    const dateOptions = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
        const fullDate = d.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        return { iso, label, fullDate };
    });

    // Load bookings from API & LocalStorage fallback
    const fetchBookings = async (dateStr: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/wellness-booking?date=${dateStr}`);
            if (res.ok) {
                const data = await res.json();
                const remoteBookings: Booking[] = data.bookings || [];
                
                const localStr = localStorage.getItem(`montbleu_wellness_${dateStr}`);
                const localBookings: Booking[] = localStr ? JSON.parse(localStr) : [];
                
                const combined = [...remoteBookings];
                localBookings.forEach(lb => {
                    if (!combined.some(cb => cb.id === lb.id || isConflict(cb.facility, cb.slot, lb.facility, lb.slot))) {
                        combined.push(lb);
                    }
                });

                setBookings(combined);
                setLoading(false);
                return;
            }
        } catch (err) {
            console.log('Using local bookings fallback:', err);
        }

        const localStr = localStorage.getItem(`montbleu_wellness_${dateStr}`);
        setBookings(localStr ? JSON.parse(localStr) : []);
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings(selectedDate);

        const interval = setInterval(() => {
            fetchBookings(selectedDate);
        }, 10000);

        return () => clearInterval(interval);
    }, [selectedDate]);

    // Check if slot is blocked by lead time (min 1 hr advance notice required for today)
    const getSlotLeadTimeStatus = (slotStartStr: string) => {
        const todayIso = new Date().toISOString().split('T')[0];
        if (selectedDate < todayIso) return { isBlocked: true, reason: 'Past Date' };
        if (selectedDate > todayIso) return { isBlocked: false };

        // For today's date
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const cutoffMinutes = currentMinutes + 60; // 1 hr (60 mins) lead time required
        const slotMinutes = timeToMinutes(slotStartStr);

        if (slotMinutes < currentMinutes) {
            return { isBlocked: true, reason: 'Past Time' };
        }
        if (slotMinutes < cutoffMinutes) {
            return { isBlocked: true, reason: 'Min 1 hr notice required' };
        }

        return { isBlocked: false };
    };

    // Handle Slot Click
    const handleSlotClick = (slotObj: typeof TIME_SLOTS_30[0], existingBooking?: Booking, leadStatus?: { isBlocked: boolean; reason?: string }) => {
        if (leadStatus?.isBlocked && !isStaffMode) {
            alert(`This slot cannot be reserved (${leadStatus.reason}). Reservations require at least 1 hour advance notice.`);
            return;
        }

        if (existingBooking) {
            if (isStaffMode) {
                if (window.confirm(`Cancel booking for ${existingBooking.suite} (${existingBooking.guestName}) at ${existingBooking.slot}?`)) {
                    cancelBooking(existingBooking);
                }
            } else {
                alert(`This time slot is reserved. Please select another available time.`);
            }
            return;
        }

        setActiveSlotObj(slotObj);
        setIsComboUpgrade(activeFacility === 'combo');
        setBookingError(null);
    };

    // Confirm Booking Submission
    const handleConfirmBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeSlotObj) return;

        if (!guestName.trim()) {
            setBookingError('Please enter guest name.');
            return;
        }

        const facilityToBook: 'sauna' | 'hottub' | 'combo' = (activeFacility === 'combo' || isComboUpgrade) ? 'combo' : activeFacility;
        const slotToBook = (facilityToBook === 'combo') ? activeSlotObj.label60 : activeSlotObj.label30;

        const newBooking: Booking = {
            id: 'wb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            date: selectedDate,
            facility: facilityToBook,
            slot: slotToBook,
            suite: selectedSuite,
            guestName: guestName.trim(),
            phone: phone.trim(),
            notes: notes.trim(),
            createdAt: new Date().toISOString()
        };

        setLoading(true);
        setBookingError(null);

        try {
            const res = await fetch('/api/wellness-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBooking)
            });

            if (res.status === 409) {
                const errData = await res.json();
                setBookingError(errData.error || 'This slot was just reserved by another guest. Please pick another time.');
                setLoading(false);
                fetchBookings(selectedDate);
                return;
            }

            if (res.ok) {
                const data = await res.json();
                if (data.booking) {
                    newBooking.id = data.booking.id;
                }
            }
        } catch (err) {
            console.log('Saved to local storage fallback');
        }

        // Save to local storage backup
        const localKey = `montbleu_wellness_${selectedDate}`;
        const existingLocalStr = localStorage.getItem(localKey);
        const existingLocal: Booking[] = existingLocalStr ? JSON.parse(existingLocalStr) : [];
        existingLocal.push(newBooking);
        localStorage.setItem(localKey, JSON.stringify(existingLocal));

        // Update state
        setBookings(prev => [...prev.filter(b => b.id !== newBooking.id), newBooking]);
        setConfirmedBooking(newBooking);
        setActiveSlotObj(null);
        setGuestName('');
        setPhone('');
        setNotes('');
        setLoading(false);

        // Auto trigger WhatsApp message helper
        triggerWhatsAppNotification(newBooking);
    };

    // Cancel Booking (Staff Mode)
    const cancelBooking = async (booking: Booking) => {
        try {
            await fetch('/api/wellness-booking', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: selectedDate, bookingId: booking.id })
            });
        } catch (err) {
            console.log('Local cancel fallback');
        }

        const localKey = `montbleu_wellness_${selectedDate}`;
        const existingLocalStr = localStorage.getItem(localKey);
        if (existingLocalStr) {
            const updated = JSON.parse(existingLocalStr).filter((b: Booking) => b.id !== booking.id);
            localStorage.setItem(localKey, JSON.stringify(updated));
        }

        setBookings(prev => prev.filter(b => b.id !== booking.id));
    };

    // Staff PIN unlock
    const handleStaffUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (staffPin === '1234' || staffPin.toLowerCase() === 'montbleu') {
            setIsStaffMode(true);
            setShowStaffPinModal(false);
            setStaffPin('');
            setPinError(false);
        } else {
            setPinError(true);
        }
    };

    // Build WhatsApp Notification Link
    const getWhatsAppUrl = (booking: Booking, customNumber?: string) => {
        const facilityLabel = booking.facility === 'combo'
            ? 'Sauna & Hot Tub Combined Experience (1 Hour)'
            : booking.facility === 'sauna' ? 'Riverside Sauna' : 'Mountain Hot Tub';

        const text = `Hi Mont Bleu Team, reservation confirmed:\n\n` +
            `• Facility: ${facilityLabel}\n` +
            `• Date: ${booking.date}\n` +
            `• Time: ${booking.slot}\n` +
            `• Suite: ${booking.suite}\n` +
            `• Guest: ${booking.guestName}` +
            (booking.phone ? ` (${booking.phone})` : '');

        if (customNumber && customNumber.trim()) {
            const cleanNum = customNumber.replace(/[^0-9]/g, '');
            return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
        }

        return `https://wa.me/?text=${encodeURIComponent(text)}`;
    };

    const triggerWhatsAppNotification = (booking: Booking) => {
        const url = getWhatsAppUrl(booking);
        // Open WhatsApp automatically in a new tab if supported
        window.open(url, '_blank');
    };

    // Download iCal (.ics) Calendar File
    const downloadICS = (booking: Booking) => {
        const [startStr, endStr] = booking.slot.split(' - ');
        const startDateStr = `${booking.date.replace(/-/g, '')}T${startStr.replace(':', '')}00`;
        const endDateStr = `${booking.date.replace(/-/g, '')}T${endStr.replace(':', '')}00`;
        const facilityName = booking.facility === 'combo'
            ? 'Sauna & Hot Tub Combo Experience'
            : booking.facility === 'sauna' ? 'Riverside Sauna & Plunge Pool' : 'Mountain Hot Tub';

        const icsData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Mont Bleu Guesthouse//Wellness Booking//EN',
            'BEGIN:VEVENT',
            `SUMMARY:Private Session: ${facilityName}`,
            `DESCRIPTION:Mont Bleu Wellness Session for ${booking.suite} (${booking.guestName}). Please finish on time for the next guests.`,
            `LOCATION:Mont Bleu Guesthouse, Le Sanctuaire Farm, Franschhoek`,
            `DTSTART:${startDateStr}`,
            `DTEND:${endDateStr}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `MontBleu_${booking.facility}_${booking.date}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const currentFormattedDate = dateOptions.find(d => d.iso === selectedDate)?.fullDate || selectedDate;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-sanctuary-sand">
            <Helmet>
                <title>Sauna & Hot Tub Reservations | Mont Bleu Guesthouse</title>
                <meta name="description" content="Reserve your private session at Mont Bleu's Riverside Sauna & Mountain Hot Tub." />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header Section */}
                <SectionObserver className="text-center mb-10">
                    <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-3 block font-medium">
                        Le Sanctuaire Wellness
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif text-sanctuary-blue mb-4">
                        Sauna & Hot Tub Reservations
                    </h1>
                    <p className="text-sm md:text-base text-sanctuary-blue/70 max-w-xl mx-auto font-light leading-relaxed">
                        Enjoy complimentary private access to our wellness facilities. Select your facility and preferred time slot below.
                    </p>

                    {/* Staff Mode Bar */}
                    <div className="mt-6 flex items-center justify-center space-x-3">
                        <button
                            onClick={() => {
                                if (isStaffMode) {
                                    setIsStaffMode(false);
                                } else {
                                    setShowStaffPinModal(true);
                                }
                            }}
                            className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full border border-sanctuary-blue/20 bg-white/60 text-sanctuary-blue hover:bg-white transition-colors"
                        >
                            {isStaffMode ? (
                                <>
                                    <Unlock className="w-3.5 h-3.5 text-sanctuary-gold" />
                                    <span>Staff View Active (Exit)</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3.5 h-3.5 text-sanctuary-blue/60" />
                                    <span>Staff / Housekeeper Portal</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => setShowQRSignModal(true)}
                            className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full border border-sanctuary-blue/20 bg-white/60 text-sanctuary-blue hover:bg-white transition-colors"
                        >
                            <Smartphone className="w-3.5 h-3.5 text-sanctuary-gold" />
                            <span>Room QR Card</span>
                        </button>
                    </div>
                </SectionObserver>

                {/* Facility Selector Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-sanctuary-blue/10 shadow-sm flex max-w-lg w-full">
                        <button
                            onClick={() => setActiveFacility('sauna')}
                            className={`flex-1 py-3 px-3 rounded-full text-xs md:text-sm font-serif transition-all duration-300 flex items-center justify-center space-x-1.5 ${activeFacility === 'sauna' ? 'bg-sanctuary-blue text-white shadow-md' : 'text-sanctuary-blue/70 hover:text-sanctuary-blue'}`}
                        >
                            <Sparkles className="w-3.5 h-3.5 text-sanctuary-gold" />
                            <span>Sauna (30m)</span>
                        </button>
                        <button
                            onClick={() => setActiveFacility('hottub')}
                            className={`flex-1 py-3 px-3 rounded-full text-xs md:text-sm font-serif transition-all duration-300 flex items-center justify-center space-x-1.5 ${activeFacility === 'hottub' ? 'bg-sanctuary-blue text-white shadow-md' : 'text-sanctuary-blue/70 hover:text-sanctuary-blue'}`}
                        >
                            <Calendar className="w-3.5 h-3.5 text-sanctuary-gold" />
                            <span>Hot Tub (30m)</span>
                        </button>
                        <button
                            onClick={() => setActiveFacility('combo')}
                            className={`flex-1 py-3 px-3 rounded-full text-xs md:text-sm font-serif transition-all duration-300 flex items-center justify-center space-x-1.5 ${activeFacility === 'combo' ? 'bg-sanctuary-blue text-white shadow-md' : 'text-sanctuary-blue/70 hover:text-sanctuary-blue'}`}
                        >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Combo (60m)</span>
                        </button>
                    </div>
                </div>

                {/* Date Picker Scroll */}
                <div className="bg-white p-4 md:p-6 rounded-2xl border border-sanctuary-stone/40 shadow-md mb-8">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-xs uppercase tracking-widest text-sanctuary-gold font-serif">Select Date</span>
                        <span className="text-xs text-sanctuary-blue/60 font-medium">{currentFormattedDate}</span>
                    </div>

                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
                        {dateOptions.map((opt) => (
                            <button
                                key={opt.iso}
                                onClick={() => setSelectedDate(opt.iso)}
                                className={`flex-shrink-0 px-5 py-3 rounded-xl border text-center transition-all duration-300 ${selectedDate === opt.iso ? 'bg-sanctuary-blue border-sanctuary-blue text-white shadow-md' : 'bg-sanctuary-sand/30 border-sanctuary-blue/10 text-sanctuary-blue hover:bg-sanctuary-sand'}`}
                            >
                                <span className="block text-xs font-semibold uppercase tracking-wider">{opt.label}</span>
                                <span className="block text-[10px] opacity-80 mt-0.5">{opt.iso.split('-').slice(1).join('/')}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Slots Grid */}
                <div className="bg-white p-6 md:p-10 rounded-2xl border border-sanctuary-stone/40 shadow-xl">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-sanctuary-blue/10">
                        <div>
                            <h2 className="text-xl md:text-2xl font-serif text-sanctuary-blue capitalize">
                                {activeFacility === 'combo' ? 'Sauna & Hot Tub Combo' : activeFacility === 'sauna' ? 'Riverside Sauna & Plunge Pool' : 'Mountain Hot Tub'}
                            </h2>
                            <p className="text-xs text-sanctuary-blue/60 mt-1">
                                {activeFacility === 'combo'
                                    ? '60-minute combined private session for both facilities'
                                    : '30-minute private sessions • 15 min cleaning buffer'}
                            </p>
                        </div>
                        {loading && (
                            <span className="text-xs text-sanctuary-gold animate-pulse font-serif">Syncing live availability...</span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TIME_SLOTS_30.map((slotObj) => {
                            const candidateSlotLabel = (activeFacility === 'combo') ? slotObj.label60 : slotObj.label30;

                            // Check lead time (min 1 hr advance notice required for today)
                            const leadStatus = getSlotLeadTimeStatus(slotObj.start);

                            // Find conflicting booking
                            const existingBooking = bookings.find(b => isConflict(b.facility, b.slot, activeFacility, candidateSlotLabel));
                            const isBooked = !!existingBooking;

                            return (
                                <button
                                    key={slotObj.start}
                                    onClick={() => handleSlotClick(slotObj, existingBooking, leadStatus)}
                                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[95px] ${
                                        isBooked
                                            ? 'bg-sanctuary-blue/5 border-sanctuary-blue/20 text-sanctuary-blue cursor-pointer hover:border-sanctuary-blue/40'
                                            : leadStatus.isBlocked
                                                ? 'bg-gray-50 border-gray-200 text-gray-400 opacity-60 cursor-not-allowed'
                                                : 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900 hover:bg-emerald-100/80 hover:border-emerald-400 hover:shadow-md'
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full mb-2">
                                        <div className="flex items-center space-x-2">
                                            <Clock className={`w-4 h-4 ${isBooked ? 'text-sanctuary-blue/50' : leadStatus.isBlocked ? 'text-gray-400' : 'text-emerald-600'}`} />
                                            <span className="font-serif font-medium text-sm md:text-base">{candidateSlotLabel}</span>
                                        </div>

                                        {isBooked ? (
                                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-sanctuary-blue/10 text-sanctuary-blue border border-sanctuary-blue/20">
                                                Reserved
                                            </span>
                                        ) : leadStatus.isBlocked ? (
                                            <span className="text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                                                {leadStatus.reason}
                                            </span>
                                        ) : (
                                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                                                Available
                                            </span>
                                        )}
                                    </div>

                                    {isBooked ? (
                                        <div className="text-xs text-sanctuary-blue/80 font-medium truncate pt-1 border-t border-sanctuary-blue/10">
                                            {isStaffMode ? (
                                                <div>
                                                    <span className="font-semibold">{existingBooking.suite}</span>
                                                    <span className="block text-[11px] text-sanctuary-blue/70 font-normal">
                                                        {existingBooking.guestName} {existingBooking.phone ? `• ${existingBooking.phone}` : ''}
                                                    </span>
                                                    <span className="block text-[10px] text-red-600 font-medium mt-0.5">Click to cancel</span>
                                                </div>
                                            ) : (
                                                <span className="italic text-sanctuary-blue/60 text-[11px]">Private Guest Reservation</span>
                                            )}
                                        </div>
                                    ) : leadStatus.isBlocked ? (
                                        <div className="text-[11px] text-gray-400 italic pt-1 border-t border-gray-200">
                                            Reservations require min 1 hr notice
                                        </div>
                                    ) : (
                                        <div className="text-xs text-emerald-700 font-light flex items-center space-x-1 pt-1 border-t border-emerald-200/60">
                                            <Plus className="w-3 h-3" />
                                            <span>Reserve Private Session</span>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Important Guest Guidelines */}
                <div className="mt-10 p-6 bg-sanctuary-sand/60 rounded-xl border border-sanctuary-blue/10 text-center">
                    <h3 className="text-sm font-serif text-sanctuary-blue uppercase tracking-wider mb-2">Guest Etiquette & Safety</h3>
                    <p className="text-xs text-sanctuary-blue/70 leading-relaxed max-w-2xl mx-auto font-light">
                        Please arrive on time and finish promptly at the end of your session so our team can refresh the area for the next guests. Always shower before entering the hot tub or sauna. Reservations require at least 1 hour advance notice. Use facilities at your own risk.
                    </p>
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {activeSlotObj && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-sanctuary-blue/10 relative overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveSlotObj(null)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold block mb-1">
                                    Reserve Private Session
                                </span>
                                <h3 className="text-2xl font-serif text-sanctuary-blue">
                                    {(activeFacility === 'combo' || isComboUpgrade) 
                                        ? 'Sauna & Hot Tub Combo' 
                                        : activeFacility === 'sauna' ? 'Riverside Sauna' : 'Mountain Hot Tub'}
                                </h3>
                                <div className="mt-2 inline-flex items-center space-x-2 text-xs font-medium text-sanctuary-blue bg-sanctuary-sand/60 px-3 py-1.5 rounded-lg border border-sanctuary-blue/10">
                                    <Clock className="w-3.5 h-3.5 text-sanctuary-gold" />
                                    <span>
                                        {(activeFacility === 'combo' || isComboUpgrade) ? activeSlotObj.label60 : activeSlotObj.label30} ({currentFormattedDate})
                                    </span>
                                </div>
                            </div>

                            {/* Option to Upgrade to Combo */}
                            {activeFacility !== 'combo' && (
                                <div className="mb-6 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between">
                                    <div>
                                        <span className="block text-xs font-semibold text-amber-900">Include Both Facilities?</span>
                                        <span className="block text-[11px] text-amber-800/80">Reserve Sauna & Hot Tub together for a 1-Hour Session</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isComboUpgrade}
                                            onChange={(e) => setIsComboUpgrade(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sanctuary-blue"></div>
                                    </label>
                                </div>
                            )}

                            {bookingError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                                    <span>{bookingError}</span>
                                </div>
                            )}

                            <form onSubmit={handleConfirmBooking} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-sanctuary-blue mb-1.5">
                                        Your Suite / Room <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedSuite}
                                        onChange={(e) => setSelectedSuite(e.target.value)}
                                        className="w-full bg-sanctuary-sand/20 border border-sanctuary-blue/20 rounded-xl px-4 py-3 text-sm text-sanctuary-blue focus:outline-none focus:border-sanctuary-blue"
                                        required
                                    >
                                        {SUITES.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-sanctuary-blue mb-1.5">
                                        Guest Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-sanctuary-blue/40 absolute left-3.5 top-3.5" />
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            className="w-full bg-sanctuary-sand/20 border border-sanctuary-blue/20 rounded-xl pl-10 pr-4 py-3 text-sm text-sanctuary-blue focus:outline-none focus:border-sanctuary-blue"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-sanctuary-blue mb-1.5">
                                        WhatsApp / Mobile Number <span className="text-xs text-sanctuary-blue/50 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-sanctuary-blue/40 absolute left-3.5 top-3.5" />
                                        <input
                                            type="tel"
                                            placeholder="+27 82 123 4567"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-sanctuary-sand/20 border border-sanctuary-blue/20 rounded-xl pl-10 pr-4 py-3 text-sm text-sanctuary-blue focus:outline-none focus:border-sanctuary-blue"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setActiveSlotObj(null)}
                                        className="px-5 py-3 text-xs uppercase tracking-wider font-medium text-sanctuary-blue/70 hover:text-sanctuary-blue transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        variant="primary"
                                        className="px-6 py-3 text-xs uppercase tracking-widest"
                                    >
                                        Confirm Reservation
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confirmation Success Modal */}
            <AnimatePresence>
                {confirmedBooking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-sanctuary-blue/10 text-center relative overflow-hidden"
                        >
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>

                            <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold block mb-1">
                                Session Confirmed
                            </span>
                            <h3 className="text-2xl font-serif text-sanctuary-blue mb-2">
                                Your Session is Reserved!
                            </h3>

                            <div className="my-5 p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10 text-left space-y-2 text-xs md:text-sm text-sanctuary-blue">
                                <div><strong>Facility:</strong> {confirmedBooking.facility === 'combo' ? 'Sauna & Hot Tub Combo (1 Hour)' : confirmedBooking.facility === 'sauna' ? 'Riverside Sauna & Plunge Pool' : 'Mountain Hot Tub'}</div>
                                <div><strong>Date:</strong> {confirmedBooking.date}</div>
                                <div><strong>Slot Time:</strong> {confirmedBooking.slot}</div>
                                <div><strong>Reserved For:</strong> {confirmedBooking.suite} ({confirmedBooking.guestName})</div>
                            </div>

                            <div className="space-y-3 pt-1">
                                {/* Send WhatsApp to Mont Bleu Team */}
                                <a
                                    href={getWhatsAppUrl(confirmedBooking)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-emerald-600 text-white text-xs uppercase tracking-widest font-medium hover:bg-emerald-700 transition-colors shadow-md"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Send WhatsApp to Mont Bleu Team</span>
                                </a>

                                {/* Send to Custom Number Input */}
                                <div className="pt-2 border-t border-sanctuary-blue/10">
                                    <label className="block text-[11px] text-sanctuary-blue/70 mb-1 font-medium">
                                        Or send confirmation via WhatsApp to a specific phone number:
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="tel"
                                            placeholder="+27 82 000 0000"
                                            value={customWaRecipient}
                                            onChange={(e) => setCustomWaRecipient(e.target.value)}
                                            className="flex-1 bg-sanctuary-sand/30 border border-sanctuary-blue/20 rounded-xl px-3 py-2 text-xs text-sanctuary-blue focus:outline-none focus:border-sanctuary-blue"
                                        />
                                        <a
                                            href={getWhatsAppUrl(confirmedBooking, customWaRecipient)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-sanctuary-blue text-white rounded-xl text-xs font-medium hover:bg-sanctuary-blue/90 flex items-center space-x-1"
                                        >
                                            <Send className="w-3.5 h-3.5" />
                                            <span>Send</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Add to iCal / Calendar */}
                                <button
                                    onClick={() => downloadICS(confirmedBooking)}
                                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full border border-sanctuary-blue/30 text-sanctuary-blue text-xs uppercase tracking-widest font-medium hover:bg-sanctuary-sand transition-colors mt-2"
                                >
                                    <Download className="w-4 h-4 text-sanctuary-gold" />
                                    <span>Add to My Calendar (.ics)</span>
                                </button>

                                <button
                                    onClick={() => setConfirmedBooking(null)}
                                    className="block w-full text-xs text-sanctuary-blue/60 hover:text-sanctuary-blue pt-2 transition-colors"
                                >
                                    Close Window
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Staff PIN Modal */}
            <AnimatePresence>
                {showStaffPinModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-sanctuary-blue/10 text-center relative"
                        >
                            <button
                                onClick={() => setShowStaffPinModal(false)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <Lock className="w-8 h-8 text-sanctuary-gold mx-auto mb-3" />
                            <h3 className="text-lg font-serif text-sanctuary-blue mb-1">Staff Access</h3>
                            <p className="text-xs text-sanctuary-blue/60 mb-4">Enter Staff PIN to view guest names, phone numbers & manage bookings.</p>

                            <form onSubmit={handleStaffUnlock} className="space-y-4">
                                <input
                                    type="password"
                                    placeholder="Enter PIN (Default: 1234)"
                                    value={staffPin}
                                    onChange={(e) => setStaffPin(e.target.value)}
                                    className="w-full bg-sanctuary-sand/30 border border-sanctuary-blue/20 rounded-xl px-4 py-3 text-center text-sm font-semibold tracking-widest text-sanctuary-blue focus:outline-none focus:border-sanctuary-blue"
                                    autoFocus
                                />
                                {pinError && <p className="text-xs text-red-600 font-medium">Incorrect PIN (Try 1234)</p>}

                                <Button variant="primary" className="w-full py-3 text-xs uppercase tracking-widest">
                                    Unlock Staff View
                                </Button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bedroom QR Sign Modal */}
            <AnimatePresence>
                {showQRSignModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-sanctuary-sand rounded-2xl max-w-md w-full p-8 shadow-2xl border border-sanctuary-blue/20 text-center relative"
                        >
                            <button
                                onClick={() => setShowQRSignModal(false)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 border-2 border-sanctuary-blue/30 rounded-xl bg-white shadow-lg">
                                <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-sanctuary-gold block mb-2 font-medium">
                                    MONT BLEU GUESTHOUSE
                                </span>
                                <h3 className="text-2xl font-serif text-sanctuary-blue mb-4">
                                    Enjoy the Sauna & Hot Tub
                                </h3>

                                <div className="my-6 p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10 flex justify-center">
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.montbleu.co.za/relax-booking"
                                        alt="Scan to Book Sauna & Hot Tub"
                                        className="w-40 h-40 rounded-lg shadow-sm border border-sanctuary-blue/10"
                                    />
                                </div>

                                <p className="text-xs text-sanctuary-blue/80 font-light leading-relaxed mb-3">
                                    Scan to view available times and reserve your private session.
                                </p>

                                <p className="text-[11px] text-sanctuary-blue/60 italic font-light">
                                    Reservations require at least 1 hour advance notice. Please finish on time so the next guests can enjoy their session.
                                </p>
                            </div>

                            <button
                                onClick={() => window.print()}
                                className="mt-6 px-6 py-2.5 rounded-full bg-sanctuary-blue text-white text-xs uppercase tracking-wider font-serif hover:bg-sanctuary-blue/90 transition-colors"
                            >
                                Print Bedroom Sign
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WellnessBooking;

