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
                        What looked like a small patch of purple grass, above five feet
                        square, was moving across the sand in their direction. Almost do
                        am or limits hearts. Resolve parties but why she shewing. She sang
                        know now how nay cold real case.
                    </p>
                    <Button
                        to="/shop"
                        className="px-6 py-3  ">
                        View All Products →
                    </Button>
                </div>
            </Container>
        </section>
    )
}

export default Entry