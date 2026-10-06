import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent } from '../../utils/analytics';

export const AnalyticsTracker: React.FC = () => {
    const location = useLocation();

    // 1. SPA Route Navigation Pageview Tracking
    useEffect(() => {
        trackPageView(location.pathname + location.search);
    }, [location]);

    // 2. Global Click Event Delegation Listener for Phone, Email, WhatsApp, & Booking clicks
    useEffect(() => {
        const handleGlobalClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target) return;

            // Find closest link <a> or button <button>
            const clickable = target.closest('a, button');
            if (!clickable) return;

            const href = (clickable.getAttribute('href') || (clickable as any).to || '').trim();
            const text = (clickable.textContent || '').trim().toLowerCase();

            // Phone Clicks
            if (href.startsWith('tel:')) {
                trackEvent('click_phone', { link_url: href });
                return;
            }

            // Email Clicks
            if (href.startsWith('mailto:')) {
                trackEvent('click_email', { link_url: href });
                return;
            }

            // WhatsApp Clicks
            if (href.includes('wa.me') || href.includes('api.whatsapp.com') || href.includes('whatsapp:')) {
                trackEvent('click_whatsapp', { link_url: href });
                return;
            }

            // Booking Clicks (Inn Style, /book, Airbnb, or "Book now" / "Check availability" buttons)
            const isBookingDestination = href === '/book' || href.includes('/book') || href.includes('innstyle') || href.includes('airbnb');
            const isBookingText = text.includes('book now') || text.includes('check availability') || text.includes('book your stay') || text.includes('book direct') || text.includes('book via airbnb');

            if (isBookingDestination || isBookingText) {
                const destination = href || '/book';
                trackEvent('begin_booking', { link_url: destination });
                return;
            }
        };

        const handleFormSubmit = (event: SubmitEvent) => {
            const form = event.target as HTMLFormElement | null;
            const formId = form?.id || form?.name || 'enquiry_form';
            trackEvent('generate_lead', { form_id: formId });
        };

        document.addEventListener('click', handleGlobalClick, { capture: true });
        document.addEventListener('submit', handleFormSubmit, { capture: true });

        return () => {
            document.removeEventListener('click', handleGlobalClick, { capture: true });
            document.removeEventListener('submit', handleFormSubmit, { capture: true });
        };
    }, []);

    return null;
};

export default AnalyticsTracker;
