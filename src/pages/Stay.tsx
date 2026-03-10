import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import RoomShowcase from '../components/ui/RoomShowcase';
import Modal from '../components/ui/Modal';
import { Waves, Coffee, BookOpen, Flame, Droplets, Wine, Sun } from 'lucide-react';

const Stay: React.FC = () => {
    const [selectedRoom, setSelectedRoom] = React.useState<any>(null);

    const rooms = [
        {
            name: "Mountain Suite",
            description: "This calm, spacious room opens onto a private balcony where you can enjoy your morning coffee with mountain air. Inside, soft natural textures and warm tones create a peaceful atmosphere for rest and renewal.",
            images: [
                "/assets/newimages/Mountain 1.jpg",
                "/assets/newimages/Mountain 2.jpg",
                "/assets/newimages/Mountain 3.jpg"
            ],
            features: ["Private Balcony", "King Size Bed", "Mountain and Valley View", "En-suite - Walk in Shower"],
            bookingLink: "https://www.airbnb.co.za/h/montbleu-mountainroom",
            innStyleDomain: "montbleuguesthouse",
            bookableId: 77213,
            details: {
                size: "45m²",
                occupancy: "2 Adults",
                bed: "King (Extra Length)",
                view: "Simonsberg Mountain & Valley",
                amenities: ["Smart TV", "Nespresso", "Daily Housecleaning", "Air Conditioning", "Luxury Linen", "Rain Shower", "Organic Toiletries"]
            }
        },
        {
            name: "Olive Suite",
            description: "The ground floor room opens to a private outdoor seating area overlooking the garden and olive grove. A freestanding bath and natural finishes invite deep relaxation, a space for slow mornings and quiet evenings.",
            images: [
                "/assets/newimages/Olive 1.jpg",
                "/assets/newimages/Olive 2.jpg",
                "/assets/newimages/Olive 3.jpg"
            ],
            features: ["Garden Access", "Freestanding Bath", "Olive Grove View", "Seating Area"],
            bookingLink: "https://www.airbnb.co.za/h/montbleu-oliveroom",
            innStyleDomain: "montbleuguesthouse",
            bookableId: 77212,
            details: {
                size: "40m²",
                occupancy: "2 Adults",
                bed: "Queen",
                view: "Olive Grove & Garden",
                amenities: ["Smart TV", "Nespresso", "Daily Housecleaning", "Private Patio", "Freestanding Bath", "Minibar", "Writing Desk", "High-speed Wi-Fi"]
            }
        },
        {
            name: "Protea Suite",
            description: "Inspired by the wild beauty of the fynbos, this room is gentle luxury. A freestanding bathtub faces a large window framing the mountains, and an outdoor shower adds a touch of adventure to your stay.",
            images: [
                "/assets/newimages/Protea 1.jpg",
                "/assets/newimages/Protea 2.jpg",
                "/assets/newimages/Protea 3.jpg"
            ],
            features: ["Outdoor Shower", "Mountain View", "Fynbos Surrounds", "Bathtub w/ View"],
            bookingLink: "https://www.airbnb.co.za/h/montbleu-protearoom",
            innStyleDomain: "montbleuguesthouse",
            bookableId: 77214,
            details: {
                size: "50m²",
                occupancy: "2 Adults",
                bed: "King",
                view: "Panoramic Mountain & Fynbos",
                amenities: ["Smart TV", "Nespresso", "Daily Housecleaning", "Outdoor Shower", "Indoor Fireplace", "Private Entrance"]
            }
        },
        {
            name: "Oak Room",
            description: "Perched upstairs with panoramic views on both sides, the Oak Room is Mont Bleu’s most elevated space - filled with light from sunrise to sunset. A private balcony captures the full sweep of the Franschhoek valley, making it perfect for those who love space, stillness, and endless sky.",
            images: [
                "/assets/newimages/Oak 1.jpg",
                "/assets/newimages/Oak 2.jpg",
                "/assets/newimages/Oak 3.jpg"
            ],
            features: ["Panoramic Views", "Elevated Space", "Private Balcony", "Light & Airy"],
            bookingLink: "https://www.airbnb.co.za/h/montbleu-oakroom",
            innStyleDomain: "montbleuguesthouse",
            bookableId: 77215,
            details: {
                size: "45m²",
                occupancy: "2 Adults",
                bed: "King (Extra Length)",
                view: "Valley & Mountains",
                amenities: ["Smart TV", "Nespresso", "Daily Housecleaning", "Private Balcony", "Air Conditioning", "Luxury Linen", "En-suite Bathroom"]
            }
        },
        {
            name: "Fynbos Room",
            description: "The Fynbos Room combines modern simplicity with soulful character, featuring an outdoor shower beneath the stars and views across the valley. The glass reading and relaxation space is a favourite with guests. Ideal for guests seeking quiet reflection and connection to nature.",
            images: [
                "/assets/newimages/Fynbos 1.jpg",
                "/assets/newimages/Fynbos 2.jpg",
                "/assets/newimages/Fynbos 3.jpg"
            ],
            features: ["Outdoor Shower", "Valley Views", "Glass Reading Space", "Modern Simplicity"],
            bookingLink: "https://www.airbnb.co.za/h/montbleu-fynbosroom",
            innStyleDomain: "montbleuguesthouse",
            bookableId: 77162,
            details: {
                size: "40m²",
                occupancy: "2 Adults",
                bed: "Queen",
                view: "Valley",
                amenities: ["Smart TV", "Nespresso", "Daily Housecleaning", "Outdoor Shower", "Reading Corner", "Private Patio", "High-speed Wi-Fi"]
            }
        }
    ];

    const facilities = [
        { icon: Waves, title: "Swimming Pool", desc: "The sparkling swimming pool forms the heart of Mont Bleu, offering uninterrupted views of the surrounding mountains." },
        { icon: Sun, title: "Main Deck", desc: "Our main deck enjoys some of the finest views in the Franschhoek Valley. Ideal for unwinding as the sun sets." },
        { icon: Coffee, title: "Lounge & Dining", desc: "Comfortable space to relax, enjoy background music, or help yourself to tea, coffee, or a light snack." },
        { icon: BookOpen, title: "Mezzanine Library", desc: "Tucked above the main living space, offering a quiet retreat with views toward the Wemmershoek Mountains." },
        { icon: Flame, title: "Mountain Hot Tub", desc: "Gas-fired mountain hot tub overlooking the nearby stream. Best enjoyed slowly in the cool mountain air." },
        { icon: Droplets, title: "Sauna & Plunge Pool", desc: "Private couples sauna perched on a riverbank with steps leading into a natural river pool." },
        { icon: Wine, title: "Honesty Bar", desc: "Thoughtfully curated selection of wines and refreshments. Unhurried and unpretentious." },
        { icon: Sun, title: "Yoga & Sunset Deck", desc: "A short walk from the guest home, offering panoramic views. Perfect for morning stretches or evening drinks." },
        { icon: Waves, title: "Meditation Labyrinth", desc: "Designed for slow, meditative walking. Part of the broader Pilgrim’s Journey across Mont Bleu." }
    ];

    return (
        <div className="pt-20 bg-sanctuary-sand">
            <SectionObserver className="container mx-auto px-6 py-32 text-center max-w-4xl relative z-20">
                <span className="text-3xl tracking-[0.2em] uppercase text-sanctuary-gold mb-6 block">The Guest Home</span>
                <h1 className="text-6xl md:text-8xl font-serif text-sanctuary-blue mb-12">Mont Bleu</h1>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-sanctuary-blue/80">
                    Not a hotel, but a home. Designed to feel lived-in, warm, and unhurried.
                    Guests help themselves, share spaces with care, and settle into the slower rhythm of mountain living.
                </p>
            </SectionObserver>

            {/* Room Showcases */}
            <div className="flex flex-col gap-24 md:gap-32 pb-32">
                {rooms.map((room, index) => (
                    <RoomShowcase
                        key={index}
                        {...room}
                        index={index}
                        onOpenDetails={() => setSelectedRoom(room)}
                    />
                ))}
            </div>

            {/* Room Detail Modal */}
            <Modal isOpen={!!selectedRoom} onClose={() => setSelectedRoom(null)}>
                {selectedRoom && (
                    <div className="text-sanctuary-blue">
                        <h2 className="text-4xl md:text-5xl font-serif mb-4">{selectedRoom.name}</h2>
                        <p className="text-lg font-light opacity-80 mb-8 max-w-2xl">{selectedRoom.description}</p>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                            {selectedRoom.images.map((img: string, idx: number) => (
                                <div key={idx} className="aspect-[4/3] overflow-hidden rounded-sm">
                                    <img src={img} alt={`${selectedRoom.name} detail ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>

                        {/* Room Specific Amenities */}
                        <div className="mb-8">
                            <h3 className="text-xl font-serif mb-6 border-b border-sanctuary-blue/10 pb-4">Room Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                                {selectedRoom.details.amenities.map((amenity: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-1 h-1 bg-sanctuary-gold rounded-full" />
                                        <span className="text-sm uppercase tracking-wider opacity-70">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Room Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-sanctuary-blue/5 p-6 rounded-lg">
                            <div>
                                <span className="block text-xs uppercase text-sanctuary-gold tracking-widest mb-1">Size</span>
                                <span className="font-serif text-lg">{selectedRoom.details.size}</span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-sanctuary-gold tracking-widest mb-1">Occupancy</span>
                                <span className="font-serif text-lg">{selectedRoom.details.occupancy}</span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-sanctuary-gold tracking-widest mb-1">Bed</span>
                                <span className="font-serif text-lg">{selectedRoom.details.bed}</span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-sanctuary-gold tracking-widest mb-1">View</span>
                                <span className="font-serif text-lg">{selectedRoom.details.view}</span>
                            </div>
                        </div>

                        {/* Shared Facilities */}
                        <div className="mt-12 pt-12 border-t border-sanctuary-blue/10">
                            <h3 className="text-xl font-serif mb-8 text-center text-sanctuary-blue">Also Included</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                                {facilities.map((fac, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center group">
                                        <fac.icon strokeWidth={1} size={24} className="mb-3 text-sanctuary-gold" />
                                        <h4 className="text-sm font-serif mb-1 text-sanctuary-blue">{fac.title}</h4>
                                        <p className="text-[10px] uppercase tracking-wider opacity-60 max-w-[150px] text-sanctuary-blue">{fac.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>


            {/* Featured Facilities */}
            <div className="bg-sanctuary-sand py-32">
                <div className="container mx-auto px-6">
                    <SectionObserver className="mb-24 text-center">
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-sanctuary-blue">Facilities & Amenities</h2>
                        <p className="opacity-60 font-light max-w-xl mx-auto text-sanctuary-blue">Everything you need to disconnect from the world and reconnect with yourself.</p>
                    </SectionObserver>

                    {/* Combined Facilities Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Pool",
                                description: "The sparkling swimming pool forms the heart of Mont Bleu, offering uninterrupted views of the surrounding mountains.",
                                image: "/assets/newimages/Pool 1.jpg"
                            },
                            {
                                title: "The Continental Breakfast",
                                description: "Enjoy a fresh breakfast including local sourdough bread, cheeses, fruit and yogurt with a fresh pastry and coffee or tea",
                                image: "/assets/newimages/Dining 1.jpg"
                            },
                            {
                                title: "Main Deck",
                                description: "Our main deck enjoys some of the finest views in the Franschhoek Valley. Ideal for unwinding as the sun sets.",
                                image: "/assets/newimages/Deck.jpg"
                            },
                            {
                                title: "The Labyrinth",
                                description: "The labyrinth invites a different kind of walking - slow, intentional, and inward. Offers a space to quiet the mind.",
                                image: "/assets/gallery/ecea571c-05e9-46c9-9b62-cb3f919c3cca.jpg"
                            },
                            {
                                title: "Mountain Hot Tub",
                                description: "Gas-fired mountain hot tub overlooking the nearby stream. Best enjoyed slowly in the cool mountain air.",
                                image: "/assets/gallery/4b7a33db-63e2-4ade-8bc8-a1275608887f.jpg"
                            },
                            {
                                title: "The Sauna",
                                description: "Private couples sauna perched on a riverbank with steps leading into a natural river pool.",
                                image: "/assets/gallery/947f3989-4317-4543-b0f3-915689dffeb3.jpg"
                            },
                            {
                                title: "The Lounge",
                                description: "Comfortable space to relax, enjoy background music, or help yourself to tea, coffee, or a light snack.",
                                image: "/assets/newimages/Lounge 1.jpg"
                            },
                            {
                                title: "Mezzanine Library",
                                description: "Tucked above the main living space, offering a quiet retreat with views toward the Wemmershoek Mountains.",
                                image: "/assets/stay/olive/20962dbc-f98e-47ce-a145-0004bf3a11a2.jpg"
                            },
                            {
                                title: "The Dining Room",
                                description: "A welcoming space to enjoy breakfast and shared meals.",
                                image: "/assets/newimages/Dining 2.jpg"
                            },
                            {
                                title: "Dining Deck",
                                description: "Enjoy al fresco dining with sweeping views of the valley.",
                                image: "/assets/newimages/Deck 2.jpg"
                            },

                            {
                                title: "Honesty Bar",
                                description: "Thoughtfully curated selection of wines and refreshments. Unhurried and unpretentious.",
                                image: "/assets/newimages/Lounge 2.jpg"
                            },
                            {
                                title: "Yoga & Sunset Deck",
                                description: "Not far up the hill enjoy the views from the highest deck in all of the Franschhoek Valley with unrivalled views",
                                image: "/assets/gallery/3a568286-90e9-464a-939e-d308076df308.jpg" // Reusing appropriate image
                            },
                            {
                                title: "Parking & Wi-Fi",
                                description: "Secure parking on the estate and high-speed fibre internet throughout the guest home.",
                                image: "/assets/stay/protea/2890fb6a-a792-45b4-bed4-e8fccc8c1d43.jpg"
                            },
                            {
                                title: "Daily Housekeeping",
                                description: "Discreet daily service to keep your space fresh and inviting.",
                                image: "/assets/stay/olive/7369cd4b-4425-46b7-9c47-47313d0e9ecc.jpg"
                            },
                            {
                                title: "Trails",
                                description: "Short trails through the property with a weekly guided walk",
                                image: "/assets/gallery/3a568286-90e9-464a-939e-d308076df308.jpg"
                            }
                        ].map((facility, index) => (
                            <SectionObserver key={index} delay={index * 0.05} className="group cursor-default">
                                <div className="aspect-[4/3] overflow-hidden mb-6 relative">
                                    <div className="absolute inset-0 bg-sanctuary-blue/0 group-hover:bg-sanctuary-blue/10 transition-colors duration-500 z-10" />
                                    <img
                                        src={facility.image}
                                        alt={facility.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif text-sanctuary-blue mb-3 group-hover:text-sanctuary-gold transition-colors duration-300">{facility.title}</h3>
                                <p className="text-sm font-light leading-relaxed text-sanctuary-blue/70">
                                    {facility.description}
                                </p>
                            </SectionObserver>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Stay;
