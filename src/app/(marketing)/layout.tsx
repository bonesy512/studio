import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="fixed top-0 left-0 -z-10 h-full w-full bg-background">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-secondary/20" />
            </div>
            <Header />
            <main className="flex-grow max-w-screen-2xl mx-auto py-12 px-4 md:px-6 w-full">{children}</main>
            <Footer />
        </div>
    );
}
