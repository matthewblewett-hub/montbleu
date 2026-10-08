import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ShieldAlert, Sparkles, User, Phone, X, Smartphone, Plus, Lock, Unlock, Download } from 'lucide-react';
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

// Fixed 45-minute slots with 15-min buffer
const TIME_SLOTS = [
    '08:00 - 08:45',
    '09:00 - 09:45',
    '10:00 - 10:45',
    '11:00 - 11:45',
    '12:00 - 12:45',
    '13:00 - 13:45',
    '14:00 - 14:45',
    '15:00 - 15:45',
    '16:00 - 16:45',
    '17:00 - 17:45',
    '18:00 - 18:45',
    '19:00 - 19:45',
    '20:00 - 20:45'
];

interface Booking {
    id: string;
    date: string;
    facility: 'sauna' | 'hottub';
    slot: string;
    suite: string;
    guestName: string;
    phone?: string;
    notes?: string;
    createdAt?: string;
}

const WellnessBooking: React.FC = () => {
    // Current State
    const [activeFacility, setActiveFacility] = useState<'sauna' | 'hottub'>('sauna');
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    // Bookings Data Store
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    // Selected Slot for Booking Modal
    const [activeSlot, setActiveSlot] = useState<string | null>(null);

    // Form Fields
    const [selectedSuite, setSelectedSuite] = useState(SUITES[0]);
    const [guestName, setGuestName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [bookingError, setBookingError] = useState<string | null>(null);

    // Confirmation State
    const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

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
            // 1. Try fetching from serverless API
            const res = await fetch(`/api/wellness-booking?date=${dateStr}`);
            if (res.ok) {
                const data = await res.json();
                const remoteBookings = data.bookings || [];
                // Merge with local storage backup
                const localStr = localStorage.getItem(`montbleu_wellness_${dateStr}`);
                const localBookings: Booking[] = localStr ? JSON.parse(localStr) : [];
                
                const combined = [...remoteBookings];
                localBookings.forEach(lb => {
                    if (!combined.some(cb => cb.id === lb.id || (cb.facility === lb.facility && cb.slot === lb.slot))) {
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

        // Fallback to localStorage
        const localStr = localStorage.getItem(`montbleu_wellness_${dateStr}`);
        setBookings(localStr ? JSON.parse(localStr) : []);
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings(selectedDate);

        // Auto refresh every 10 seconds for real-time live sync
        const interval = setInterval(() => {
            fetchBookings(selectedDate);
        }, 10000);

        return () => clearInterval(interval);
    }, [selectedDate]);

    // Handle Slot Click
    const handleSlotClick = (slot: string, existingBooking?: Booking) => {
        if (existingBooking) {
            if (isStaffMode) {
                if (window.confirm(`Cancel booking for ${existingBooking.suite} (${existingBooking.guestName}) at ${slot}?`)) {
                    cancelBooking(existingBooking);
                }
            } else {
                alert(`This slot (${slot}) is reserved by ${existingBooking.suite}. Please select an available slot.`);
            }
            return;
        }

        setActiveSlot(slot);
        setBookingError(null);
    };

    // Confirm Booking Submission
    const handleConfirmBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeSlot) return;

        if (!guestName.trim()) {
            setBookingError('Please enter your name.');
            return;
        }

        const newBooking: Booking = {
            id: 'wb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            date: selectedDate,
            facility: activeFacility,
            slot: activeSlot,
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
        setActiveSlot(null);
        setGuestName('');
        setPhone('');
        setNotes('');
        setLoading(false);
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

    // Download iCal (.ics) Calendar File
    const downloadICS = (booking: Booking) => {
        const [startStr, endStr] = booking.slot.split(' - ');
        const startDateStr = `${booking.date.replace(/-/g, '')}T${startStr.replace(':', '')}00`;
        const endDateStr = `${booking.date.replace(/-/g, '')}T${endStr.replace(':', '')}00`;
        const facilityName = booking.facility === 'sauna' ? 'Riverside Sauna & Plunge Pool' : 'Mountain Hot Tub';

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
                        Enjoy complimentary private access to our wellness facilities. Reserve your 45-minute private session below.
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
                    <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-sanctuary-blue/10 shadow-sm flex max-w-md w-full">
                        <button
                            onClick={() => setActiveFacility('sauna')}
                            className={`flex-1 py-3 px-4 rounded-full text-xs md:text-sm font-serif transition-all duration-300 flex items-center justify-center space-x-2 ${activeFacility === 'sauna' ? 'bg-sanctuary-blue text-white shadow-md' : 'text-sanctuary-blue/70 hover:text-sanctuary-blue'}`}
                        >
                            <Sparkles className="w-4 h-4 text-sanctuary-gold" />
                            <span>Riverside Sauna</span>
                        </button>
                        <button
                            onClick={() => setActiveFacility('hottub')}
                            className={`flex-1 py-3 px-4 rounded-full text-xs md:text-sm font-serif transition-all duration-300 flex items-center justify-center space-x-2 ${activeFacility === 'hottub' ? 'bg-sanctuary-blue text-white shadow-md' : 'text-sanctuary-blue/70 hover:text-sanctuary-blue'}`}
                        >
                            <Calendar className="w-4 h-4 text-sanctuary-gold" />
                            <span>Mountain Hot Tub</span>
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
                                {activeFacility === 'sauna' ? 'Riverside Sauna & Plunge Pool' : 'Mountain Hot Tub'}
                            </h2>
                            <p className="text-xs text-sanctuary-blue/60 mt-1">45-minute private sessions • 15 min buffer between guests</p>
                        </div>
                        {loading && (
                            <span className="text-xs text-sanctuary-gold animate-pulse font-serif">Syncing live availability...</span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TIME_SLOTS.map((slot) => {
                            const existingBooking = bookings.find(
                                b => b.facility === activeFacility && b.slot === slot
                            );
                            const isBooked = !!existingBooking;

                            return (
                                <button
                                    key={slot}
                                    onClick={() => handleSlotClick(slot, existingBooking)}
                                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[95px] ${isBooked
                                        ? 'bg-sanctuary-blue/5 border-sanctuary-blue/20 text-sanctuary-blue cursor-pointer hover:border-sanctuary-blue/40'
                                        : 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900 hover:bg-emerald-100/80 hover:border-emerald-400 hover:shadow-md'
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full mb-2">
                                        <div className="flex items-center space-x-2">
                                            <Clock className={`w-4 h-4 ${isBooked ? 'text-sanctuary-blue/50' : 'text-emerald-600'}`} />
                                            <span className="font-serif font-medium text-sm md:text-base">{slot}</span>
                                        </div>

                                        {isBooked ? (
                                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-sanctuary-blue/10 text-sanctuary-blue border border-sanctuary-blue/20">
                                                Reserved
                                            </span>
                                        ) : (
                                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                                                Available
                                            </span>
                                        )}
                                    </div>

                                    {isBooked ? (
                                        <div className="text-xs text-sanctuary-blue/80 font-medium truncate pt-1 border-t border-sanctuary-blue/10">
                                            <span>{existingBooking.suite}</span>
                                            {isStaffMode && (
                                                <span className="block text-[10px] text-red-600 font-normal">Click to cancel</span>
                                            )}
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
                        Please arrive on time and finish promptly at the end of your 45-minute slot so the housekeeper can refresh the area for the next guests. Always shower before entering the hot tub or sauna. Use facilities at your own risk.
                    </p>
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {activeSlot && (
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
                                onClick={() => setActiveSlot(null)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold block mb-1">
                                    Reserve Private Session
                                </span>
                                <h3 className="text-2xl font-serif text-sanctuary-blue">
                                    {activeFacility === 'sauna' ? 'Riverside Sauna' : 'Mountain Hot Tub'}
                                </h3>
                                <div className="mt-2 inline-flex items-center space-x-2 text-xs font-medium text-sanctuary-blue bg-sanctuary-sand/60 px-3 py-1.5 rounded-lg border border-sanctuary-blue/10">
                                    <Clock className="w-3.5 h-3.5 text-sanctuary-gold" />
                                    <span>{activeSlot} ({currentFormattedDate})</span>
                                </div>
                            </div>

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
                                        onClick={() => setActiveSlot(null)}
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

                            <div className="my-6 p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10 text-left space-y-2 text-xs md:text-sm text-sanctuary-blue">
                                <div><strong>Facility:</strong> {confirmedBooking.facility === 'sauna' ? 'Riverside Sauna & Plunge Pool' : 'Mountain Hot Tub'}</div>
                                <div><strong>Date:</strong> {confirmedBooking.date}</div>
                                <div><strong>Slot Time:</strong> {confirmedBooking.slot}</div>
                                <div><strong>Reserved For:</strong> {confirmedBooking.suite} ({confirmedBooking.guestName})</div>
                            </div>

                            <div className="space-y-3 pt-2">
                                {/* WhatsApp Notify Button */}
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`Hi Mont Bleu Housekeeper, I have reserved the ${confirmedBooking.facility === 'sauna' ? 'Riverside Sauna' : 'Mountain Hot Tub'} for ${confirmedBooking.suite} (${confirmedBooking.guestName}) on ${confirmedBooking.date} at ${confirmedBooking.slot}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-emerald-600 text-white text-xs uppercase tracking-widest font-medium hover:bg-emerald-700 transition-colors shadow-md"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>Send WhatsApp to Housekeeper</span>
                                </a>

                                {/* Add to iCal / Calendar */}
                                <button
                                    onClick={() => downloadICS(confirmedBooking)}
                                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full border border-sanctuary-blue/30 text-sanctuary-blue text-xs uppercase tracking-widest font-medium hover:bg-sanctuary-sand transition-colors"
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
                            <p className="text-xs text-sanctuary-blue/60 mb-4">Enter Staff PIN to manage & cancel reservations.</p>

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
                                    {/* QR Code SVG / API Generator */}
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
                                    Please finish on time so the next guests can enjoy their session.
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
