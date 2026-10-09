import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Compass, ChevronRight, ChevronLeft, Printer, BookOpen, Smartphone, X, Sun, Clock, Footprints, AlertTriangle, Map, Play, Home, ArrowRight, Download } from 'lucide-react';
import SectionObserver from '../components/ui/SectionObserver';

interface Section {
    heading?: string;
    text: string;
    isScripture?: boolean;
}

interface FormattedSpace {
    id: number;
    title: string;
    subtitle: string;
    sections: Section[];
}

const SPACES: FormattedSpace[] = [
    {
        id: 1,
        title: "The Sign",
        subtitle: "Le Sanctuaire: The Beginning of the Way",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Le Sanctuaire: The Beginning of the Way Stand or sit on the stone bridge, facing the sign and the long ascending road ahead."
            },
            {
                        "heading": "Introduction",
                        "text": "This is where your pilgrimage begins."
            },
            {
                        "heading": "Introduction",
                        "text": "Look up at the sign marked \u201cLe Sanctuaire.\u201d"
            },
            {
                        "heading": "Introduction",
                        "text": "More than a marker, it signals a choice \u2014 a turning away from other roads and a decision to take this one. In life, the paths we choose at key moments shape the journey that follows. Today, you have chosen this path."
            },
            {
                        "heading": "Introduction",
                        "text": "Le Sanctuaire translates from French as \u201cThe Sanctuary\u201d \u2014 a place set apart for rest, safety, and renewal; a meeting place of stillness and attention."
            },
            {
                        "heading": "Introduction",
                        "text": "This valley has long been a place of refuge. Centuries ago, French Huguenots fled persecution and found shelter here, shaping Franschhoek through their courage, resilience, and longing for sanctuary."
            },
            {
                        "heading": "Introduction",
                        "text": "Ahead of you, the road rises gently toward the mountain."
            },
            {
                        "heading": "Introduction",
                        "text": "From the first step, the land invites both ascent and reflection: the vineyards, the stream, the quiet line of the road \u2014 all suggesting that a deeper journey has begun."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Every pilgrimage begins with a response \u2014 This sign marks a threshold: between the familiar and the sacred, between ordinary movement and a journey that reshapes the heart."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "A sanctuary is not an escape from life."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It is a place of encounter \u2014 where burdens loosen, where the soul finds space to breathe, and where God meets us with renewal and clarity."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Today, this sign stands as an invitation: to step onto a path that leads inward,"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cA highway shall be there\u2026 the Way of Holiness.\u201d \u2014 Isaiah 35:8",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cStrait is the gate and narrow the way that leads to life.\u201d \u2014 Matthew 7:13\u201314",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pilgrimage Activity Find a quiet place near the sign."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Face the road that rises toward the mountain."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pause for a moment and ask yourself: What am I turning toward as I begin this walk?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "If you wish, offer a simple prayer: \u201cHere am I, Lord. I am coming.\u201d"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "When you are ready, begin your pilgrimage."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Take a slow peaceful stroll up the paved driveway. Enjoy the shade as you walk between the stream on your right and the rolling vineyards on your right. It is about a 700m walk to the next station - The Gate. Scan the QR Code at the Pilgrimage Sign or click Next Station above."
            }
]
    },
    {
        id: 2,
        title: "The Gate",
        subtitle: "Crossing Into the Sanctuary",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Crossing Into the Sanctuary Take a seat beneath the young oaks and face the entrance."
            },
            {
                        "heading": "Introduction",
                        "text": "This is the moment you pass from the familiar world into the Sanctuary."
            },
            {
                        "heading": "Introduction",
                        "text": "This gate marks the true beginning of the pilgrimage."
            },
            {
                        "heading": "Introduction",
                        "text": "It is a threshold \u2014 a place of crossing \u2014 where direction, attention, and pace begin to change. What lies behind you matters less than what you are stepping toward."
            },
            {
                        "heading": "Introduction",
                        "text": "Here, movement becomes intentional."
            },
            {
                        "heading": "Introduction",
                        "text": "Distraction gives way to presence."
            },
            {
                        "heading": "Introduction",
                        "text": "The journey is no longer theoretical \u2014 it is entered."
            },
            {
                        "heading": "Introduction",
                        "text": "The gate is shaped to speak quietly to the one who pauses."
            },
            {
                        "heading": "Introduction",
                        "text": "The two gate leaves rise to form a third peak between the stone pillars, echoing the three mountain peaks above the farm. Together they suggest unity, balance, and a harmony that draws the eye upward."
            },
            {
                        "heading": "Introduction",
                        "text": "Built from stones gathered from the stream, each pillar carries fragments of the land\u2019s long memory. Their triangular caps rest with quiet confidence, expressing strength, stability, and endurance."
            },
            {
                        "heading": "Introduction",
                        "text": "Wrought-Iron Movement The deep blue ironwork, shaped like the protea, reflects the abundance of the surrounding fynbos. Its upward movement invites the gaze \u2014 and the heart \u2014 toward ascent."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "To walk through a gate is to choose \u2014 union over separation, presence over distraction, life over noise."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "This gate marks more than entry."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It is a commitment to step toward communion rather than distance, toward attentiveness rather than haste."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "In Scripture, gates are places of encounter."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "They mark moments when God meets the pilgrim at the threshold \u2014 not after the journey, but at its beginning."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "To pass through this gate is to say, quietly and willingly: I am entering the place where heaven and earth meet."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThis is\u2026 the gate of heaven.\u201d \u2014 Genesis 28:17",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThis is the gate of the LORD, into which the righteous shall enter.\u201d \u2014 Psalm 118:20",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pilgrimage Activity Stand before the gate."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Wait in silence as the gate opens \u2014 let the moment speak."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Then step forward and say aloud: \u201cI set my face toward the mountain of the Lord.\u201d"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Cross the threshold into the Sanctuary."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Walk a little further up the driveway past the succulents and just before you encounter the cypress trees on each side of the driveway you will see the next Station sign."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Start Pilgrimage"
            }
]
    },
    {
        id: 3,
        title: "The Twelve",
        subtitle: "Pilgrimage in Community \u2014 The Twelve Cypress Trees",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Pilgrimage in Community Stand somewhere along the avenue of cypress trees."
            },
            {
                        "heading": "Introduction",
                        "text": "Let their trunks form a quiet corridor around you."
            },
            {
                        "heading": "Introduction",
                        "text": "This is the place where the pilgrim remembers: we do not walk alone."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This avenue of twelve cypress trees has been intentionally planted as a living sign of community. Their straight alignment marks an entrance \u2014 not only to the land, but into a shared journey."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The number twelve has long carried the meaning of belonging and gathered life. Across generations and traditions, it has symbolised people drawn together \u2014 distinct, yet united."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Each cypress rises tall and slender, lifting the eye upward."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Evergreen and enduring, they speak of perseverance over time."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "No two are the same, yet they grow in harmony, rooted side by side, shaped by the same wind and weather."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This is a processional way."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "A reminder that meaningful journeys are rarely solitary \u2014 and that transformation often unfolds among others, not apart from them."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Faith is never lived alone."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Each pilgrim brings a different story, temperament, and strength \u2014 and each becomes part of something larger."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Some companions inspire us."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Some stretch us."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Some walk ahead, some beside, some behind."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "At times we carry another; at times we discover we are being quietly carried."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here, among these twelve silent guardians, we glimpse the mystery of the Church: many members, one body; many journeys, one Way; many branches, one living Tree."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "You belong to a story far greater than yourself \u2014 a family of pilgrims spanning cultures, centuries, and generations."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThose who are planted in the house of the LORD shall flourish.\u201d \u2014 Psalm 92:13",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cYou are\u2026 members of the household of God, built on the foundation of the apostles.\u201d \u2014 Ephesians 2:19\u201320",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cWe, being many, are one body in Christ.\u201d \u2014 Romans 12:5",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pilgrimage Activity Walk slowly between the cypress trees."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Notice their differences and their alignment."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Choose one tree that draws your attention."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Stand beside it for a moment."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Ask yourself quietly: Who is walking this journey with me \u2014 often unseen, yet sustaining me?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Let the tree remind you that no pilgrimage is walked alone \u2014 that you are held within a wider community, past and present, known and unknown."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "When you are ready, continue your walk."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "(If you are walking with someone, you may choose to offer a quiet word of encouragement.)"
            },
            {
                        "heading": "Where to Next?",
                        "text": "Just past the cypresses you will notice an emerging rose garden - look out for the sign marking your next station."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Start Pilgrimage"
            }
]
    },
    {
        id: 4,
        title: "The Gardens",
        subtitle: "The Cultivated & The Wild",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way The Cultivated & The Wild Find a place to sit \u2014 on the grass or on a bench facing the roses."
            },
            {
                        "heading": "Introduction",
                        "text": "Here you stand between two gardens that speak in different voices, yet tell one shared story."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This part of the pilgrimage opens into two contrasting landscapes."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The Cultivated Garden \u2014 The Roses Carefully arranged beds and gentle paths."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Roses shaped by watering, pruning, and patient attention."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Many varieties, chosen and tended for fragrance and form."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Beauty that emerges through intention and care."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The Wild Garden \u2014 The Fynbos Beyond the roses lies a space returning to wildness \u2014 local fynbos, grasses, and seasonal blooms that appear and vanish in their time."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This is beauty without structure or design, growing freely because it is alive."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Together, these two gardens reveal how beauty takes shape \u2014 sometimes through careful tending, sometimes through untamed growth."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Within every pilgrim live two kinds of beauty."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "the part of life shaped slowly by care, discipline, and faithful attention."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "And there is the honest, vulnerable, and free, rising without control or certainty."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Scripture holds both together."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The rose speaks of love awakened and beauty prepared."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The wildflower reminds us that life is fragile, fleeting, and held by grace."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "These gardens are not in conflict."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "They belong together \u2014 in creation, in the Sanctuary, and in you."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Formation and freedom are companions on the way."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cI am the rose of Sharon\u2026\u201d"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Song of Songs 2:1 \u201cThe desert shall blossom like the rose.\u201d"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThe grass withers, the flower fades\u2026\u201d"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cAs for man\u2026 he flourishes like a flower of the field.\u201d"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pilgrimage Activity Walk slowly between the two gardens."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Then choose one place to pause \u2014 either among the roses or near the wild growth."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Ask yourself quietly: Where in my life is beauty being carefully formed \u2014 and where is beauty asking for freedom?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Sit for a moment in stillness."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Let the gardens teach you harmony \u2014 the meeting of order and openness as you prepare to continue the way."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Continue on the driveway and just over the bridge, you will come to a dividing of the Way. A path heading up to your left, Oak Tree Way and a path to your right, River Walk. Take the path to the left."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Walk up the steps the far side of the perennial stream."
            },
            {
                        "heading": "Where to Next?",
                        "text": "At the top, turn right and follow the Oak Tree a quiet path flanked by more than eight century-old oaks \u2014 planted long ago by the French pilgrims who walked these very slopes. Continue until you come to a clear resting place under an Oak Tree and your next station - Le Chene."
            }
]
    },
    {
        id: 5,
        title: "Le Ch\u00eane",
        subtitle: "The Great Oak of Encounter",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way The Great Oak of Encounter Le Ch\u00eane \u2014 A Place of Shade, Stillness & Speaking Sit beneath the Great Oak."
            },
            {
                        "heading": "Introduction",
                        "text": "Let its wide branches and deep shade slow your breathing."
            },
            {
                        "heading": "Introduction",
                        "text": "This is a place of rest \u2014 where the journey pauses, and stillness becomes the teacher."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This oak has stood through many seasons."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Its strength is not hurried, its growth unseen yet enduring."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Its roots run deep beneath the soil."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Its branches spread wide, offering shelter and shade."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Here, the land itself invites you to stop striving,"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "In Scripture, oaks are places of encounter and covenant."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Under the oak of Moreh, the Lord appeared to Abram."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Among the oaks of Mamre, Abram rested and built an altar."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Oaks became symbols of God\u2019s planting \u2014 strength formed over time, and presence rooted in faithfulness."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The oak is a thin place \u2014 where heaven leans close to earth, and weary pilgrims rediscover identity, calling, and courage."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Its lessons are quiet but profound: Deep roots \u2014 a life grounded beyond appearances Strength \u2014 standing firm when the wind rises Endurance \u2014 faithfulness through seasons and storms Shelter \u2014 becoming a place of rest for others Here, you are invited to stop striving, to let your inner tent rest, and to allow God\u2019s Presence to speak again."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "A line to carry with you: \u201cAs Abram rested among the oaks, heaven bent low.\u201d"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cAbram came to the oak of Moreh\u2026 and the LORD appeared to him.\u201d \u2014 Genesis 12:6\u20137",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThey will be called oaks of righteousness, the planting of the LORD.\u201d \u2014 Isaiah 61:3",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pilgrimage Activity Remain seated beneath the oak."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Be still for three minutes."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Let your breathing slow."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Ask yourself quietly: What do I need to lay down here in order to grow deeper roots?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "When you are ready, continue the journey, carrying with you the quiet strength of this place."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Continue a little way further along the Oak Tree Way down the stream until the path heads back up the Driveway. Here you have a choice, as life so often presents us with. Either you can retrace your steps back along the Oak or walk back along the Driveway back to the Dividing Point."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Returning is part of the rhythm of pilgrimage."
            },
            {
                        "heading": "Where to Next?",
                        "text": "You come back to where you began\u2014 but with clearer eyes and a deeper heart."
            },
            {
                        "heading": "Where to Next?",
                        "text": "From the Dividing Point, begin the new way: follow the River Path to the next station within the Olive Grove."
            }
]
    },
    {
        id: 6,
        title: "The Olives",
        subtitle: "A Place of Pressing & Peace",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Healing, Endurance & New Beginnings Walk slowly between the two rows of olive trees."
            },
            {
                        "heading": "Introduction",
                        "text": "Take a seat on the bench at the end of the path."
            },
            {
                        "heading": "Introduction",
                        "text": "Let the quiet rhythm of the small weir meet the stillness of the grove."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This part of the pilgrimage unfolds along a gentle lane lined with two generations of olive trees."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "One row is mature \u2014 rooted, weathered, shaped by time."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The other is young \u2014 tender, hopeful, still becoming."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Together they form a living picture of in-between time: what has endured standing beside what is only beginning."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Strength beside vulnerability."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Formation beside promise."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "One day this will grow into a full olive grove."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "For now, its beauty lies in its becoming."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "At the end of the path, the bench beneath the olives overlooks the flowing weir \u2014 a place for listening, breathing, and rest."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "In Scripture, the olive carries deep meaning."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Olive oil heals wounds."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It anoints kings."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It fuels light in the sanctuary."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Its branch announces peace after the flood."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "And the tree itself endures for centuries."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The olive teaches that what blesses others is often born through pressure and patience."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The press does not destroy the fruit \u2014 it releases what is within."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here the pilgrim is reminded: Growth unfolds slowly Healing comes in stages Deep roots are formed through waiting New beginnings are fragile yet full of promise The older trees speak of faith that has endured storms."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The younger trees speak of hope just beginning to take root."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Together they tell one story \u2014 a life shaped by God in both what is established and what is still emerging."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cI am like an olive tree flourishing in the house of God.\u201d \u2014 Psalm 52:8",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cYou anoint my head with oil.\u201d \u2014 Psalm 23:5",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThe dove returned\u2026 with a freshly plucked olive leaf.\u201d \u2014 Genesis 8:11",
                        "isScripture": true
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Sit quietly on the bench beneath the olive trees."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Listen to the sound of the water."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Where in my life is God gently turning pressure into healing, endurance, or new beginnings?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Remain still for a few moments."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let this place become a small Gethsemane \u2014 not of striving, but of renewal."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "When you are ready, continue the way."
            },
            {
                        "heading": "Where to Next?",
                        "text": "The bridge invites you across the river for another short detour \u2014 a steep climb up the far bank of the stream, out of the sheltering trees and into open sky toward the next station - Simonsberg Vista. Up"
            }
]
    },
    {
        id: 7,
        title: "Simonsberg Vista",
        subtitle: "The Bridge & Beyond",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Discipline of Direction Stand anywhere along the open ridge and look toward the west."
            },
            {
                        "heading": "Introduction",
                        "text": "Before you rises Simonsberg \u2014 one of the great mountains of the Cape, commanding the valley with rare prominence."
            },
            {
                        "heading": "Introduction",
                        "text": "Let the view take your breath for a moment."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Simonsberg is iconic: steep, sculpted, enduring."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "It has watched over this valley for centuries, a landmark of beauty, strength, and scale."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "From here you see earth rising toward sky \u2014 space opening wide in every direction."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This station is a deliberate pause, a detour from the main path given for vision, perspective, and wonder."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Yet this is not the mountain you are called to climb today."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Throughout Scripture, pilgrims encounter mountains they admire but do not ascend."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Some mountains are noble and beautiful \u2014 yet not appointed."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "This station teaches discernment."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Not everything that inspires you is meant to be pursued."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Not every opportunity is your calling."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Even good things can become distractions when they draw you away from the path given to you."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Simonsberg reminds the pilgrim that: Beauty is abundant Wonder is not the same as purpose Direction requires restraint as well as desire It is right to behold this mountain, to honour its grandeur, and to let gratitude rise \u2014 and then to turn back, steady and clear, to the way set before you."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cLet your eyes look straight ahead; fix your gaze directly before you.\u201d \u2014 Proverbs 4:25",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cSet your minds on things above.\u201d \u2014 Colossians 3:2",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cI press on toward the goal.\u201d \u2014 Philippians 3:14",
                        "isScripture": true
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Face the mountain in silence."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "What am I being invited to admire with gratitude \u2014 but release with trust \u2014 so that I may walk the path given to me?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Take one last long look at Simonsberg."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Then turn and rejoin the pilgrimage way, carrying renewed intention and quiet resolve."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Return down the path the way you came and cross the bridge again."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Continue Left along the path on the other side of the stream along the main pilgrim route as the journey turns once more toward your mountain."
            },
            {
                        "heading": "Where to Next?",
                        "text": "You will pass a hot tub, sauna, and even a sparkling swimming pool - keep walking, don't lose focus, they will be enjoyed at another time! A little further you will enter an area with young fruit trees and next to the shaded ridge an bench next to an old protea tree - here you will find your next station."
            }
]
    },
    {
        id: 8,
        title: "The Orchard and The Old Waboom",
        subtitle: "Fruitfulness & Indigenous Resilience",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Station 8 - The Orchard and the Old Waboom Fruitfulness, Design & Resilient Growth Take a seat on the grass overlooking the stream, or rest on the bench beside the old waboom tree."
            },
            {
                        "heading": "Introduction",
                        "text": "You are standing in the heart of our young orchard: a place still becoming what it is meant to be."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "You are surrounded by trees at every stage of life: Young orchard trees \u2014 oranges, lemons, limes, grapefruits, peaches, pears, plums \u2014 carefully planted, tender, full of promise."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Their fruit is still hidden, waiting for the right season."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Old resident trees, including the striking waboom (Protea nitida), stand among the new growth \u2014 witnesses of storms, summers, and survival."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This mixture of youth and age, newness and endurance, creates a living parable about growth, purpose, and resilience."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Fruitfulness According to Design The orchard reminds us that everything God plants has purpose: Each tree produces its own fruit."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Only diverse expressions of God-given design."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "So it is with us."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The Spirit grows different fruit in each life \u2014 love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control \u2014 and what God is forming in you is not meant to look like anyone else."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cBy their fruit you will know them.\u201d \u2014 Matthew 7:20",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThe fruit of the Spirit is\u2026\u201d \u2014 Galatians 5:22\u201323",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Fruitfulness is slow, often invisible at first \u2014 but always intentional."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The Old Waboom \u2014 A Story of Resilience The waboom, one of the few proteas that becomes a tree, once supplied wood tough enough for wagon wheels."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Look closely and you\u2019ll see scars of old fires \u2014 marks of survival, not defeat."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It teaches the pilgrim: Not all fruit is edible \u2014 some is beauty for others."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Not all growth is seen \u2014 some happens deep within."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Not all gifts look the same \u2014 yet all matter."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Fire does not end calling \u2014 it strengthens roots."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Placed beside the orchard, the waboom becomes a teacher of resilient, time-tested growth."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Fruitfulness & Resilience Together Side by side, these two landscapes speak: The orchard calls you toward intentional fruitfulness."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The waboom calls you toward resilient endurance."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Together they reveal a whole life \u2014 one shaped by both cultivation and perseverance."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pilgrimage Activity Sit quietly on the bench beside the waboom."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Am I more like a young orchard tree growing slowly, or an older tree marked by struggle yet still flourishing?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "What fruit is God growing in me right now \u2014 even if unseen?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Which scars in my life have become part of my strength?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Where is He calling me to cultivate with patience?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Where is He calling me to endure with courage?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Let the orchard and the ancient waboom interpret your journey back to you."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Throughout Scripture, pilgrims encounter mountains they admire but do not ascend."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Some mountains are noble and beautiful \u2014 yet not appointed."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "This station teaches discernment."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Not everything that inspires you is meant to be pursued."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Not every opportunity is your calling."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Even good things can become distractions when they draw you away from the path given to you."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Simonsberg reminds the pilgrim that: Beauty is abundant Wonder is not the same as purpose Direction requires restraint as well as desire It is right to behold this mountain, to honour its grandeur, and to let gratitude rise \u2014 and then to turn back, steady and clear, to the way set before you."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cLet your eyes look straight ahead; fix your gaze directly before you.\u201d \u2014 Proverbs 4:25",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cSet your minds on things above.\u201d \u2014 Colossians 3:2",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cI press on toward the goal.\u201d \u2014 Philippians 3:14",
                        "isScripture": true
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Face the mountain in silence."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "What am I being invited to admire with gratitude \u2014 but release with trust \u2014 so that I may walk the path given to me?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Take one last long look at Simonsberg."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Then turn and rejoin the pilgrimage way, carrying renewed intention and quiet resolve."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Continue up the path beyond the orchard, past the Chicken Coop to the path signposted Lower Waterfall Loop."
            },
            {
                        "heading": "Where to Next?",
                        "text": "This beautiful shade path will take you next to the stream to your next station at a rock overlooking the stream beneath."
            }
]
    },
    {
        id: 9,
        title: "The Gulley",
        subtitle: "Passing Through",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Where Water Finds Its Way Sit on the natural stones and look down into the narrow stone passage where the stream threads its way through the rock."
            },
            {
                        "heading": "Introduction",
                        "text": "Feel the quiet persistence of the water."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This gully is a natural channel carved over centuries."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Here the stream presses through hard rock in small cascades and clear pools."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The rock resists."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The water persists."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Slowly and patiently, the soft shapes the hard \u2014 not by force, but by faithfulness."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Every curve in the stone has been formed by years of movement."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Every cascade is water\u2019s quiet victory over resistance."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This place holds a meeting of two ancient forces: the firmness of rock and the persistence of water."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "God\u2019s work in the human heart is often like this stream."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "His Spirit moves without rushing, finding a way where none seemed possible, shaping what once felt unchangeable."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Scripture speaks of this gentle power \u2014 a grace that does not break through, but flows through, patiently forming new channels of life."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The gully teaches the pilgrim: Hardness is not hopeless Resistance can be softened Transformation comes through grace, not force God rarely overwhelms the heart."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "He waits, moves, and forms \u2014 until life finds a way."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThe water I give will become a spring of life.\u201d \u2014 John 4:14",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cMy word\u2026 will accomplish what I desire.\u201d \u2014 Isaiah 55:10\u201311",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cHe leads me beside still waters; He restores my soul.\u201d \u2014 Psalm 23",
                        "isScripture": true
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Watch the movement of the water."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Ask yourself quietly: Where in my life is gentle, persistent grace carving a new way forward?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Remain still for a moment."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let the sound of the stream remind you: Grace always finds its way."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "When you are ready, continue the journey."
            },
            {
                        "heading": "Where to Next?",
                        "text": "on the River path and then descend into the river bed to your next station. As ou cross over a pebble bridge you will find the next station."
            }
]
    },
    {
        id: 10,
        title: "Get Your Feet Wet",
        subtitle: "Sensory Presence",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Presence, Touch & the Water of Life Take a seat on one of the flat stones surrounding the pool."
            },
            {
                        "heading": "Introduction",
                        "text": "Remove your shoes and gently place your feet in the water."
            },
            {
                        "heading": "Introduction",
                        "text": "You are standing in the bed of the Varkblaardrif \u2014 named for the varkblaar (arum lily) that grows along this perennial stream."
            },
            {
                        "heading": "Introduction",
                        "text": "This water begins high in the Wemmershoek Mountains and brings coolness and life as it moves down the valley."
            },
            {
                        "heading": "Introduction",
                        "text": "At your feet is a small, living pool \u2014 home to tadpoles, toads, and a quiet hidden world."
            },
            {
                        "heading": "Introduction",
                        "text": "This is an invitation to stop, to feel, and to let living water touch body and spirit."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This is one of the simplest stations on the pilgrimage: stone, water, movement."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Here the journey becomes physical again \u2014 temperature, touch, sensation, breath."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The flowing water draws you out of thought and into the present moment."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "It slows you down, grounding you in what is real and given."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "In Scripture, water is never only water."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It cleanses and renews."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It heals and restores."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It signals mercy and new beginnings."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Jesus offers living water to the thirsty."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "He kneels to wash the feet of His disciples."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The river of life flows from God\u2019s presence, bringing healing wherever it goes."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here, this cool stream becomes a quiet sign of grace \u2014 a reminder that God refreshes weary pilgrims not through force, but through gentle, faithful presence."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Let the water become a prayer \u2014 simple, embodied, and honest."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cWhoever drinks the water I give will never thirst.\u201d \u2014 John 4:14",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cHe poured water into a basin and began to wash the disciples\u2019 feet.\u201d \u2014 John 13:5",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThe river of the water of life\u2026 flowing from the throne of God.\u201d \u2014 Revelation 22:1",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pligrimage Action Keep your feet in the water for a moment."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Notice its coolness and movement."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Ask yourself quietly: What do I need to release here so that I may continue the journey refreshed?"
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "When you are ready, dry your feet, put on your shoes, and continue the way \u2014 carrying with you the gift of renewal."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Continue upstream up the steps out of the riverbed and keep left following the signs towards the Waterfall Pool where you will encounter the next station."
            }
]
    },
    {
        id: 11,
        title: "The Waterfall Pool",
        subtitle: "Living Waters & Refreshment",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Immersion, Renewal & the Courage to Plunge Find a safe place to stand or sit beside the pool."
            },
            {
                        "heading": "Introduction",
                        "text": "You are now in one of the most hidden and sacred corners of the valley \u2014 where a stairway of waterfalls descends into a clear mountain pool, held by ancient rock, moss, and quiet trees."
            },
            {
                        "heading": "Introduction",
                        "text": "In winter the water runs deep and strong."
            },
            {
                        "heading": "Introduction",
                        "text": "In summer it softens and settles."
            },
            {
                        "heading": "Introduction",
                        "text": "In every season, this place remains a sanctuary of coolness and invitation."
            },
            {
                        "heading": "Introduction",
                        "text": "Here the pilgrim is invited to move beyond touching the water \u2014 and, if ready, to enter fully."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This is a natural baptismal place: falling water, smooth stone, crisp mountain air."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "A pool just deep enough to stand, breathe, and be immersed."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Here the pilgrimage becomes unmistakably physical."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The body joins the journey."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The water itself becomes teacher and companion."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Scripture is filled with sacred pools."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Waters where the wounded were healed."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pools where sight was restored."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Rivers where callings were sealed and journeys began."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Again and again, water becomes the place where God prepares people for what comes next."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "To enter this pool is an act of trust."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "To stand beneath the falling water is a physical prayer \u2014 a releasing of dust, fear, hesitation, and fatigue."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It is a small dying and a small rising."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here renewal is not imagined \u2014 it is felt."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cRise, take up your mat and walk.\u201d \u2014 John 5:8",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cGo, wash\u2026 and come back seeing.\u201d \u2014 John 9:7",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cJesus was baptised\u2026 and immediately went up from the water.\u201d \u2014 Matthew 3:16",
                        "isScripture": true
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "If it feels safe and right, enter the water."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Move toward the falling stream."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Stand quietly beneath it."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "What am I being invited to release here so that I may rise renewed for the journey ahead?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Remain for a moment."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Then step out slowly, grounded and refreshed, ready to continue the ascent."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Dry off in the sun-warm rocks, then continue back to the junction where a sign points to the Fynbos Trail and Upper Waterfall Loop."
            },
            {
                        "heading": "Where to Next?",
                        "text": "the landscape shifts \u2014 the air is drier, the colours sharper, the scents richer."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Be sure to take the left fork toward Sunset Deck and The Ascent."
            },
            {
                        "heading": "Where to Next?",
                        "text": "A little further up, a small path to the left reveals the next station: Fynbos Rock."
            },
            {
                        "heading": "Where to Next?",
                        "text": "as the final ascent begins."
            }
]
    },
    {
        id: 12,
        title: "Fynbos Rock",
        subtitle: "God's Garden",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way Seeing With the Eternal Eye Take a seat on the rock."
            },
            {
                        "heading": "Introduction",
                        "text": "You are surrounded by one of the most remarkable floral regions on earth \u2014 a landscape where beauty often hides in plain sight, waiting for those who slow down enough to see."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This is true fynbos country \u2014 a living tapestry of intricate diversity."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "At first glance the shrubs can seem dry or similar, but look closer and you begin to notice: proteas with hidden nectar tiny ericas the size of pinheads restios moving like fine threads in the wind buchu releasing citrus and spice daisies, bulbs, grasses, succulents insects, sunbirds, lizards \u2014 each playing a part Fynbos is famously species-rich. In a surprisingly small patch of ground, dozens of different plants may be growing side by side."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This landscape is wild, yet ordered; small, yet overflowing \u2014 a world of detail that rewards attention."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Fynbos trains the pilgrim to see differently."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here, spirituality becomes attention."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Holiness becomes awareness."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Revelation begins in the small."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Shift your gaze from the wide valley to the world at your feet."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Notice a single detail: a flower\u2019s shape, the movement of an insect, a bird searching for nectar, wind passing through restios, a lizard warming itself on stone."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "What seems ordinary becomes intricate."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "What seems dry becomes alive."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "What seems small becomes an opening into wonder."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "This is one of the Spirit\u2019s quiet disciplines: teaching us to notice what we usually miss, and to see with a deeper, eternal eye."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Stay seated and choose one small detail to observe closely."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "What is God inviting me to notice today that I have been overlooking?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Remain for a moment longer than feels necessary."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let attention deepen into gratitude \u2014 and let gratitude become sight."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Continue up the path toward Sunset Deck - its not very far and you will find a welcome a\"mazing\" surprise."
            }
]
    },
    {
        id: 13,
        title: "The Labyrinth",
        subtitle: "Seeking Inner Wholeness",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way The Journey to Wholeness Stand at the entrance of the labyrinth."
            },
            {
                        "heading": "Introduction",
                        "text": "This simple, early form is only the beginning of what it may one day become \u2014 yet even now, its ancient gift remains the same: a path toward the centre, a path toward wholeness."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The labyrinth reflects the heart of Le Sanctuaire \u2014 the joining of what has been divided, the meeting of heaven and earth."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "From the first steps of this pilgrimage, you have walked through signs of union: light with darkness, water with land, wildness with order, many becoming one."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The labyrinth is the pilgrim\u2019s mirror \u2014 a visible expression of the inner life longing to be gathered into harmony."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "There are no dead ends here."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Only one winding path \u2014 and then outward again, transformed."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Walking a labyrinth teaches trust."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "You move forward, sometimes feeling far from the centre, even though the centre has never moved."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "This is the shape of the spiritual life: not a straight line, but a faithful following."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Wholeness does not come through shortcuts."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It comes through presence, patience, and a willingness to be guided step by step."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here, the scattered pieces of life are gently drawn back toward their true centre."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Enter the labyrinth slowly."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let your steps become quiet and deliberate."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "As you walk, hold this question: What in me is being gathered toward wholeness and deeper union?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "When you reach the centre, stop."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let the quiet hold you."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "When you are ready, follow the path back out \u2014 carrying with you what has been gently restored."
            },
            {
                        "heading": "Where to Next?",
                        "text": "Your shortest connection. Walk a few steps to the deck to enjoy a beautiful view of the magnificant Franschhoek valley... we are bias but we think it is one of the best in the valley!"
            }
]
    },
    {
        id: 14,
        title: "The Deck",
        subtitle: "The Promised Valley & Call of the Pilgrim",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Le Sanctuaire Way The Promised Valley & the Call of the Pilgrim Take a seat along the benches and let your eyes move slowly across the view."
            },
            {
                        "heading": "Introduction",
                        "text": "From here, the full breadth of the Franschhoek Valley opens before you \u2014 vineyards, orchards, riverbeds, and the mountains that have guided your way."
            },
            {
                        "heading": "Introduction",
                        "text": "This is one of the great viewpoints of the pilgrimage."
            },
            {
                        "heading": "Introduction",
                        "text": "Let the view widen your breathing."
            },
            {
                        "heading": "Introduction",
                        "text": "Let your heart expand with the land."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This valley has long been a place of pilgrimage."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Long before farms and vineyards, the Khoi walked these slopes, following water, seasons, and the rhythms of the land."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Centuries later, French Huguenots arrived here as refugees \u2014 seeking sanctuary, faith, and a new beginning."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "What they found became, for them, a promised valley \u2014 a place to plant, to build, and to begin again."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Their story carries a simple truth: promised lands are reached only by those willing to leave what is familiar."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Look now to the mountains that surround you \u2014 Franschhoek Peak, the Hottentots-Holland range, Groot Drakenstein, and behind you, the heights of Wemmershoek and Du Toitskloof."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This valley is held on every side by strength \u2014 a natural sanctuary shaped by time, endurance, and care."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "This place invites remembrance."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "You, too, have crossed valleys and climbed ridges."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "You, too, have left comfort to discover deeper life."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "You, too, have been held \u2014 even when the way felt uncertain or steep."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Pilgrimage is never an escape."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "It is a response to promise."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "From this height, the journey comes into focus: not a retreat from the world, but a sending back into it \u2014 changed, steadied, and called."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cAs the mountains surround Jerusalem, so the LORD surrounds His people.\u201d \u2014 Psalm 125:2 \u201cI lift up my eyes to the hills\u2026 my help comes from the LORD.\u201d \u2014 Psalm 121:1\u20132 \u201cA land with valleys and springs\u2026 a land flowing with milk and honey.\u201d \u2014 Deuteronomy 11:9\u201312"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Remain seated and take in the view."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "What is the next faithful step I am being called to take as I return to the valley of my life?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let the mountains steady you."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let the valley humble you."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Let the journey shape the way you walk from here."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "When you are ready, descend \u2014 carrying the call of the pilgrim with you."
            },
            {
                        "heading": "Where to Next?",
                        "text": "From the deck look to the right top courner of the clearing and you will see the sign marked The Ascent and The Cross\u2014 take this beautiful winding trail -the final, rising movement of the pilgrimage. Keep going until you find your final station - The Cross."
            }
]
    },
    {
        id: 15,
        title: "The Cross",
        subtitle: "The Centre, Summit, Meeting of Heaven & Earth",
        sections: [
            {
                        "heading": "Introduction",
                        "text": "was already read. Make sure to only set it from your base module. It is currently set to The Centre, the Summit, the Meeting of Heaven and Earth Take a seat beside the cross on this rocky ridge."
            },
            {
                        "heading": "Introduction",
                        "text": "You stand on the upper slopes of Le Sanctuaire, looking back across the valley you have travelled through and outward toward the wild, hidden basin of Wemmershoek \u2014 a protected wilderness of ravines, cliffs, and silence."
            },
            {
                        "heading": "Introduction",
                        "text": "Few ever stand where you now stand."
            },
            {
                        "heading": "Introduction",
                        "text": "And here, at the summit of the pilgrimage, is a simple cross."
            },
            {
                        "heading": "Introduction",
                        "text": "This is the place every step has been leading toward."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "When this path was first imagined, the intention was to raise a grand cross \u2014 stone or steel, something striking."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "But the mountain offered something else: fallen trunks, burnt and weathered, lying as if waiting."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Like the moment on Mount Moriah, the whisper was clear: \u201cI will provide.\u201d"
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "The mountain provided its own cross \u2014 humble, scarred, unpolished."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "Not crafted, but given."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "This is the cross that stands here now."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "A provided cross."
            },
            {
                        "heading": "What You Are Seeing",
                        "text": "A surrendered cross."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "This is the centre of the pilgrimage \u2014 and the centre of all things."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "At the cross, what is divided is gathered into one."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The horizontal beam reaches outward \u2014 embracing all people, all difference, all distance."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "The vertical beam rises and descends \u2014 joining earth and heaven, the visible and the unseen, the human and the divine."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here is the great meeting."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here is the place of reconciliation."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Here the ascent finds its meaning \u2014 and life begins anew."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "Across the valley, almost perfectly aligned with this ridge, stands the Franschhoek Cross \u2014 two crosses facing one another across the land, a line of grace drawn from mountain to mountain."
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cWhen I am lifted up\u2026 I will draw all people to Myself.\u201d \u2014 John 12:32",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cThrough Him, God reconciled all things\u2026 by the blood of His cross.\u201d \u2014 Colossians 1:19\u201320",
                        "isScripture": true
            },
            {
                        "heading": "Spiritual Reflection",
                        "text": "\u201cHe Himself is our peace\u2026 making the two one.\u201d \u2014 Ephesians 2:14\u201316",
                        "isScripture": true
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Remain seated beside the cross."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Ask yourself quietly: What in my life is being gathered, healed, or reconciled here?"
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Lay down what you have been carrying."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Receive what is being offered."
            },
            {
                        "heading": "Pilgrimage Action",
                        "text": "Rest for a moment."
            },
            {
                        "heading": "The End \u2014 and the Beginning",
                        "text": "You have reached the summit of the ascent \u2014 but not the end of the pilgrimage."
            },
            {
                        "heading": "The End \u2014 and the Beginning",
                        "text": "Every step down the mountain is an invitation to live what has been awakened here."
            },
            {
                        "heading": "The End \u2014 and the Beginning",
                        "text": "Let the cross send you back with clearer vision, steadier courage, and a heart drawn into wholeness."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Your ascent is complete."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Now it is time to return to the Vineyard Deck where we will gather for reflection, conversation, and then enjoy a late lunch and fellowship together."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Please make your way back down the same path you climbed."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Do not rush your descent."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Be mindful of other pilgrims who may still be making their way upward."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "do not return via the Fynbos Trail."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Instead, take the gravel road to your left and look for the sign marked Buchu Bend."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Follow this winding path\u2014 it curves gently back toward the Vineyard Deck and offers one final surprise at the end: a living gate of buchu bushes, their leaves rich with healing fragrance."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Rub a few leaves between your fingers."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "Breathe in their scent\u2014 a last reminder of the wonder, renewal, and beauty of the pilgrimage."
            },
            {
                        "heading": "Returning to the Vineyard Deck",
                        "text": "You are almost home."
            }
]
    }
];

const Pilgrimage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current space ID from query param (e.g. ?space=1 or ?station=1)
    const initialParam = searchParams.get('space') || searchParams.get('station');
    const initialSpaceId = initialParam ? parseInt(initialParam, 10) : 0;

    const [viewMode, setViewMode] = useState<'intro' | 'station'>(
        initialSpaceId >= 1 && initialSpaceId <= 15 ? 'station' : 'intro'
    );

    const [activeSpaceId, setActiveSpaceId] = useState<number>(
        initialSpaceId >= 1 && initialSpaceId <= 15 ? initialSpaceId : 1
    );

    // Timer State
    const [meditationTimer, setMeditationTimer] = useState<number | null>(null);

    // Modal States
    const [showSingleQRModal, setShowSingleQRModal] = useState(false);
    const [showAllQRSheetModal, setShowAllQRSheetModal] = useState(false);
    const [showMapModal, setShowMapModal] = useState(false);

    useEffect(() => {
        const paramStr = searchParams.get('space') || searchParams.get('station');
        if (!paramStr || paramStr === 'intro' || paramStr === '0') {
            setViewMode('intro');
        } else {
            const paramId = parseInt(paramStr, 10);
            if (paramId >= 1 && paramId <= 15) {
                setActiveSpaceId(paramId);
                setViewMode('station');
            }
        }
    }, [searchParams]);

    const selectSpace = (id: number) => {
        setActiveSpaceId(id);
        setViewMode('station');
        setSearchParams({ space: id.toString() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToStart = () => {
        setViewMode('intro');
        setSearchParams({ space: 'intro' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToNext = () => {
        if (viewMode === 'intro') {
            selectSpace(1);
        } else if (activeSpaceId < 15) {
            selectSpace(activeSpaceId + 1);
        } else {
            goToStart();
        }
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
                <title>The Le Sanctuaire Way | Introduction & 15-Station Pilgrimage</title>
                <meta name="description" content="Welcome to Le Sanctuaire Way — a 15-station guided spiritual walking trail through the landscapes of Le Sanctuaire in Franschhoek." />
            </Helmet>

            <div className="container mx-auto px-4 max-w-5xl">
                
                {/* TOP NAVIGATION BUTTON BAR (Back to Start, Next, Map) */}
                <div className="sticky top-20 z-30 mb-8 bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-sanctuary-stone/60 shadow-lg flex items-center justify-between gap-2">
                    <button
                        onClick={goToStart}
                        className={`inline-flex items-center space-x-1.5 md:space-x-2 px-3.5 md:px-5 py-2.5 rounded-xl text-xs md:text-sm uppercase tracking-wider font-semibold font-serif transition-all ${
                            viewMode === 'intro'
                                ? 'bg-sanctuary-blue text-white shadow-md'
                                : 'bg-sanctuary-sand/60 text-sanctuary-blue hover:bg-sanctuary-sand border border-sanctuary-blue/15'
                        }`}
                    >
                        <Home className="w-4 h-4 text-sanctuary-gold" />
                        <span>Back to Start</span>
                    </button>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowMapModal(true)}
                            className="inline-flex items-center space-x-1.5 md:space-x-2 px-3.5 md:px-5 py-2.5 rounded-xl text-xs md:text-sm uppercase tracking-wider font-semibold font-serif bg-white text-sanctuary-blue hover:bg-sanctuary-sand border border-sanctuary-blue/20 shadow-sm transition-all"
                        >
                            <Map className="w-4 h-4 text-sanctuary-gold" />
                            <span>Map</span>
                        </button>

                        <button
                            onClick={goToNext}
                            className="inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm uppercase tracking-wider font-bold font-serif bg-sanctuary-gold text-white hover:bg-sanctuary-gold/90 shadow-md transition-all"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* VIEW 1: INTRODUCTION SCREEN */}
                {viewMode === 'intro' && (
                    <SectionObserver className="text-center mb-10">
                        <span className="text-sm md:text-base font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-3 block font-semibold">
                            Mont Bleu • Le Sanctuaire Farm
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-sanctuary-blue mb-3">
                            The Le Sanctuaire Way
                        </h1>
                        <h2 className="text-xl md:text-3xl font-serif text-sanctuary-gold mb-8 font-medium">
                            Introduction & Guided Pilgrimage
                        </h2>

                        {/* Exact Google Sites Introduction Section */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl border border-sanctuary-stone/50 shadow-2xl text-left space-y-6 text-lg md:text-2xl text-sanctuary-blue leading-relaxed font-light mb-10">
                            <div className="pb-4 border-b border-sanctuary-blue/10 flex items-center justify-between">
                                <span className="text-sm md:text-base uppercase tracking-widest text-sanctuary-gold font-serif font-bold">
                                    Introduction
                                </span>
                                <span className="text-xs md:text-sm text-sanctuary-blue/60 font-serif">
                                    Where Heaven Meets Earth
                                </span>
                            </div>

                            <p className="text-lg md:text-2xl text-sanctuary-blue leading-relaxed font-light">
                                Welcome to <strong>Le Sanctuaire Way</strong>, a guided pilgrimage through the landscapes of Le Sanctuaire. Each stop invites you to pause, breathe, and become aware of the sacred rhythm where heaven and earth meet. As you walk, may the land speak, the patterns reveal, and the stillness open you to deeper presence. Scan the QR codes at each station to explore reflections, scriptures, and insights for that station.
                            </p>

                            <p className="text-lg md:text-2xl text-sanctuary-blue leading-relaxed font-light">
                                Each station will give you some information about the station, some thoughts for personal reflection and a few relevant scriptures and an activity called <em>Pilgrim's Prompt</em> with questions to reflect on or even something to do. Take at least 5 minutes at each station to participate in these prompts - this is not a passive experience - it is intended to be active and experiential and you will get the most out of it if you follow the prompts! Why not even take a notebook along to jot down personal insights or even an inspirational picture. Take your time.
                            </p>

                            <p className="text-lg md:text-2xl text-sanctuary-blue leading-relaxed font-light">
                                Once you have completed a station simply click on the <strong>Where to Next</strong> button and follow the journey to the Next Station. You can start anywhere but for the full Pilgrimage experience take a leisurely walk to <strong>The Sign</strong> at the very bottom of the Access Road. When you are at the sign - click the Start Pilgrimage Button. Before starting, please read the helpful guidelines below.
                            </p>

                            {/* Guided Notes Box */}
                            <div className="my-8 p-6 md:p-8 bg-sanctuary-sand/50 rounded-2xl border border-sanctuary-blue/15 space-y-6">
                                <h4 className="text-base md:text-xl font-serif text-sanctuary-blue font-bold uppercase tracking-wider flex items-center space-x-2">
                                    <Footprints className="w-5 h-5 text-sanctuary-gold" />
                                    <span>Please read these important notes first</span>
                                </h4>

                                <div className="space-y-4 text-base md:text-xl text-sanctuary-blue">
                                    <div>
                                        <strong className="font-serif text-sanctuary-blue block text-lg md:text-2xl mb-1">What is a Pilgrimage?</strong>
                                        <p className="font-light">
                                            A pilgrimage is a journey taken with intention. It blends physical movement with spiritual awareness, inviting you to slow down, pay attention, and encounter God in the ordinary beauty of creation. At Le Sanctuaire we call this "where heaven meets earth". This happens when we experience the natural earth with all our senses whilst at the same time joining these material elements with their deeper heavenly meaning. As you walk, each step becomes a prayer, and each pause becomes an opportunity to listen.
                                        </p>
                                    </div>

                                    <div>
                                        <strong className="font-serif text-sanctuary-blue block text-lg md:text-2xl mb-1">How to Walk Slowly</strong>
                                        <p className="font-light">
                                            This path is not about speed. Walk with unhurried steps, breathe deeply, and allow the landscape to shape your pace. Notice the patterns, sounds, textures, and surprises along the way. The slower you go, the more you will receive from the journey.
                                        </p>
                                    </div>

                                    <div>
                                        <strong className="font-serif text-sanctuary-blue block text-lg md:text-2xl mb-1">Why These 15 Stops?</strong>
                                        <p className="font-light">
                                            The fifteen stations of Le Sanctuaire Way reflect the <strong>15 Steps of Ascent</strong> leading up to the Temple in Jerusalem. Worshippers climbed these steps singing the 15 Songs of Ascent (Psalms 120–134), moving physically and spiritually toward God’s presence. This pattern echoes the miracle in the days of Hezekiah, when God caused the shadow on the steps to move backward—symbolising renewal, mercy, and a fresh beginning. Our fifteen stops follow this ancient rhythm: a step-by-step ascent of heart, mind, and spirit.
                                        </p>
                                    </div>

                                    <div>
                                        <strong className="font-serif text-sanctuary-blue block text-lg md:text-2xl mb-1">A Pilgrimage in Progress</strong>
                                        <p className="font-light">
                                            We have just started. Many of our stations are not yet what they are intended to be. Please be patient with our progress and allow your imagination to fill in the missing pieces. That said, a pilgrimage is never complete and we will probably always be adding, removing, transforming as we learn and grow. To this end we welcome any constructive feedback.
                                        </p>
                                    </div>
                                </div>

                                {/* Safety Callout */}
                                <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-2">
                                    <span className="font-serif font-bold text-sm md:text-lg flex items-center space-x-2 text-amber-950">
                                        <AlertTriangle className="w-5 h-5 text-amber-700" />
                                        <span>Safety & Notes on the Trail</span>
                                    </span>
                                    <ul className="list-disc pl-5 space-y-1 text-sm md:text-lg font-light text-amber-900">
                                        <li>Be aware that snakes may be present, especially during warmer months.</li>
                                        <li>Stay hydrated, and consider carrying water along the route.</li>
                                        <li>Protect yourself from the sun with a hat, sunscreen, and appropriate clothing.</li>
                                        <li>Watch your footing on natural paths and take care on steeper or uneven sections.</li>
                                    </ul>
                                    <p className="text-sm md:text-base font-serif italic pt-1 text-amber-800">
                                        Walk gently, stay mindful, and enjoy the beauty of the journey.
                                    </p>
                                </div>
                            </div>

                            {/* Scriptural Anchors */}
                            <div className="pt-4 border-t border-sanctuary-blue/10 space-y-3 text-base md:text-xl font-serif text-sanctuary-blue italic">
                                <p className="text-sanctuary-gold font-bold uppercase tracking-wider text-xs md:text-sm">Where Heaven Meets Earth</p>
                                <p>"In the Beginning God created the HEAVEN and the EARTH" — Genesis 1:1</p>
                                <p>"...In the fullness of the times He might gather together in one all things in Christ, both which are in heaven and which are on earth—in Him." — Ephesians 1:10</p>
                                <p>"Now I saw a new heaven and a new earth, for the first heaven and the first earth had passed away." — Revelation 21:1</p>
                            </div>

                            {/* START PILGRIMAGE BUTTON AT BOTTOM OF INTRODUCTION */}
                            <div className="pt-8 text-center border-t border-sanctuary-blue/10">
                                <button
                                    onClick={() => selectSpace(1)}
                                    className="inline-flex items-center space-x-3 bg-sanctuary-blue hover:bg-sanctuary-blue/90 text-white font-serif font-bold text-lg md:text-2xl px-10 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <Play className="w-6 h-6 fill-sanctuary-gold text-sanctuary-gold" />
                                    <span>Start Pilgrimage — Station 1: The Sign</span>
                                    <ArrowRight className="w-6 h-6 text-sanctuary-gold" />
                                </button>
                                <p className="text-xs md:text-sm text-sanctuary-blue/70 mt-3 font-serif italic">
                                    Walk down to the access road sign, or click above to begin Station 1.
                                </p>
                            </div>
                        </div>

                        {/* Official Trail Map Card */}
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-sanctuary-stone/50 shadow-2xl mb-10 text-center overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs md:text-sm uppercase tracking-widest text-sanctuary-gold font-serif font-bold flex items-center space-x-2">
                                    <Map className="w-4 h-4 text-sanctuary-gold" />
                                    <span>Pilgrimage Trail Map</span>
                                </span>
                                <span className="text-xs text-sanctuary-blue/60 font-serif">
                                    Click to Expand Full Map
                                </span>
                            </div>
                            <div
                                onClick={() => setShowMapModal(true)}
                                className="cursor-pointer group relative rounded-2xl overflow-hidden border border-sanctuary-blue/10 bg-sanctuary-sand/30 shadow-inner transition-all hover:shadow-xl"
                            >
                                <img
                                    src="/images/pilgrimage_map.jpg"
                                    alt="Le Sanctuaire Pilgrimage Trail Map"
                                    className="w-full max-h-[600px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-sanctuary-blue/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white/95 text-sanctuary-blue px-5 py-2.5 rounded-full text-xs font-serif uppercase tracking-widest font-bold shadow-lg">
                                        🔍 Click to Enlarge Map
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Print & QR Action Bar */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="/downloads/Le_Sanctuaire_Pilgrimage_15_Station_Signs.pdf"
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-2 text-xs md:text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-full bg-sanctuary-gold text-white hover:bg-sanctuary-gold/90 transition-all shadow-md font-serif font-bold"
                            >
                                <Download className="w-4 h-4 text-white" />
                                <span>Download 15 Printable Signs PDF</span>
                            </a>

                            <button
                                onClick={() => setShowAllQRSheetModal(true)}
                                className="inline-flex items-center space-x-2 text-xs md:text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-full bg-sanctuary-blue text-white hover:bg-sanctuary-blue/90 transition-all shadow-md"
                            >
                                <Printer className="w-4 h-4 text-sanctuary-gold" />
                                <span>Print All 15 Space QR Signs</span>
                            </button>
                        </div>
                    </SectionObserver>
                )}

                {/* VIEW 2: STATION DISPLAY SCREEN WITH BOLD HEADINGS & NO HANGING SENTENCES */}
                {viewMode === 'station' && (
                    <>
                        {/* 15 Steps Horizontal Navigation Selector */}
                        <div className="mb-8 bg-white p-4 md:p-6 rounded-3xl border border-sanctuary-stone/50 shadow-md">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <span className="text-xs md:text-sm uppercase tracking-widest text-sanctuary-gold font-serif flex items-center space-x-2 font-bold">
                                    <Compass className="w-4 h-4" />
                                    <span>The 15 Steps of Ascent</span>
                                </span>
                                <span className="text-xs md:text-sm text-sanctuary-blue/70 font-semibold">Step {activeSpace.id} of 15</span>
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
                                    <button
                                        onClick={() => setShowSingleQRModal(true)}
                                        className="text-xs md:text-sm font-serif text-white/90 hover:text-sanctuary-gold transition-colors inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full"
                                    >
                                        <Smartphone className="w-3.5 h-3.5 text-sanctuary-gold" />
                                        <span>QR Sign</span>
                                    </button>
                                </div>

                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-3 leading-tight">
                                    {activeSpace.id}. {activeSpace.title}
                                </h2>
                                <p className="text-base md:text-xl text-white/80 font-light italic">
                                    {activeSpace.subtitle}
                                </p>
                            </div>

                            {/* Main Text Content Rendered with Bold Headings & Flowing Paragraphs */}
                            <div className="p-8 md:p-12 space-y-6">
                                {activeSpace.sections.map((section, secIdx) => {
                                    const isWhereToNext = section.heading && section.heading.toLowerCase().includes('where to next');
                                    
                                    return (
                                        <div key={secIdx} className="space-y-4">
                                            {/* BOLD HEADINGS */}
                                            {section.heading && section.heading !== 'Introduction' && (
                                                <h3 className="text-xl md:text-3xl font-serif font-bold text-sanctuary-blue mt-8 mb-3 flex items-center space-x-2 border-b border-sanctuary-gold/30 pb-2">
                                                    <span className="text-sanctuary-gold font-sans text-sm md:text-base font-bold uppercase tracking-wider block">
                                                        {section.heading}
                                                    </span>
                                                </h3>
                                            )}

                                            {/* SCRIPTURE BOX */}
                                            {section.isScripture ? (
                                                <div className="p-6 md:p-8 rounded-2xl bg-sanctuary-sand/50 border border-sanctuary-blue/10 relative my-4">
                                                    <BookOpen className="w-6 h-6 text-sanctuary-gold absolute top-6 left-6" />
                                                    <div className="pl-8">
                                                        <p className="text-lg md:text-2xl text-sanctuary-blue font-serif italic leading-relaxed">
                                                            {section.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* FLOWING NARRATIVE PARAGRAPH (NO HANGING SENTENCES) */
                                                <p className="text-lg md:text-2xl text-sanctuary-blue/90 leading-relaxed font-light">
                                                    {section.text}
                                                </p>
                                            )}

                                            {/* NEXT STATION BUTTON DIRECTLY UNDER WHERE TO NEXT */}
                                            {isWhereToNext && (
                                                <div className="my-6 p-6 rounded-2xl bg-sanctuary-gold/10 border border-sanctuary-gold/30 text-center space-y-3">
                                                    <span className="text-xs md:text-sm font-serif uppercase tracking-widest text-sanctuary-gold font-bold block">
                                                        Ready for the next station?
                                                    </span>
                                                    <button
                                                        onClick={goToNext}
                                                        className="inline-flex items-center space-x-3 bg-sanctuary-blue hover:bg-sanctuary-blue/90 text-white font-serif font-bold text-base md:text-xl px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        <span>
                                                            {nextSpace ? `Next Station — Step ${nextSpace.id}: ${nextSpace.title}` : 'Complete Pilgrimage — Return to Start'}
                                                        </span>
                                                        <ArrowRight className="w-5 h-5 text-sanctuary-gold" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Meditation Timer Button */}
                                <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                                    <div className="flex items-center space-x-3">
                                        <Sun className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                        <div>
                                            <span className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-emerald-900">Pause & Reflect</span>
                                            <p className="text-xs md:text-sm text-emerald-800">Take 5 minutes of quiet stillness at this space.</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setMeditationTimer(meditationTimer ? null : 300)}
                                        className="px-5 py-3 bg-emerald-700 text-white rounded-xl text-xs md:text-sm uppercase tracking-wider font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center space-x-2 flex-shrink-0 shadow-sm"
                                    >
                                        <Clock className="w-4 h-4" />
                                        <span>{meditationTimer ? `Pause Timer (${Math.floor(meditationTimer / 60)}m ${meditationTimer % 60}s)` : '5-Min Pause Timer'}</span>
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
                                    ) : (
                                        <button
                                            onClick={goToStart}
                                            className="inline-flex items-center space-x-2 text-sm md:text-lg font-serif text-sanctuary-blue hover:text-sanctuary-gold transition-colors font-medium"
                                        >
                                            <Home className="w-4 h-4" />
                                            <span>Introduction</span>
                                        </button>
                                    )}

                                    {nextSpace ? (
                                        <button
                                            onClick={() => selectSpace(nextSpace.id)}
                                            className="inline-flex items-center space-x-2 text-sm md:text-lg font-serif text-sanctuary-blue hover:text-sanctuary-gold transition-colors font-medium"
                                        >
                                            <span>Step {nextSpace.id}: {nextSpace.title}</span>
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={goToStart}
                                            className="inline-flex items-center space-x-2 text-sm md:text-lg font-serif text-sanctuary-gold font-medium"
                                        >
                                            <span>Finish Pilgrimage</span>
                                            <Home className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* BOTTOM ALL 15 STATIONS QUICK SKIP GRID */}
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-sanctuary-stone/40 shadow-xl text-center mt-12">
                    <MapPin className="w-8 h-8 text-sanctuary-gold mx-auto mb-3" />
                    <h3 className="text-2xl md:text-3xl font-serif text-sanctuary-blue mb-2">All 15 Pilgrimage Stations</h3>
                    <p className="text-sm md:text-base text-sanctuary-blue/70 max-w-2xl mx-auto leading-relaxed font-light mb-6">
                        Tap any station below to quickly skip directly to its guided text & reflection.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
                        {SPACES.map(sp => (
                            <div
                                key={sp.id}
                                onClick={() => selectSpace(sp.id)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                                    viewMode === 'station' && activeSpaceId === sp.id
                                        ? 'bg-sanctuary-blue text-white border-sanctuary-blue shadow-md scale-[1.02]'
                                        : 'bg-sanctuary-sand/40 border-sanctuary-blue/10 text-sanctuary-blue hover:bg-sanctuary-sand hover:border-sanctuary-gold/40'
                                }`}
                            >
                                <span className={`text-[10px] uppercase tracking-wider font-bold block mb-0.5 ${
                                    viewMode === 'station' && activeSpaceId === sp.id ? 'text-sanctuary-gold' : 'text-sanctuary-gold'
                                }`}>
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

            {/* Map Zoom Modal */}
            <AnimatePresence>
                {showMapModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <div className="relative max-w-6xl w-full max-h-[90vh]">
                            <button
                                onClick={() => setShowMapModal(false)}
                                className="absolute top-4 right-4 z-10 bg-white/20 text-white hover:bg-white/40 p-3 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <img
                                src="/images/pilgrimage_map.jpg"
                                alt="Le Sanctuaire Full Pilgrimage Map"
                                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                <p className="text-xs md:text-sm text-sanctuary-blue/60 mt-1 mb-4">
                                    Printable signs for physical posts along Le Sanctuaire Way.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <a
                                        href="/downloads/Le_Sanctuaire_Pilgrimage_15_Station_Signs.pdf"
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-6 py-3 bg-sanctuary-gold text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-sanctuary-gold/90 transition-colors inline-flex items-center space-x-2 shadow-md font-serif font-bold"
                                    >
                                        <Download className="w-4 h-4 text-white" />
                                        <span>Download 15-Sign Printable PDF</span>
                                    </a>

                                    <button
                                        onClick={() => window.print()}
                                        className="px-6 py-3 bg-sanctuary-blue text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-sanctuary-blue/90 transition-colors inline-flex items-center space-x-2 shadow-md"
                                    >
                                        <Printer className="w-4 h-4 text-sanctuary-gold" />
                                        <span>Print Complete 15-Sign Pack</span>
                                    </button>
                                </div>
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
