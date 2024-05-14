import { Link, Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        searchTerm: ''
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('search'), {
            onSuccess: () => {
                console.log('success');
            }
        });
    }
    return (
        <div className="container">

            <div className="">
                    <header className="text-center">
                        
                        <h1>Webapp PokeApi</h1>
                    </header>

                    <main className="text-center">
                        main
                        
                    </main>

                    <footer className="text-center">
                        Desarrollo: marcelmolina.dev@gmail.com
                    </footer>
            </div>
        </div>
    );
}
