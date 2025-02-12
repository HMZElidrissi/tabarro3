import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export default function Partners({ dict }: { dict: any }) {
    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
                    {dict.partners}
                </h2>

                <div className="py-8">
                    <Marquee gradient={false} speed={50}>
                        <Image
                            src="/partners/ibnsina-green.png"
                            alt="Ibn Sina's logo"
                            width={100}
                            height={100}
                            className="w-24 mr-24 "
                        />
                    </Marquee>
                </div>
            </div>
        </section>
    );
}
