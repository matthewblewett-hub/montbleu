// Google Analytics 4 & Consent Mode v2 Utility
export const GA_MEASUREMENT_ID = 'G-X18ZL4D7TM';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

/**
 * Triggers a GA4 custom event via gtag
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
};

/**
 * Tracks SPA page view navigation in GA4
 */
export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: url,
            send_to: GA_MEASUREMENT_ID
        });
    }
};

/**
 * Updates Consent Mode v2 state and saves choice in localStorage
 */
export const updateConsent = (granted: boolean) => {
    if (typeof window === 'undefined') return;

    const status = granted ? 'granted' : 'denied';
    localStorage.setItem('cookie_consent', status);

    if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
            ad_storage: status,
            ad_user_data: status,
            ad_personalization: status,
            analytics_storage: status
        });
    }
};

/**
 * Retrieves saved cookie consent status from localStorage
 */
export const getSavedConsent = (): 'granted' | 'denied' | null => {
    if (typeof window === 'undefined') return null;
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'granted' || consent === 'denied') {
        return consent;
    }
    return null;
};
