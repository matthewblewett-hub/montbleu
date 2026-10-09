import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Compass, ChevronRight, ChevronLeft, Printer, Sparkles, BookOpen, Smartphone, X, Heart, Sun, Clock } from 'lucide-react';
import SectionObserver from '../components/ui/SectionObserver';

interface Space {
    id: number;
    title: string;
    subtitle: string;
    scripture?: string;
    scriptureRef?: string;
    poetry?: string;
    meditationText: string[];
    actionPrompt?: string;
}

const INTRODUCTION_TEXT = [
    "The vision is to create a property that symbolizes the adventure that we are called to by our Creator. For me this is the great quest to participate in the ultimate union of heaven and earth. To move to the sanctuary where the infinite divine resides with finite humanity. This is the story of all creation and the calling of each personal adventurer. It is in this journey that one finds quest, repose and rest for the soul.",
    "Welcome to Le Sanctuaire – the Journey to the Mountain.",
    "Key patterns of the journey manifest in the patterns of the property: The mountains, symbolized in their triangular heaven and earth shape; The Paths, moving the pilgrim closer to the sanctuary; The Stations, places to stop, reflect, and connect; Water, flowing down from heaven to meet the earth; Trees & Flora, celebrating movement towards heaven and abundance in fruit, blossoms, and fynbos."
];

const SPACES: Space[] = [
    {
        id: 1,
        title: "The Sign",
        subtitle: "Path – Le Sanctuaire Highway",
        scripture: "And a highway shall be there, and a way, and it shall be called The way of holiness; the unclean shall not pass over it; but it shall be for those: the wayfaring men, though fools, shall not err therein.",
        scriptureRef: "Isaiah 35:8 (KJV)",
        meditationText: [
            "Our journey begins as one takes the turn off all other roads at the sign that says – Le Sanctuaire. Here an intentional journey begins. A response to a calling to the Sanctuary.",
            "Why Le Sanctuaire? It is French for The Sanctuary. A sanctuary is a safe, sacred, restoring space where heaven and earth meet. In biblical language, a sanctuary is the holy place where God’s presence dwells—first the tabernacle, then the temple. It’s a space made special because God meets people there.",
            "It is a place for restoration; a sanctuary isn’t only about escape; it’s about renewal. It’s where burdens loosen, where the soul breathes again, where clarity comes. And in this valley, centuries ago French Huguenots came seeking a place of refuge and sanctuary from religious persecution in Europe. They have indelibly left their mark on our valley of Franschhoek and we are thankful they found sanctuary here.",
            "It starts with a straight but narrow way that leads up the mountain. As one rises and leaves behind the civilized valley, the anticipation of a true retreat and personal journey begins to build. The road makes its way between verdant vineyards and the natural stream inviting the weary traveler to an adventure that lies beyond."
        ],
        actionPrompt: "Enter ye in at the strait gate: for wide is the gate, and broad is the way, that leadeth to destruction, and many there be which go in thereat: Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it. — Matthew 7:13-14 (KJV)"
    },
    {
        id: 2,
        title: "The Succulent Gardens before the Gate",
        subtitle: "Path – Le Sanctuaire Highway",
        meditationText: [
            "On both sides of the gate is the succulent garden – it is the wilderness – it is dry, and arid but life is born out of its apparent barrenness. The wilderness drives us to the gate – to pass over in search of the potential abundance its mysteries whisper of.",
            "Out of the barren, life is born, out of the dry, water flows. Even as Israel passed over from the wilderness into the Promised Land. As our Lord passed through the waters first into the desert place.",
            "The pilgrim’s journey must begin with a sense of his own vulnerability and weakness. The humility of one crying in the wilderness – prepare ye the way. And so the way begins."
        ],
        actionPrompt: "Pause and acknowledge your own vulnerability and weakness before taking the next step through the gate."
    },
    {
        id: 3,
        title: "The Gate",
        subtitle: "Threshold of the Sanctuary",
        scripture: "How dreadful is this place! this is none other but the house of God, and this is the gate of heaven.",
        scriptureRef: "Genesis 28:17 (KJV)",
        meditationText: [
            "The gate is the symbol of the true beginning. The leaving of outside and the journey towards the Sanctuary truly begins.",
            "It is a strait gate. And there is a definite passing over from outside to inside. Like the gate of the Tabernacle or the great doors of the Temple, it symbolizes passing through into a garden where intimacy and union are the focus and heartbeat of everything beyond the gate.",
            "The gate was specifically designed to reflect the deep symbolism of what lies beyond. The two caps of the pillars together with the central meeting point of the iron gates, bring three mountain peaks together echoing the three great peaks that tower over the farm. These represent the divine we experience through the Father, Son and Holy Spirit.",
            "The pillars were built by stonemasons who sourced stone from the stream only metres away. The triangular caps are each chiseled from a single large stone. The wrought-iron gate, hinged to represent dividing and joining, rises in the centre to form the third mountain peak.",
            "The pilgrim passes through the gate where all attention is now re-oriented—the discovery of true wholeness where two become one."
        ],
        actionPrompt: "This gate of the LORD, into which the righteous shall enter. — Psalm 118:20 (KJV)"
    },
    {
        id: 4,
        title: "The Cypress Gallery – 12 Upright Ones",
        subtitle: "Path – Le Sanctuaire Highway",
        poetry: "The Pilgrim’s Passage\n\nTwelve trees stand tall, reaching skyward—\nsentinels of stillness, rooted in the earth,\nyet drawn to heaven’s light.\nSix to the left, six to the right—\na sacred symmetry,\nechoing the tribes, the apostles,\nthe full company of seekers.\n\nYou who enter here, walk this way—\nnot merely to arrive,\nbut to ascend.\nLet your soul rise with the trees,\nyour steps align with their reach,\nand your heart open to the call:\nto join heaven to earth.",
        meditationText: [
            "As you pass through the gates, your attention is drawn to the 12 Cypress trees lining the driveway – 6 on each side. These thin tall trees echo the theme of the mountain, reaching with roots into the earth up to the heavens above.",
            "They grow upright towards the true light – the sun. The pilgrimage, the journey is for such men and women. Those who have chosen to orientate themselves upwards to the light. Who are firmly grounded in the earth but seek union with heaven above.",
            "And there are 12 speaking of the diversity of those who seek union with the one: The 12 Tribes of Israel (covenant community), The 12 Apostles (discipleship), The 12 Foundation Stones of the New Jerusalem, The 12 Loaves of Showbread, and The 12 Stones at Jordan (passage through water into life)."
        ]
    },
    {
        id: 5,
        title: "The Wild Flowers and the Rose Garden",
        subtitle: "Harmonizing Dualities",
        scripture: "I am the rose of Sharon, The lily of the valleys.",
        scriptureRef: "Song of Songs 2:1 (NASB20)",
        meditationText: [
            "Either side of the Way are two places, distinct, separate and yet the essence of the journey is found in their harmony, their ultimate union.",
            "The desert brings forth life – the wild flowers that are here today and gone tomorrow but express the beauty deep within. The roses – the cultivated garden with deep fragrances – the chaos and order, the wild and cultivated are echoes to the duality of reality that is designed to find harmony.",
            "Walk the little pathway through the Rose Garden. Here over 20 different Rose varietals have been introduced to express a diversity of colour and fragrance. Breathe deeply and if they are in blossom smell intently. Allow the sweet fragrances to usher a feeling of calmness and peace.",
            "Cross over to the wild side – the fynbos, perennials, everlastings and grasses all competing for sun, water and attention. They grow wild and free but express a raw and real beauty. The grass withers, the flowers fade, but the word of our God remains forever."
        ]
    },
    {
        id: 6,
        title: "Path – Oak Tree Meander & Le Chêne",
        subtitle: "The Oak – A Place of Encounter and Covenant",
        poetry: "Le Chêne — The Great Oak\nA poem for the pilgrimage\n\nBeneath this ancient crown of green,\nWhere light and leaf and silence lean,\nThe earth remembers whispered things\nHeaven once spoke beneath such wings.\n\nHere Abram paused beneath an oak,\nA thin place where the Eternal spoke;\nHere too we rest, in shade made wide,\nLet burden fall, let breath abide.\n\nRoots run deep where waters flow,\nHidden streams the righteous know;\nPlanted lives become the sign—\nHeaven’s life in earthly spine.\n\nSo pause, pilgrim—listen, stay;\nLet stillness guide the inward way.\nFor under this great oak you’ll find\nWhere earth is held, and heaven kind.",
        scripture: "Abram traveled through the land as far as the site of the great tree of Moreh at Shechem... Then the Lord appeared to Abram. Abram pitched his tent and built an altar to the Lord.",
        scriptureRef: "Genesis 12:6-7",
        meditationText: [
            "The stairs lead you up to the other side of the perennial stream that runs through Le Sanctuaire. Once you reach the top take a right and start walking back down the stream on the Oak Tree Meanders.",
            "Here you will enjoy over 8 oak trees planted over 100 years ago by intrepid French pilgrims who walked the very path you now take. The little path will take you to The Oak – a place to sit in silence under the shade of the great Oak Tree.",
            "The oak becomes a thin place, where heaven speaks on earth. A place where the pilgrim pauses, listens, and receives new direction.",
            "As Abram rested among the oaks, heaven bent low. May this oak be a place of hearing again."
        ]
    },
    {
        id: 7,
        title: "The Olive Grove – A Place of Pressing and Peace",
        subtitle: "Path – Oak Tree Meander",
        poetry: "✧ The Way of the Press ✧\n\nIn heat and drought the olive grows,\nIts fruit borne slow where silence flows.\nBut only crushed the oil is freed—\nA gift from pain, a sacred seed.\nHere in the grove, be still, be blessed—\nThis is the path, the place of press.\n\nAs He was pressed in Gethsemane,\nSo we are shaped for unity.",
        meditationText: [
            "Nestled beside the river, a quiet grove of twelve or more olive trees forms a sacred space. The path meanders gently through the gnarled trunks and silvery leaves, inviting pilgrims to slow their steps. A bench, thoughtfully placed, offers a resting point—a space for silence, prayer, and deep reflection.",
            "This grove speaks of contemplation and the cost of reconciliation.",
            "Like the ancient trees that thrive in heat and hardship, the olive bears fruit only through resilience. And it is in the pressing of the olive, in the crushing weight of the oil press, that the purest oil flows. So too, it was in the Garden of Gethsemane—literally, 'the oil press'—that Jesus entered His final anguish, choosing obedience through suffering for the sake of the world.",
            "Here, among these trees, we remember: Reconciliation is not ease; it is costly. Transformation does not come without pressing. And peace—true peace—comes through the oil of surrender."
        ]
    },
    {
        id: 8,
        title: "Simonsberg Vista & The Bridge",
        subtitle: "Path – River Walk",
        meditationText: [
            "At the end of the grove you will notice the Bridge – Simonsberg Vista. The Bridge invites us to cross over for another detour.",
            "The detour up the outer bank of the river to see the 'other side'. Take the short, steep path up the embankment to the top of the ridge on the other side.",
            "As you come out from the forested area you will be greeted with a sweeping view of the famous Simonsberg mountain. Simonsberg standing at over 1300m is one of only two dozen mountains with a prominence of over 1000m in South Africa. You are facing west.",
            "There are many beautiful things on the other side – and that does not make them all bad, but they can become such if they distract us from our intended purpose. Here we take time to appreciate that even though we have a defined purpose – a destination, beauty is all around – it is 360 degrees and we must always take time to stop and appreciate it.",
            "Return the way you came back across the wooden bridge."
        ]
    },
    {
        id: 9,
        title: "The Orchard and Old Waboom",
        subtitle: "Fruitfulness & Indigenous Resilience",
        meditationText: [
            "Continue up the path and you slowly enter our new fruit orchard area. This area is very productive for growing citrus, mediterranean and stone fruits.",
            "In between we have left some of the old trees of this area and none more noteworthy than the grand old waboom where our station marker is placed next to a bench.",
            "The orchard represents fruitfulness – both in abundance and diversity. We are made to be fruitful. Our design is to be abundant both providing for ourselves and others. We think of the fruit of the spirit – how is love, joy, peace flourishing in us?",
            "And what of the old waboom? A waboom, or wagon tree (Protea nitida), is one of the few proteas to grow into a large tree. Its name comes from its strong wood used historically for wagon wheels. This one is very old and has survived fire in the area.",
            "We learn from the story of the waboom and the orchard that living to our design requires intention, commitment to abundance, and resilience."
        ]
    },
    {
        id: 10,
        title: "Get Your Feet Wet Rock",
        subtitle: "Path – Waterfall Walk",
        poetry: "Getting My Feet Wet\n\nIn this secluded space,\nbubbling water flows—\ncoolness between my toes.\n\nHow many rocks,\nlonely, beautiful places,\nawaken the deep voice—\neach calls to connect.\n\nThis path of pilgrimage,\nechoes of heaven\nfrom each surprising turn:\nstop. look. listen.\n\nHere, the heavenly balm.\nHere, the soul’s repose.",
        meditationText: [
            "You are now in the river bed of the Varkblaardrif (Pig Leaf Drift). The Pig leaf is a local reference to the beautiful Arum Lily found on the river banks.",
            "Look out for the station: Get Your Feet Wet Rock. A simple rock with a small bubbling pool beneath in which you will spot tadpoles and Cape toads. It’s the perfect place to stop and put your feet in the coolness of the water.",
            "The sensation of touch is so important to being present in the moment. The cool velvety water running between your toes will heighten your senses. What do you hear? What do you see? What do you smell? Be mindful and present.",
            "Water plays such an important part in the journey to heaven. As Pilgrims on an often dry and dusty path, our Master has the grace to provide us with cleansing water."
        ]
    },
    {
        id: 11,
        title: "The Waterfall Pool",
        subtitle: "Secluded Refreshment & Plunge",
        meditationText: [
            "A special private place in this secluded valley. A stairway of waterfalls cascade down into the little pool before you. In the wet winter months, the waterfalls and pool run strong and deep, but in summer there is just enough water to enjoy a refreshing dip.",
            "In the spirit of activation, you are encouraged to go beyond your feet this time. There is nothing more exhilarating than a refreshing dip in a mountain pool. Don’t hold back – take the plunge.",
            "Make your way to where the water falls in and go under completely – it's only when the water washes over all your body and head that you feel its true exhilaration and sensation.",
            "Look around you – you are surrounded by ancient cliffs and trees. This is the place to absorb full refreshment to renew energy and prepare for the final ascent that lies ahead."
        ]
    },
    {
        id: 12,
        title: "Fynbos Rock",
        subtitle: "Transition to Pure Fynbos Land",
        meditationText: [
            "Make your way out of the Waterfall area and follow the signs to Fynbos Trails. Welcome to pure Fynbos land.",
            "Sitting and walking amongst the abundant diversity and pure beauty of the Fynbos floral kingdom is the perfect transition towards the gateway to heaven. This is truly God’s garden, where left to its own this garden produces unique blossoms, smells and textures always changing with the seasons.",
            "A place of incredible diversity and endless surprise. The Fynbos botanical kingdom is the most diverse of all botanical kingdoms. Just on our farm there are estimated to be over 400 indigenous plant species.",
            "Sitting on the rock, enjoy the beauty of the plants that surround you. Try to breathe in their wildness, study their movement. Notice the crawling insects, the sunbirds and sugarbirds sipping protea nectar, and the blue-headed lizard soaking the sun's rays."
        ]
    },
    {
        id: 13,
        title: "Lookout Rock",
        subtitle: "Valley Elevation & Protection",
        scripture: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
        scriptureRef: "Psalm 121:1-2",
        meditationText: [
            "On your way up the trail you will notice a little path to the left where your station sign announces Lookout Rock.",
            "From here you are greeted with sweeping views of the Franschhoek valley. Look back and notice Dutoitskop and Wemmershoek mountains towering above – a valley enclosed by mountains on three sides. Protected, looked over, cared for.",
            "There is only one path to enter in. Mountains speak of spiritual elevation, stability, and divine care."
        ]
    },
    {
        id: 14,
        title: "The Labyrinth & Sunset Deck",
        subtitle: "Seeking Inner Wholeness",
        meditationText: [
            "Welcome to the Deck – one of the most special places to view the beauty and majesty of the Franschhoek Valley. Next we go to the Labyrinth.",
            "Our labyrinth is a simple meditational aid to help us experience and focus on our search for inner wholeness. The centre of gravity that can hold all things together.",
            "So what has the pilgrimage been all about? From a macro perspective it is all about joining. The great purpose – that heaven and earth may be united. Le Sanctuaire – where heaven meets earth. That the divided may become one. The order and chaos. The water and land. The light and dark. A search for wholeness.",
            "Walk slowly on the path – the ancient design of this labyrinth is in fact one of the earliest found in many ancient churches based on the base symbol of a cross extended into a maze pattern. Enter the maze and slowly walk its path. Close your eyes and feel each step. Open them just enough to see the next turn. Know that the journey is to center, to the place of oneness."
        ]
    },
    {
        id: 15,
        title: "The Ridge & Pinnacle Cross",
        subtitle: "The Summit — Where Heaven Meets Earth",
        meditationText: [
            "You have arrived at a rocky outcrop on the mountain slope of Le Sanctuaire. Beyond the mountains behind Le Sanctuaire lies the hidden Wemmershoek Valley and dam, tucked into the Boland mountains—an important stronghold for the Cape leopard.",
            "You have truly arrived at a wild place. Before you on this wild rocky ridge is a simple cross made from fallen trees and gnarled wooden trunks that once stood tall. We have long been inspired by the Franschhoek cross perched high on the valley slopes directly opposite where you are now. A sense of symmetry—a joining that creates a cross line across the valley.",
            "We intended to bring our cross – but God provided one. Simple wooden gnarled poles representing His Son—the suffering, humble Saviour of the world. Here is the one who draws all things into one. Here is the one to whom all pilgrimages should be directed.",
            "Here in the cross – the symbol of His sacrifice – the new creation breaks forth. Here is the centre of the sanctuary – the holy of holies, the true place where heaven and earth meet. The horizontal bar represents all people united, and the vertical represents earth united with heaven.",
            "This is why you have walked. This is why you have come. This is the beginning, the end, and the very centre.",
            "Sit here. Say a prayer. Take it all in. And be thankful – praise and worship."
        ],
        actionPrompt: "Return via Ascent Path, turn left at Labyrinth, and take Buchu Bend back to the Vineyard Deck. Pull off some Buchu leaves to smell their deep healing fragrance!"
    }
];

const Pilgrimage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current space ID from query param (e.g. ?space=1 or ?station=1)
    const initialParam = searchParams.get('space') || searchParams.get('station') || '1';
    const initialSpaceId = parseInt(initialParam, 10);
    const [activeSpaceId, setActiveSpaceId] = useState<number>(
        initialSpaceId >= 1 && initialSpaceId <= 15 ? initialSpaceId : 1
    );

    // Timer State
    const [meditationTimer, setMeditationTimer] = useState<number | null>(null);

    // Modal States
    const [showSingleQRModal, setShowSingleQRModal] = useState(false);
    const [showAllQRSheetModal, setShowAllQRSheetModal] = useState(false);

    useEffect(() => {
        const paramStr = searchParams.get('space') || searchParams.get('station') || '1';
        const paramId = parseInt(paramStr, 10);
        if (paramId >= 1 && paramId <= 15 && paramId !== activeSpaceId) {
            setActiveSpaceId(paramId);
        }
    }, [searchParams]);

    const selectSpace = (id: number) => {
        setActiveSpaceId(id);
        setSearchParams({ space: id.toString() });
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const activeSpace = SPACES.find(s => s.id === activeSpaceId) || SPACES[0];
    const prevSpace = SPACES.find(s => s.id === activeSpaceId - 1);
    const nextSpace = SPACES.find(s => s.id === activeSpaceId + 1);

    // Timer countdown helper
    useEffect(() => {
        if (meditationTimer === null || meditationTimer <= 0) return;
        const interval = setInterval(() => {
            setMeditationTimer(prev => (prev && prev > 1 ? prev - 1 : null));
        }, 1000);
        return () => clearInterval(interval);
    }, [meditationTimer]);

    const getSpaceUrl = (id: number) => {
        return `https://www.montbleu.co.za/pilgrimage?space=${id}`;
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-sanctuary-sand">
            <Helmet>
                <title>Le Sanctuaire Way | A Pilgrim’s Journey – 15 Steps of Ascent</title>
                <meta name="description" content="Le Sanctuaire Way — A 15-step spiritual walking pilgrimage across Mont Bleu estate in Franschhoek." />
            </Helmet>

            <div className="container mx-auto px-4 max-w-5xl">
                {/* Hero Header */}
                <SectionObserver className="text-center mb-10">
                    <span className="text-sm md:text-base font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-3 block font-semibold">
                        Mont Bleu • Le Sanctuaire Farm
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-sanctuary-blue mb-4">
                        Le Sanctuaire Way
                    </h1>
                    <h2 className="text-xl md:text-3xl font-serif text-sanctuary-gold mb-6 font-medium">
                        A Pilgrim’s Journey – 15 Steps of Ascent
                    </h2>

                    {/* Introduction Block */}
                    <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-sanctuary-stone/50 shadow-xl text-left space-y-4 text-base md:text-xl text-sanctuary-blue/90 font-light leading-relaxed mb-8">
                        <h3 className="text-xs uppercase tracking-widest text-sanctuary-gold font-serif font-bold">Introduction</h3>
                        {INTRODUCTION_TEXT.map((para, idx) => (
                            <p key={idx} className="text-base md:text-xl text-sanctuary-blue leading-relaxed font-light">
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Print & QR Action Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => setShowSingleQRModal(true)}
                            className="inline-flex items-center space-x-2 text-xs md:text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-full border border-sanctuary-blue/30 bg-white/80 text-sanctuary-blue hover:bg-white transition-all shadow-sm"
                        >
                            <Smartphone className="w-4 h-4 text-sanctuary-gold" />
                            <span>Space {activeSpace.id} QR Sign</span>
                        </button>

                        <button
                            onClick={() => setShowAllQRSheetModal(true)}
                            className="inline-flex items-center space-x-2 text-xs md:text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-full bg-sanctuary-blue text-white hover:bg-sanctuary-blue/90 transition-all shadow-md"
                        >
                            <Printer className="w-4 h-4 text-sanctuary-gold" />
                            <span>Print All 15 Space QR Signs</span>
                        </button>
                    </div>
                </SectionObserver>

                {/* 15 Steps Horizontal Navigation Selector */}
                <div className="mb-10 bg-white p-4 md:p-6 rounded-3xl border border-sanctuary-stone/50 shadow-md">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-xs md:text-sm uppercase tracking-widest text-sanctuary-gold font-serif flex items-center space-x-2 font-bold">
                            <Compass className="w-4 h-4" />
                            <span>The 15 Steps of Ascent</span>
                        </span>
                        <span className="text-xs md:text-sm text-sanctuary-blue/70 font-semibold">Space {activeSpace.id} of 15</span>
                    </div>

                    <div className="flex space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
                        {SPACES.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => selectSpace(s.id)}
                                className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                                    activeSpaceId === s.id
                                        ? 'bg-sanctuary-blue border-sanctuary-blue text-white shadow-xl scale-105'
                                        : 'bg-sanctuary-sand/40 border-sanctuary-blue/10 text-sanctuary-blue/70 hover:bg-sanctuary-sand'
                                }`}
                            >
                                <span className="text-sm md:text-lg font-serif font-bold">{s.id}</span>
                                <span className="text-[9px] uppercase tracking-tighter opacity-70">Step</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Active Space Card */}
                <div className="bg-white rounded-3xl border border-sanctuary-stone/40 shadow-2xl overflow-hidden mb-12">
                    {/* Header Banner */}
                    <div className="bg-sanctuary-blue p-8 md:p-12 text-white relative">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs md:text-sm font-serif uppercase tracking-[0.25em] text-sanctuary-gold bg-white/10 px-4 py-1.5 rounded-full border border-white/10 font-semibold">
                                Step {activeSpace.id} of 15
                            </span>
                            <span className="text-xs md:text-sm font-serif text-white/70">
                                Le Sanctuaire Way
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-3 leading-tight">
                            {activeSpace.id}. {activeSpace.title}
                        </h2>
                        <p className="text-base md:text-xl text-white/80 font-light italic">
                            {activeSpace.subtitle}
                        </p>
                    </div>

                    {/* Main Text Content */}
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Scripture Callout (if present) */}
                        {activeSpace.scripture && (
                            <div className="p-6 md:p-8 rounded-2xl bg-sanctuary-sand/50 border border-sanctuary-blue/10 relative">
                                <BookOpen className="w-6 h-6 text-sanctuary-gold absolute top-6 left-6" />
                                <div className="pl-8">
                                    <p className="text-base md:text-2xl text-sanctuary-blue font-serif italic leading-relaxed mb-3">
                                        "{activeSpace.scripture}"
                                    </p>
                                    {activeSpace.scriptureRef && (
                                        <span className="text-xs md:text-sm font-bold text-sanctuary-gold uppercase tracking-wider block">
                                            — {activeSpace.scriptureRef}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Poetry Callout (if present) */}
                        {activeSpace.poetry && (
                            <div className="p-6 md:p-8 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
                                <Sparkles className="w-6 h-6 text-amber-600 mx-auto mb-4" />
                                <div className="text-base md:text-xl text-sanctuary-blue font-serif italic whitespace-pre-line leading-relaxed">
                                    {activeSpace.poetry}
                                </div>
                            </div>
                        )}

                        {/* Paragraphs of Exact Text (LARGER FONT SIZE) */}
                        <div className="space-y-6">
                            {activeSpace.meditationText.map((paragraph, pIdx) => (
                                <p key={pIdx} className="text-lg md:text-2xl text-sanctuary-blue/90 leading-relaxed font-light">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Practical Action / Concluding Note */}
                        {activeSpace.actionPrompt && (
                            <div className="p-6 rounded-2xl bg-sanctuary-blue/5 border border-sanctuary-blue/10">
                                <h3 className="text-xs md:text-sm uppercase tracking-widest text-sanctuary-blue font-serif font-bold mb-2 flex items-center space-x-2">
                                    <Heart className="w-5 h-5 text-sanctuary-gold" />
                                    <span>Reflection & Action</span>
                                </h3>
                                <p className="text-base md:text-xl text-sanctuary-blue font-serif italic leading-relaxed">
                                    {activeSpace.actionPrompt}
                                </p>
                            </div>
                        )}

                        {/* Meditation Timer Button */}
                        <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <Sun className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <span className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-emerald-900">Pause & Reflect</span>
                                    <p className="text-xs md:text-sm text-emerald-800">Take a moment of quiet stillness at this space.</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setMeditationTimer(meditationTimer ? null : 60)}
                                className="px-5 py-3 bg-emerald-700 text-white rounded-xl text-xs md:text-sm uppercase tracking-wider font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center space-x-2 flex-shrink-0 shadow-sm"
                            >
                                <Clock className="w-4 h-4" />
                                <span>{meditationTimer ? `Pause Timer (${meditationTimer}s)` : '1-Min Pause Timer'}</span>
                            </button>
                        </div>

                        {/* Space Navigation Footer */}
                        <div className="pt-8 border-t border-sanctuary-blue/10 flex items-center justify-between">
                            {prevSpace ? (
                                <button
                                    onClick={() => selectSpace(prevSpace.id)}
                                    className="inline-flex items-center space-x-2 text-sm md:text-lg font-serif text-sanctuary-blue hover:text-sanctuary-gold transition-colors font-medium"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    <span>Step {prevSpace.id}: {prevSpace.title}</span>
                                </button>
                            ) : <div />}

                            {nextSpace ? (
                                <button
                                    onClick={() => selectSpace(nextSpace.id)}
                                    className="inline-flex items-center space-x-2 text-sm md:text-lg font-serif text-sanctuary-blue hover:text-sanctuary-gold transition-colors font-medium"
                                >
                                    <span>Step {nextSpace.id}: {nextSpace.title}</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            ) : <div />}
                        </div>
                    </div>
                </div>

                {/* Trail Guidance Map */}
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-sanctuary-stone/40 shadow-xl text-center">
                    <MapPin className="w-8 h-8 text-sanctuary-gold mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-serif text-sanctuary-blue mb-3">Trail Guidance & Map</h3>
                    <p className="text-sm md:text-base text-sanctuary-blue/70 max-w-2xl mx-auto leading-relaxed font-light mb-6">
                        Le Sanctuaire Way guides you through 15 Steps of Ascent across Mont Bleu estate—from the Highway entrance up to Pinnacle Cross.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {SPACES.map(sp => (
                            <div
                                key={sp.id}
                                onClick={() => selectSpace(sp.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${activeSpaceId === sp.id ? 'bg-sanctuary-blue text-white border-sanctuary-blue' : 'bg-sanctuary-sand/40 border-sanctuary-blue/10 text-sanctuary-blue hover:bg-sanctuary-sand'}`}
                            >
                                <span className={`text-[10px] uppercase tracking-wider font-bold block mb-1 ${activeSpaceId === sp.id ? 'text-sanctuary-gold' : 'text-sanctuary-gold'}`}>
                                    Step {sp.id} of 15
                                </span>
                                <span className="text-xs md:text-sm font-serif font-semibold block truncate">
                                    {sp.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Single Space QR Modal */}
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
                            className="bg-sanctuary-sand rounded-3xl max-w-md w-full p-8 shadow-2xl border border-sanctuary-blue/20 text-center relative"
                        >
                            <button
                                onClick={() => setShowSingleQRModal(false)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 border-2 border-sanctuary-blue/30 rounded-2xl bg-white shadow-lg text-center">
                                <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-sanctuary-gold block mb-1 font-bold">
                                    LE SANCTUAIRE WAY
                                </span>
                                <h3 className="text-2xl font-serif text-sanctuary-blue mb-1">
                                    Step {activeSpace.id} of 15
                                </h3>
                                <p className="text-base font-serif text-sanctuary-blue/80 mb-4">
                                    {activeSpace.title}
                                </p>

                                <div className="my-6 p-4 bg-sanctuary-sand/40 rounded-xl border border-sanctuary-blue/10 flex justify-center">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getSpaceUrl(activeSpace.id))}`}
                                        alt={`Scan for Step ${activeSpace.id}`}
                                        className="w-48 h-48 rounded-lg shadow-sm border border-sanctuary-blue/10"
                                    />
                                </div>

                                <p className="text-xs text-sanctuary-blue/80 font-light leading-relaxed mb-3">
                                    Scan to open exact text & guided reflection for Step {activeSpace.id}.
                                </p>
                            </div>

                            <button
                                onClick={() => window.print()}
                                className="mt-6 px-6 py-3 rounded-full bg-sanctuary-blue text-white text-xs uppercase tracking-wider font-semibold hover:bg-sanctuary-blue/90 transition-colors inline-flex items-center space-x-2"
                            >
                                <Printer className="w-4 h-4 text-sanctuary-gold" />
                                <span>Print Step {activeSpace.id} Sign</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Batch Printable Sheet of All 15 Space QR Signs */}
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
                            className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-10 shadow-2xl border border-sanctuary-blue/20 relative my-8 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowAllQRSheetModal(false)}
                                className="absolute top-4 right-4 text-sanctuary-blue/40 hover:text-sanctuary-blue p-2"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center mb-8">
                                <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold block mb-1 font-bold">
                                    Mont Bleu • Le Sanctuaire Farm
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif text-sanctuary-blue">
                                    All 15 Space QR Signs
                                </h2>
                                <p className="text-xs md:text-sm text-sanctuary-blue/60 mt-1">
                                    Printable signs for physical posts along Le Sanctuaire Way.
                                </p>
                                <button
                                    onClick={() => window.print()}
                                    className="mt-4 px-6 py-3 bg-sanctuary-blue text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-sanctuary-blue/90 transition-colors inline-flex items-center space-x-2 shadow-md"
                                >
                                    <Printer className="w-4 h-4 text-sanctuary-gold" />
                                    <span>Print Complete 15-Sign Pack</span>
                                </button>
                            </div>

                            {/* 15 Space Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {SPACES.map((sp) => (
                                    <div key={sp.id} className="p-6 border-2 border-sanctuary-blue/20 rounded-2xl bg-sanctuary-sand/30 text-center flex flex-col items-center justify-between">
                                        <div>
                                            <span className="text-[9px] font-serif uppercase tracking-widest text-sanctuary-gold block mb-1 font-bold">
                                                LE SANCTUAIRE WAY
                                            </span>
                                            <h4 className="text-xl font-serif text-sanctuary-blue font-bold">
                                                Step {sp.id} of 15
                                            </h4>
                                            <p className="text-xs font-serif text-sanctuary-blue/80 mb-3 truncate max-w-[200px] mx-auto font-medium">
                                                {sp.title}
                                            </p>
                                        </div>

                                        <div className="p-3 bg-white rounded-xl border border-sanctuary-blue/10 my-2">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(getSpaceUrl(sp.id))}`}
                                                alt={`Step ${sp.id} QR Code`}
                                                className="w-32 h-32 rounded-lg"
                                            />
                                        </div>

                                        <p className="text-[10px] text-sanctuary-blue/70 italic mt-2">
                                            Scan for guided reflection
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
