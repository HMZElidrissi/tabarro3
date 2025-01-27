export default function MapComponent({ dict }: { dict: any }) {
    return (
        <div
            className="py-16 bg-gradient-to-b from-white via-gray-50 to-white"
            id="map">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400 mb-8">
                    {dict.map_title}
                </h2>
                <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-100 rounded-lg blur opacity-20" />

                    {/* Map container */}
                    <div className="relative w-full h-[480px] md:h-[600px] rounded-lg overflow-hidden bg-white ring-1 ring-gray-100 shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/d/embed?mid=1_xdkOSpnMwENS7n6ghlSze4L3rtDIXM&ehbc=2E312F"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Blood Donation Centers Map"
                            className="transition-opacity duration-300 hover:opacity-95"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
