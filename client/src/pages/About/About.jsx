import { Link } from "react-router-dom";
import { Container } from "../../components/shared/Container/Container";
import { Footer } from "../../components/shared/Footer/Footer";

export const AboutUs = () => {
    return (
        <div className="bg-container min-h-screen w-full">  
            <Container>
                <main className="max-w-4xl mx-auto  py-20  px-4 text-primary">
                    <section className="text-center mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                            Welcome to <span className="font-serif">ELDORADO</span>
                        </h2>
                        <p className="text-lg leading-relaxed">
                            At <strong>Eldorado</strong>, we believe that fashion should be accessible, sustainable, and expressive.
                            Our mission is to offer stylish, high-quality clothing that reflects your individuality and keeps you comfortable all day long.
                        </p>
                    </section>

                    <section className="grid gap-6 sm:grid-cols-2">
                        <div className="bg-meteor text-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-medium mb-3">Our Values</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Quality and craftsmanship in every piece.</li>
                                <li>Eco-conscious and sustainable materials.</li>
                                <li>Fair trade practices and ethical production.</li>
                            </ul>
                        </div>

                        <div className="bg-meteor text-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-medium mb-3">Our Story</h3>
                            <p>
                                Founded in 2024, Eldorado started as a small boutique with a passion for unique and fashionable clothing.
                                Over the years, we've grown into a trusted name for shoppers who value quality and style.
                            </p>
                        </div>
                    </section>

                    <section className="text-center mt-10">
                        <h3 className="text-xl font-medium mb-4">We’d Love to Hear From You</h3>
                        <p>
                            Have questions, feedback, or just want to say hello?{" "}
                            <Link to="/contact" className="text-blue-600 ">Contact us</Link> anytime!
                        </p>
                    </section>

                    <section className="mt-10">
                        <h3 className="text-xl font-medium mb-4 text-center">Visit Us</h3>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2863.881416307943!2d71.61904427585588!3d40.96045127135737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb490be28485bd%3A0x9900d39e61d826e0!2sGorilla%20game%20Club!5e1!3m2!1sru!2s!4v1732030824831!5m2!1sru!2s"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Location Map"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </section>
                </main>

            </Container>
        </div>
    );
};
