import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">

                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            
                            headr
                        </header>

                        <main className="mt-6">
                            main
                            
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            footer
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
