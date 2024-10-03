// Imports
// ================================================================================================
import './App.css';
import { useState } from 'react';

import UrlForm from "./components/url/UrlForm";
import UrlCard from "./components/url/UrlCard";

function App() {
    const [urls, setUrls] = useState([""]);
    const [startWordCount, setStartWordCount] = useState(false);

    // JSX
    // --------------------------------------------------------------------------------------------
    return(
        <main className="flex flex-col h-screen items-center">
            <h1 className="font-bold p-4 text-2xl text-center">Word counter</h1>

            <UrlForm
                setUrls={setUrls}
                setStartWordCount={setStartWordCount}
                startWordCount={startWordCount}
                urls={urls}
            />

            { startWordCount &&
                <section className="flex flex-col flex-wrap gap-4 items-center justify-center p-4 w-full">
                    { urls.map((url, index) => (
                        url !== "" &&
                            <UrlCard
                                index={index}
                                key={index}
                                url={url}
                            />
                    ))}
                </section>
            }
        </main>
    )
}

export default App;
