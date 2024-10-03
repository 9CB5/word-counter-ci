import { useState } from 'react';

function UrlForm({ setUrls, setStartWordCount, startWordCount, urls }) {
    const [error, setError] = useState(false);

    // Handler that updates url in the inputs
    const handleInputChange = (index, event) => {
        let newUrls = [...urls];
        newUrls[index] = event.target.value;
        setUrls(newUrls);
    }

    // Handler that initiates the word count
    const handleWordCountStart = () => {
        const urlToCheck = urls[urls.length - 1];
        setError(true);

        if (isValidUrl(urlToCheck) && isUniqueUrl(urlToCheck) && urls.length <= 5) {
            setError(false);
            setStartWordCount(true);
        }
    }

    // Handler that resets the inputs and results
    const handleStartOver = () => {
        setStartWordCount(false);
        setError(false);
        setUrls([""]);
    }

    const addUrl = () => {
        const urlToCheck = urls[urls.length - 1];
        setError(true);

        if (isValidUrl(urlToCheck) && isUniqueUrl(urlToCheck) && urls.length <= 5) {
            setError(false);
            setUrls([...urls, ""]);
        }

    };

    const isValidUrl = (checkUrl) => {
        try {
            new URL(checkUrl);
            return true;
        } catch (err) {
            return false;
        }
    }

    const isUniqueUrl = (checkUrl) => {
        let output = true;

        urls.forEach((url, index) => {
            if (url === checkUrl && index !== (urls.length - 1)) {
                output = false;
            }
        });

        return output;
    }

    // JSX
    // --------------------------------------------------------------------------------------------
    return (
        <form
            className="bg-white m-4 p-4 rounded-md shadow-md w-full md:max-w-[50rem]"
            onSubmit={e => e.preventDefault()}
        >
            <h2 className="pb-4">Please enter URLs below:</h2>

            {/* form inputs */}
            { urls.map((url, index) => (
                <div
                    className="pb-4"
                    key={index}
                >
                    <input
                        aria-label="url"
                        className="border p-2 rounded-md w-full"
                        disabled={startWordCount}
                        id={`url-${index + 1}`}
                        name={`url-${index + 1}`}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Enter full URL"
                        type="url"
                        value={url}
                    />
                </div>
            ))}

            { error &&
                <small className="text-red-500">URL is invalid or duplicated</small>
            }

            { !startWordCount ?
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        {/* add url button */}
                        {urls.length < 5 &&
                            <button
                                className="bg-green-300 p-4 rounded-md"
                                onClick={addUrl}
                                type="button"
                            >
                                Add URL
                            </button>
                        }

                        {/* count words button */}
                        {urls.length > 0 && urls[0] !== "" &&
                            <button
                                className="bg-blue-300 p-4 rounded-md"
                                onClick={handleWordCountStart}
                                type="button"
                            >
                                Count words
                            </button>
                        }
                    </div>

                    <button
                        className="bg-red-300 p-4 rounded-md"
                        onClick={handleStartOver}
                    >
                        Start over
                    </button>

                </div> :

                <button
                    className="bg-red-300 p-4 rounded-md"
                    onClick={handleStartOver}
                >
                    Start over
                </button>
            }
        </form>
    );
}

export default UrlForm;