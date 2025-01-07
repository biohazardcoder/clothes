import { Link } from "react-router-dom";
import { Container } from "../../components/shared/Container/Container";
import { Footer } from "../../components/shared/Footer/Footer";
import AutoFocus from "../../middlewares/AutoFocus";

export const AboutUs = () => {
    return (
        <div className="bg-container min-h-screen w-full">
            <AutoFocus />
            <Container>
                <main className="max-w-4xl mx-auto  py-20  px-4 text-primary">
                    <section className="text-center mb-8">
                        <h2 className="text-2xl font-semibold mb-4">
                            <span className="font-serif">Naund</span> do'koni haqida:
                        </h2>
                        <p className="text-lg leading-relaxed">
                            Bizning do'kondan siz Kiyimlar, Soatlar, Ko'z oynaklar va turli xil aksesuarlarni topishingiz mumkin!
                        </p>
                    </section>

                    <section className="grid gap-6 sm:grid-cols-2">
                        <div className="bg-meteor text-[white] shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-medium mb-3">Bizda mavjud</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Kiyimlar</li>
                                <li>Soatlar</li>
                                <li>Ko'z oynaklar</li>
                                <li>Aksesuarlar</li>
                            </ul>
                        </div>

                        <div className="bg-meteor text-[white] shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-medium mb-3">Biznig qulayliklarimiz</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Sifatli mahsulotlar</li>
                                <li>Doimiy chegirmalar</li>
                                <li>Yetkazib berish hizmati</li>
                                <li>Qaytarib berish kafolati</li>
                            </ul>
                        </div>
                    </section>

                    <section className="text-center mt-10">
                        <h3 className="text-xl font-medium">Biz bilan bo'glanish uchun telefon raqamimiz: +998 50 0908088</h3>
                        <p>
                            Har qanday muammolar, murojatlar va takliflar uchun doim aloqadamiz
                        </p>
                    </section>

                    <section className="mt-10">
                        <h3 className="text-xl font-medium text-center">Manzilimiz: Namangan viloyati, Namangan tumani, Xonobod QFY, 38 bino</h3>
                        <h3 className=" font-medium mb-4 text-center">Mo'ljal: 27-maktab oldida</h3>
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
            <Footer />
        </div>
    );
};
