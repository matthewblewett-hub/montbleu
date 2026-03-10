import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';


const Connect: React.FC = () => {
    return (
        <div className="pt-20">
            {/* Intro Quote */}
            <section className="min-h-[60vh] flex items-center justify-center bg-sanctuary-sand p-6 text-center">
                <SectionObserver>
                    <p className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-8">The Philosophy</p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-sanctuary-blue leading-[1.3] max-w-4xl mx-auto italic">
                        "A sanctuary is not an escape from the world, but a place where the world is seen more clearly."
                    </h1>
                </SectionObserver>
            </section>

            {/* Main Philosophy Text */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <SectionObserver className="space-y-8 text-lg font-light leading-relaxed text-sanctuary-blue/80">
                        <p>
                            Mont Bleu has been shaped as a journey - from valley to summit, from noise to stillness, from the grounded realities of earth toward the openness of heaven. The land itself participates in this movement. Stone, water, trees, paths, and silence are not decorative elements here; they are integral to the design and purpose of the place.
                        </p>
                        <p>
                            From the beginning, we have been intentional in creating a space where the cultivated and the natural meet - where vineyards, orchards, paths, and built forms sit gently within the mountain landscape. These are not just spaces to pass through, but places designed to invite presence, attentiveness, and connection.
                        </p>
                        <p>
                            In a fragmented and distracted world, we all arrive carrying different longings for connection. For some, it may be the healing or deepening of connection with a loved one. For others, it may be an internal reconnection - bringing together scattered thoughts, emotions, or seasons of life. Many feel a deep pull toward connection with nature itself, drawn by beauty, rhythm, and stillness. And for some, there is a quiet desire to reconnect with something larger - something sacred, transcendent, and beyond the limits of the modern visual world.
                        </p>
                        <p>
                            Whatever form that longing takes, Mont Bleu is being restored as a living palette - a place where connection can be rediscovered, renewed, or enriched.
                        </p>
                        <p>
                            Meditation stations along the Pilgrim’s Journey encourage intentional reflection. Elevated viewpoints and wide vistas open the imagination. Physical experiences - walking, climbing, plunging into cold water, resting in warmth - reawaken the senses. Even moments of adventure and exertion are part of the process, enlivening awareness and drawing body and spirit back into alignment.
                        </p>
                        <p>
                            The aesthetic language of Mont Bleu also speaks quietly to this purpose. Natural river stone, timber, and deep blue tones echo the surrounding mountain landscape. Repeated triangular forms within the design suggest ascent, direction, and orientation - subtle reminders of movement upward, of connection between earth and heaven.
                        </p>
                        <p className="font-serif text-xl md:text-2xl text-sanctuary-blue italic pt-8 border-t border-sanctuary-blue/10">
                            Mont Bleu continues to evolve. Each path, structure, and detail is added with care, guided by a single intention: to create a place where connection - with self, with others, with nature, and with the divine - can be gently restored.
                        </p>
                    </SectionObserver>
                </div>
            </section>
        </div>
    );
};

export default Connect;
