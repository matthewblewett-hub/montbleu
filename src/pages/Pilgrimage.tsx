import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Compass, ChevronRight, ChevronLeft, Printer, Sparkles, BookOpen, Smartphone, X, Heart, Sun, Clock } from 'lucide-react';
import SectionObserver from '../components/ui/SectionObserver';

interface Station {
    id: number;
    title: string;
    subtitle: string;
    zone: string;
    scripture: string;
    scriptureRef: string;
    poetry?: string;
    meditation: string;
    reflectionPrompt: string;
    practicalAction?: string;
}

const STATIONS: Station[] = [
    {
        id: 1,
        title: "The Highway & Threshold",
        subtitle: "Entering the Sacred Space",
        zone: "Zone 1: Threshold of Journey",
        scripture: "A voice of one calling: 'In the wilderness prepare the way for the Lord; make straight in the desert a highway for our God.'",
        scriptureRef: "Isaiah 40:3",
        poetry: "Step off the noise of the world below.\nPause at the gate; breathe slow.\nFor here the ground is sacred and wild,\nAn invitation to walk as a child.",
        meditation: "As you step onto the Le Sanctuaire Highway, acknowledge the decision to pause. Pilgrimage begins not with a thousand miles, but with the quiet courage to leave distraction behind.",
        reflectionPrompt: "What burden, hurry, or noise are you choosing to leave at the threshold today?",
        practicalAction: "Take three deep breaths. Stand still for 30 seconds before taking your first step forward."
    },
    {
        id: 2,
        title: "The Cypress Gallery",
        subtitle: "The 12 Upright Ones",
        zone: "Zone 1: Threshold of Journey",
        scripture: "They will be called oaks of righteousness, a planting of the Lord for the display of his splendor.",
        scriptureRef: "Isaiah 61:3",
        poetry: "Twelve trees stand tall, reaching skyward—\nsentinels of stillness, rooted in the earth,\nyet drawn to heaven’s light.\nSix to the left, six to the right—\na sacred symmetry,\nechoing the tribes, the apostles,\nthe full company of seekers.",
        meditation: "The 12 Cypress trees stand like guardians reaching from the mountain soil into the blue sky. They embody sacred symmetry—the 12 tribes, 12 apostles, and 12 gates—representing the full diversity of all seekers invited into divine rest.",
        reflectionPrompt: "Where in your life do you need deep roots in the earth and an open heart toward heaven?",
        practicalAction: "Walk between the cypress trees. Pause halfway down the lane and look directly up into their tall crowns."
    },
    {
        id: 3,
        title: "The Gardens & Dualities",
        subtitle: "Roses & Wildflowers",
        zone: "Zone 2: Gardens of Harmony",
        scripture: "The wilderness and the solitary place shall be glad for them; and the desert shall rejoice, and blossom as the rose.",
        scriptureRef: "Isaiah 35:1",
        poetry: "The rose in its glory, pruned and refined;\nThe wildflower dancing, raw and untamed.\nBoth breathe of beauty, both speak of grace,\nUnited in harmony in this sacred place.",
        meditation: "Here order and chaos meet. Over 20 varieties of cultivated roses release rich fragrance alongside the wild, untamed fynbos. Life is a dance between what we cultivate and what grows wild by grace.",
        reflectionPrompt: "What wild, unpruned part of your journey can you offer for blessing today?",
        practicalAction: "Touch a rose leaf carefully, then smell a stem of wild fynbos. Notice the contrast."
    },
    {
        id: 4,
        title: "Oak Tree Meander & Le Chêne",
        subtitle: "The Great Oak of Covenant",
        zone: "Zone 2: Gardens of Harmony",
        scripture: "Abram traveled through the land as far as the site of the great tree of Moreh at Shechem... There the Lord appeared to Abram.",
        scriptureRef: "Genesis 12:6-7",
        poetry: "Beneath this ancient crown of green,\nWhere light and leaf and silence lean,\nThe earth remembers covenant made,\nRest weary soul inside this shade.",
        meditation: "Planted over 100 years ago by French Hugenot pioneers, Le Chêne stands as a living cathedral. Oaks are places of encounter—thin places where heaven speaks low on earth.",
        reflectionPrompt: "Where do you need to 'pitch your tent' and rest in covenant peace?",
        practicalAction: "Sit on the bench beneath the oak canopy. Rest in silence for 2 minutes."
    },
    {
        id: 5,
        title: "The Olives & Simonsberg Vista",
        subtitle: "Peace & Expanding Horizon",
        zone: "Zone 3: River & Grove",
        scripture: "I am like an olive tree flourishing in the house of God; I trust in God’s unfailing love for ever and ever.",
        scriptureRef: "Psalm 52:8",
        poetry: "Silver leaves in mountain wind,\nRoots that hold through fire and drought.\nLook out across the valley floor,\nLet peace dissolve all fear and doubt.",
        meditation: "The olive grove represents resilience and peace. From here, the view opens across the valley floor to the majestic Simonsberg mountain peak.",
        reflectionPrompt: "What enduring peace are you trusting God to cultivate in your life?",
        practicalAction: "Gaze out toward the Simonsberg peak. Hold your hands open at your side as a sign of receiving."
    },
    {
        id: 6,
        title: "The Waboom & The Orchard",
        subtitle: "Ancient Roots & Fruitfulness",
        zone: "Zone 3: River & Grove",
        scripture: "He is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither.",
        scriptureRef: "Psalm 1:3",
        poetry: "Old waboom bark and orchard bough,\nBearing fruit in season's turn.\nTrust the timing of the earth,\nThere is a grace in what we learn.",
        meditation: "The indigenous Waboom protea tree has survived centuries of fire and weather. Alongside the farm orchard, it reminds us that true fruitfulness takes time and patience.",
        reflectionPrompt: "What season of growth are you currently in—planting, pruning, or harvesting?",
        practicalAction: "Feel the thick, protective leaf of the Waboom tree."
    },
    {
        id: 7,
        title: "The Gulley & Stream Crossing",
        subtitle: "Crossing the Threshold",
        zone: "Zone 4: Waterways of Renewal",
        scripture: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.",
        scriptureRef: "Isaiah 43:2",
        poetry: "Water flowing over stone,\nCleansing every weary thought.\nStep across the river bed,\nFind the peace your soul has sought.",
        meditation: "Water is the great renewer. As the stream flows down from the Wemmershoek catchment, crossing the wooden bridge symbolizes leaving past regrets behind.",
        reflectionPrompt: "What past struggle are you ready to let the water wash away?",
        practicalAction: "Pause on the bridge. Listen to the sound of running water for 1 minute."
    },
    {
        id: 8,
        title: "Get Your Feet Wet Rock",
        subtitle: "Embodied Presence",
        zone: "Zone 4: Waterways of Renewal",
        scripture: "Deep calls to deep in the roar of your waterfalls; all your waves and breakers have swept over me.",
        scriptureRef: "Psalm 42:7",
        poetry: "Bare feet on the cool stone ledge,\nTouch the mountain water clear.\nLet the cool stream wash away\nEvery lingering trace of fear.",
        meditation: "Pilgrimage is an embodied physical experience. Taking off your shoes or dipping your fingers in the cold mountain stream grounds you in the immediate present moment.",
        reflectionPrompt: "How can you bring your full physical presence to your spiritual journey?",
        practicalAction: "Dip your fingers or bare feet into the cool mountain stream water."
    },
    {
        id: 9,
        title: "The Waterfall Pool",
        subtitle: "Living Waters & Refreshment",
        zone: "Zone 4: Waterways of Renewal",
        scripture: "Whoever drinks of the water that I will give him will never be thirsty again. The water that I will give him will become in him a spring of water welling up to eternal life.",
        scriptureRef: "John 4:14",
        poetry: "Clear cascade from mountain high,\nFilling pools of mountain stone.\nDrink the freshness of the stream,\nKnow you never walk alone.",
        meditation: "The waterfall pool is fed directly by pristine Cape fynbos mountain catchments. It is a symbol of abundance, refreshment, and unceasing life.",
        reflectionPrompt: "Where is your spirit thirsting for renewal today?",
        practicalAction: "Cup mountain water in your hands or splash your face gently."
    },
    {
        id: 10,
        title: "Fynbos Rock",
        subtitle: "The Resilience of the Cape Flora",
        zone: "Zone 5: Fynbos Slope",
        scripture: "The wilderness and the dry land shall be glad; the desert shall rejoice and blossom like the crocus.",
        scriptureRef: "Isaiah 35:1",
        poetry: "A thousand subtle scents arise,\nFrom restio, protea, and thyme.\nOn rocky slopes the wild plant thrives,\nAscending in its golden prime.",
        meditation: "Cape Fynbos thrives in nutrient-poor soil and requires fire to regenerate. It represents deep human resilience—the ability to blossom in harsh environments.",
        reflectionPrompt: "How has a past hardship or fire in your life birthed unexpected beauty?",
        practicalAction: "Gently rub a leaf of wild fynbos between your fingers and inhale its fragrant aroma."
    },
    {
        id: 11,
        title: "Lookout Rock",
        subtitle: "Perspective & Elevation",
        zone: "Zone 5: Fynbos Slope",
        scripture: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
        scriptureRef: "Psalm 121:1-2",
        poetry: "From higher ground the valley layout clears,\nThe small details fall into place.\nThe worries of the lower ground\nAre swallowed in expanding space.",
        meditation: "As the elevation rises, your perspective broadens. Problems that seemed overwhelming in the valley floor gain proper proportion when viewed from the height of Lookout Rock.",
        reflectionPrompt: "What situation in your life needs a higher, broader perspective?",
        practicalAction: "Sit on Lookout Rock and scan the entire horizon from left to right."
    },
    {
        id: 12,
        title: "The Fynbos Trail",
        subtitle: "Walking in Mindfulness",
        zone: "Zone 5: Fynbos Slope",
        scripture: "Stand at the crossroads and look; ask for the ancient paths, ask where the good way is, and walk in it, and you will find rest for your souls.",
        scriptureRef: "Jeremiah 6:16",
        poetry: "One step, then another step,\nAlong the gravel mountain trail.\nThe path is clear, the light is bright,\nLet peace and gratitude prevail.",
        meditation: "The winding trail requires attentiveness. Each step on gravel and stone is a reminder that the journey itself is the destination.",
        reflectionPrompt: "Are you focused on arriving, or are you savoring the step you are on?",
        practicalAction: "Walk 50 paces in complete silence, focusing only on the sensation of your feet touching the earth."
    },
    {
        id: 13,
        title: "The Labyrinth & Sunset Deck",
        subtitle: "The Journey to the Center",
        zone: "Zone 6: Summit & Sacred Center",
        scripture: "You will seek me and find me when you seek me with all your heart.",
        scriptureRef: "Jeremiah 29:13",
        poetry: "A winding path that leads inside,\nNo dead ends, no path astray.\nWalk slow into the central cross,\nFind wholeness on the pilgrim way.",
        meditation: "Unlike a maze designed to confuse, a labyrinth has a single path to the center. It mirrors the soul's path: winding back and forth, but always drawing toward unity and central peace.",
        reflectionPrompt: "What central truth or peace are you seeking at the core of your soul?",
        practicalAction: "Slowly walk the stone labyrinth to its center. Stand in the center with eyes closed."
    },
    {
        id: 14,
        title: "The Ascent Path",
        subtitle: "Perseverance to the Summit",
        zone: "Zone 6: Summit & Sacred Center",
        scripture: "Let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith.",
        scriptureRef: "Hebrews 12:1-2",
        poetry: "The slope grows steep, the ridge draws near,\nKeep climbing toward the higher light.\nEach step brings heaven closer down,\nReplacing shadow with clear sight.",
        meditation: "The final climb demands effort and steady breathing. Rising above the tree line, you approach the highest ridge of Le Sanctuaire.",
        reflectionPrompt: "What goal or calling requires your renewed commitment to keep climbing?",
        practicalAction: "Pace your breathing—inhale for two steps, exhale for two steps as you ascend."
    },
    {
        id: 15,
        title: "The Ridge",
        subtitle: "Wemmershoek Wilderness & Sanctuary",
        zone: "Zone 6: Summit & Sacred Center",
        scripture: "The mountains may shift and the hills be shaken, but my unfailing love for you will not be shaken.",
        scriptureRef: "Isaiah 54:10",
        poetry: "High on the ridge between two worlds,\nWild mountains stretching far and wide.\nA place of refuge, peace, and grace,\nWhere earth and heaven meet inside.",
        meditation: "Here on the high ridge, you look into the protected Wemmershoek wilderness—home to Cape leopards, mountain fynbos, and pristine headwaters. You stand on holy ground.",
        reflectionPrompt: "How does standing in vast creation alter your feeling of security?",
        practicalAction: "Turn 360 degrees slowly, taking in the full mountain circle around you."
    },
    {
        id: 16,
        title: "Pinnacle Cross",
        subtitle: "Where Heaven Meets Earth",
        zone: "Zone 6: Summit & Sacred Center",
        scripture: "For in him all things were created: things in heaven and on earth, visible and invisible... and through him to reconcile to himself all things.",
        scriptureRef: "Colossians 1:16-20",
        poetry: "A simple cross of mountain timber,\nPerched high above the valley floor.\nHorizontal arms embrace all people,\nVertical shaft opens heaven's door.\nHere the journey finds its home,\nYou do not ever walk alone.",
        meditation: "You have reached Pinnacle Cross. Standing opposite the Franschhoek Valley cross, this simple timber cross represents total reconciliation, peace, and union. Here heaven meets earth.",
        reflectionPrompt: "What prayer of thanksgiving or surrender do you wish to offer at the cross today?",
        practicalAction: "Kneel or sit at the base of the cross. Offer a silent prayer of gratitude."
    }
];

const Pilgrimage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current station ID from query param (e.g. ?station=1)
    const initialStationId = parseInt(searchParams.get('station') || '1', 10);
    const [activeStationId, setActiveStationId] = useState<number>(
        initialStationId >= 1 && initialStationId <= 16 ? initialStationId : 1
    );

    // Timer State
    const [meditationTimer, setMeditationTimer] = useState<number | null>(null);

    // Modal States
    const [showSingleQRModal, setShowSingleQRModal] = useState(false);
    const [showAllQRSheetModal, setShowAllQRSheetModal] = useState(false);

    useEffect(() => {
        const paramId = parseInt(searchParams.get('station') || '1', 10);
        if (paramId >= 1 && paramId <= 16 && paramId !== activeStationId) {
            setActiveStationId(paramId);
        }
    }, [searchParams]);

    const selectStation = (id: number) => {
        setActiveStationId(id);
        setSearchParams({ station: id.toString() });
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const activeStation = STATIONS.find(s => s.id === activeStationId) || STATIONS[0];
    const prevStation = STATIONS.find(s => s.id === activeStationId - 1);
    const nextStation = STATIONS.find(s => s.id === activeStationId + 1);

    // Timer countdown helper
    useEffect(() => {
        if (meditationTimer === null || meditationTimer <= 0) return;
        const interval = setInterval(() => {
            setMeditationTimer(prev => (prev && prev > 1 ? prev - 1 : null));
        }, 1000);
        return () => clearInterval(interval);
    }, [meditationTimer]);

    const getStationUrl = (id: number) => {
        return `https://www.montbleu.co.za/pilgrimage?station=${id}`;
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-sanctuary-sand">
            <Helmet>
                <title>Le Sanctuaire Way | Pilgrimage Walk & Reflection Trail</title>
                <meta name="description" content="Experience Le Sanctuaire Way — a 16-station spiritual pilgrimage walking trail across Mont Bleu estate in Franschhoek." />
            </Helmet>

            <div className="container mx-auto px-4 max-w-5xl">
                {/* Hero Header */}
                <SectionObserver className="text-center mb-12">
                    <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-3 block font-medium">
                        Spiritual Walking Trail • Franschhoek
                    </span>
                    <h1 className="text-3xl md:text-6xl font-serif text-sanctuary-blue mb-4">
                        Le Sanctuaire Way
                    </h1>
                    <p className="text-sm md:text-lg text-sanctuary-blue/70 max-w-2xl mx-auto font-light leading-relaxed">
                        A curated 16-station pilgrimage journey through fynbos slopes, streams, oak groves, and mountain ridges where heaven meets earth.
                    </p>

                    {/* Action Bar */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={() => setShowSingleQRModal(true)}
                            className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-wider px-5 py-2.5 rounded-full border border-sanctuary-blue/20 bg-white/80 text-sanctuary-blue hover:bg-white transition-all shadow-sm"
                        >
                            <Smartphone className="w-4 h-4 text-sanctuary-gold" />
                            <span>Station {activeStation.id} QR Sign</span>
                        </button>

                        <button
                            onClick={() => setShowAllQRSheetModal(true)}
                            className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-wider px-5 py-2.5 rounded-full bg-sanctuary-blue text-white hover:bg-sanctuary-blue/90 transition-all shadow-md"
                        >
                            <Printer className="w-4 h-4 text-sanctuary-gold" />
                            <span>Print All 16 Trail QR Signs</span>
                        </button>
                    </div>
                </SectionObserver>

                {/* 16 Station Selector Horizontal Slider */}
                <div className="mb-10 bg-white p-4 md:p-6 rounded-2xl border border-sanctuary-stone/40 shadow-md">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-xs uppercase tracking-widest text-sanctuary-gold font-serif flex items-center space-x-2">
                            <Compass className="w-4 h-4" />
                            <span>The 16 Reflection Stations</span>
                        </span>
                        <span className="text-xs text-sanctuary-blue/60 font-medium">Station {activeStation.id} of 16</span>
                    </div>

                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                        {STATIONS.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => selectStation(s.id)}
                                className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                                    activeStationId === s.id
                                        ? 'bg-sanctuary-blue border-sanctuary-blue text-white shadow-lg scale-105'
                                        : 'bg-sanctuary-sand/40 border-sanctuary-blue/10 text-sanctuary-blue/70 hover:bg-sanctuary-sand'
                                }`}
                            >
                                <span className="text-xs md:text-sm font-serif font-bold">{s.id}</span>
                                <span className="text-[9px] uppercase tracking-tighter opacity-70">Stn</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Active Station Card */}
                <div className="bg-white rounded-3xl border border-sanctuary-stone/40 shadow-2xl overflow-hidden mb-12">
                    {/* Header Banner */}
                    <div className="bg-sanctuary-blue p-6 md:p-10 text-white relative">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-serif uppercase tracking-[0.25em] text-sanctuary-gold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                {activeStation.zone}
                            </span>
                            <span className="text-xs font-serif text-white/60">
                                Station {activeStation.id} / 16
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-serif mb-2">
                            {activeStation.id}. {activeStation.title}
                        </h2>
                        <p className="text-sm md:text-base text-white/80 font-light italic">
                            {activeStation.subtitle}
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-10 space-y-8">
                        {/* Scripture Callout */}
                        <div className="p-6 rounded-2xl bg-sanctuary-sand/50 border border-sanctuary-blue/10 relative">
                            <BookOpen className="w-5 h-5 text-sanctuary-gold absolute top-6 left-6" />
                            <div className="pl-8">
                                <p className="text-sm md:text-base text-sanctuary-blue font-serif italic leading-relaxed mb-2">
                                    "{activeStation.scripture}"
                                </p>
                                <span className="text-xs font-semibold text-sanctuary-gold uppercase tracking-wider block">
                                    — {activeStation.scriptureRef}
                                </span>
                            </div>
                        </div>

                        {/* Poetry Section (if available) */}
                        {activeStation.poetry && (
                            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-center">
                                <Sparkles className="w-5 h-5 text-amber-600 mx-auto mb-3" />
                                <div className="text-xs md:text-sm text-sanctuary-blue font-serif italic whitespace-pre-line leading-relaxed">
                                    {activeStation.poetry}
                                </div>
                            </div>
                        )}

                        {/* Spiritual Meditation */}
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-sanctuary-gold font-serif font-semibold mb-3">
                                Spiritual Meditation
                            </h3>
                            <p className="text-sm md:text-base text-sanctuary-blue/90 leading-relaxed font-light">
                                {activeStation.meditation}
                            </p>
                        </div>

                        {/* Reflection Prompt */}
                        <div className="p-6 rounded-2xl bg-sanctuary-blue/5 border border-sanctuary-blue/10">
                            <h3 className="text-xs uppercase tracking-widest text-sanctuary-blue font-serif font-semibold mb-2 flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-sanctuary-gold" />
                                <span>Soul Reflection Prompt</span>
                            </h3>
                            <p className="text-sm md:text-base text-sanctuary-blue font-medium leading-relaxed">
                                {activeStation.reflectionPrompt}
                            </p>
                        </div>

                        {/* Practical Action & Meditation Timer */}
                        {activeStation.practicalAction && (
                            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start space-x-3">
                                    <Sun className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-900">Embodied Practice</span>
                                        <p className="text-xs text-emerald-800 leading-relaxed">{activeStation.practicalAction}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setMeditationTimer(meditationTimer ? null : 60)}
                                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-emerald-800 transition-colors flex items-center justify-center space-x-2 flex-shrink-0"
                                >
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{meditationTimer ? `Pause Timer (${meditationTimer}s)` : '1-Min Pause Timer'}</span>
                                </button>
                            </div>
                        )}

                        {/* Station Navigation Footer */}
                        <div className="pt-6 border-t border-sanctuary-blue/10 flex items-center justify-between">
                            {prevStation ? (
                                <button
                                    onClick={() => selectStation(prevStation.id)}
                                    className="inline-flex items-center space-x-2 text-xs md:text-sm font-serif text-sanctuary-blue hover:text-sanctuary-gold transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Station {prevStation.id}: {prevStation.title}</span>
                                </button>
                            ) : <div />}

                            {nextStation ? (
                                <button
                                    onClick={() => selectStation(nextStation.id)}
                                    className="inline-flex items-center space-x-2 text-xs md:text-sm font-serif text-sanctuary-blue hover:text-sanctuary-gold transition-colors"
                                >
                                    <span>Station {nextStation.id}: {nextStation.title}</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : <div />}
                        </div>
                    </div>
                </div>

                {/* Map & Trail Guide Section */}
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-sanctuary-stone/40 shadow-xl text-center">
                    <MapPin className="w-8 h-8 text-sanctuary-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-serif text-sanctuary-blue mb-3">Trail Guidance & Map</h3>
                    <p className="text-xs md:text-sm text-sanctuary-blue/70 max-w-2xl mx-auto leading-relaxed font-light mb-6">
                        Le Sanctuaire Way winds across 6 experiential zones. Follow the wooden station posts marked with QR codes along the path from the Highway entrance up to Pinnacle Cross.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        <div className="p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10">
                            <span className="text-[10px] uppercase tracking-wider text-sanctuary-gold font-bold block mb-1">Zone 1</span>
                            <span className="text-xs font-serif font-semibold text-sanctuary-blue block">Threshold of Journey</span>
                            <span className="text-[11px] text-sanctuary-blue/70">Stations 1 - 2 • Entrance Highway & Cypress Lane</span>
                        </div>
                        <div className="p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10">
                            <span className="text-[10px] uppercase tracking-wider text-sanctuary-gold font-bold block mb-1">Zone 2</span>
                            <span className="text-xs font-serif font-semibold text-sanctuary-blue block">Gardens of Harmony</span>
                            <span className="text-[11px] text-sanctuary-blue/70">Stations 3 - 4 • Rose Garden & Le Chêne Oak</span>
                        </div>
                        <div className="p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10">
                            <span className="text-[10px] uppercase tracking-wider text-sanctuary-gold font-bold block mb-1">Zone 3</span>
                            <span className="text-xs font-serif font-semibold text-sanctuary-blue block">River & Grove</span>
                            <span className="text-[11px] text-sanctuary-blue/70">Stations 5 - 6 • Olives & Waboom Orchard</span>
                        </div>
                        <div className="p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10">
                            <span className="text-[10px] uppercase tracking-wider text-sanctuary-gold font-bold block mb-1">Zone 4</span>
                            <span className="text-xs font-serif font-semibold text-sanctuary-blue block">Waterways of Renewal</span>
                            <span className="text-[11px] text-sanctuary-blue/70">Stations 7 - 9 • Gulley, Rock & Waterfall Pool</span>
                        </div>
                        <div className="p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10">
                            <span className="text-[10px] uppercase tracking-wider text-sanctuary-gold font-bold block mb-1">Zone 5</span>
                            <span className="text-xs font-serif font-semibold text-sanctuary-blue block">Fynbos Slope</span>
                            <span className="text-[11px] text-sanctuary-blue/70">Stations 10 - 12 • Fynbos Rock, Lookout & Trail</span>
                        </div>
                        <div className="p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10">
                            <span className="text-[10px] uppercase tracking-wider text-sanctuary-gold font-bold block mb-1">Zone 6</span>
                            <span className="text-xs font-serif font-semibold text-sanctuary-blue block">Summit & Sacred Center</span>
                            <span className="text-[11px] text-sanctuary-blue/70">Stations 13 - 16 • Labyrinth, Ascent & Pinnacle Cross</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Single Station QR Modal */}
            <AnimatePresence>
                {showSingleQRModal && (
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
                                onClick={() => setShowSingleQRModal(false)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 border-2 border-sanctuary-blue/30 rounded-xl bg-white shadow-lg text-center">
                                <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-sanctuary-gold block mb-1 font-medium">
                                    LE SANCTUAIRE WAY
                                </span>
                                <h3 className="text-2xl font-serif text-sanctuary-blue mb-1">
                                    Station {activeStation.id}
                                </h3>
                                <p className="text-sm font-serif text-sanctuary-blue/80 mb-4">
                                    {activeStation.title}
                                </p>

                                <div className="my-6 p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10 flex justify-center">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getStationUrl(activeStation.id))}`}
                                        alt={`Scan for Station ${activeStation.id}`}
                                        className="w-44 h-44 rounded-lg shadow-sm border border-sanctuary-blue/10"
                                    />
                                </div>

                                <p className="text-xs text-sanctuary-blue/80 font-light leading-relaxed mb-3">
                                    Scan to open guided meditation, scripture & reflection prompt for Station {activeStation.id}.
                                </p>
                            </div>

                            <button
                                onClick={() => window.print()}
                                className="mt-6 px-6 py-2.5 rounded-full bg-sanctuary-blue text-white text-xs uppercase tracking-wider font-serif hover:bg-sanctuary-blue/90 transition-colors inline-flex items-center space-x-2"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print Station {activeStation.id} Sign</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Batch Printable Sheet of All 16 Station QR Signs */}
            <AnimatePresence>
                {showAllQRSheetModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-4xl w-full p-6 md:p-10 shadow-2xl border border-sanctuary-blue/20 relative my-8 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowAllQRSheetModal(false)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center mb-8">
                                <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold block mb-1">
                                    Mont Bleu • Le Sanctuaire Farm
                                </span>
                                <h2 className="text-3xl font-serif text-sanctuary-blue">
                                    All 16 Trail QR Signs
                                </h2>
                                <p className="text-xs text-sanctuary-blue/60 mt-1">
                                    Printable signs for physical wooden posts along Le Sanctuaire Way trail.
                                </p>
                                <button
                                    onClick={() => window.print()}
                                    className="mt-4 px-6 py-2.5 bg-sanctuary-blue text-white rounded-full text-xs uppercase tracking-wider font-medium hover:bg-sanctuary-blue/90 transition-colors inline-flex items-center space-x-2 shadow-md"
                                >
                                    <Printer className="w-4 h-4" />
                                    <span>Print Complete 16-Sign Pack</span>
                                </button>
                            </div>

                            {/* 16 Station Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {STATIONS.map((st) => (
                                    <div key={st.id} className="p-6 border-2 border-sanctuary-blue/20 rounded-2xl bg-sanctuary-sand/30 text-center flex flex-col items-center justify-between">
                                        <div>
                                            <span className="text-[9px] font-serif uppercase tracking-widest text-sanctuary-gold block mb-1 font-bold">
                                                LE SANCTUAIRE WAY
                                            </span>
                                            <h4 className="text-lg font-serif text-sanctuary-blue font-bold">
                                                Station {st.id}
                                            </h4>
                                            <p className="text-xs font-serif text-sanctuary-blue/80 mb-3 truncate max-w-[200px] mx-auto">
                                                {st.title}
                                            </p>
                                        </div>

                                        <div className="p-3 bg-white rounded-xl border border-sanctuary-blue/10 my-2">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(getStationUrl(st.id))}`}
                                                alt={`Station ${st.id} QR Code`}
                                                className="w-32 h-32 rounded-lg"
                                            />
                                        </div>

                                        <p className="text-[10px] text-sanctuary-blue/70 italic mt-2">
                                            Scan for guided reflection & meditation
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Pilgrimage;
