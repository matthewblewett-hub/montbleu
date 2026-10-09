import React from 'react';
import { Helmet } from 'react-helmet-async';

const GuestDirectory: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-[#1f3346] fixed inset-0 z-50 overflow-hidden">
            <Helmet>
                <title>Mont Bleu Guest Guide | Guest Directory</title>
                <meta name="description" content="Official guest information for Mont Bleu Guesthouse at Le Sanctuaire Farm: arrival, facilities, trails, housekeeping, safety and contact numbers." />
            </Helmet>

            <iframe
                src="/guest-directory.html"
                title="Mont Bleu Guest Guide & Directory"
                className="w-full h-full border-none outline-none"
                style={{ width: '100vw', height: '100vh', border: 'none' }}
            />
        </div>
    );
};

export default GuestDirectory;
