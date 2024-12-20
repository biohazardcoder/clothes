import React from 'react'
import { Container } from '../../components/shared/Container/Container'
import Button from '../../components/ui/Button'

function Entry() {
    return (
        <section className="h-screen text-[white] hero_bg">
            <Container className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12">
                <div className="flex flex-col h-full justify-center items-start gap-10">
                    <h1 className="text-[white] text-4xl md:text-6xl font-bold">
                        O'zingiz Yoqtirgan Hashamatli Uslubni Kashf Eting.
                    </h1>
                    <p className="text-secontary font-light">
                        Besh futdan yuqori bo'lgan binafsha o'tning kichkina yamog'iga o'xshardi
                        kvadrat, qum bo'ylab o'z yo'nalishi bo'yicha harakatlanar edi. Deyarli qilaman
                        am yoki yuraklarni cheklaydi. Partiyalarni hal qiling, lekin nima uchun u ko'rsatmoqda. U kuyladi
                        Qanday nay sovuq real ish endi bilaman.
                    </p>
                    <Button
                        to="/shop"
                        className="px-6 py-3  ">
                        Barcha Mahsulotlarni Ko'rish →
                    </Button>
                </div>
            </Container>
        </section>
    )
}

export default Entry