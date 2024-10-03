import React, { useState, useEffect } from 'react';

import { ReactComponent as ArrowDownIcon } from "./../../assets/icons/arrow-down.svg";
import { ReactComponent as ArrowUpIcon } from "./../../assets/icons/arrow-up.svg";
import { ReactComponent as LoaderIcon } from "./../../assets/icons/loader.svg";

function UrlCard({ index, url }) {
    const [isLoading, setLoading] = useState(false);
    const [words, setWords] = useState([]);
    const [wordsWithoutCommon, setWordsWithoutCommon] = useState([]);
    const [singleWords, setSingleWords] = useState({});
    const [twoWords, setTwoWords] = useState({});

    const [showTop10, toggleTop10] = useState(false);
    const [wordType, setWordType] = useState("one-word");

    // Runs on load
    useEffect(() => {
        const fetchInnerText = async () => {
            try {
                setLoading(true);
                const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';

                const response = await fetch(proxyUrl + url);  // use proxy server to get around cors
                const htmlText = await response.text();  // get html text
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');

                const cleanText = doc.body.innerText
                    .trim()  // remove leading and trailing spaces
                    .toLowerCase()  // convert to lowercase
                    .replace(/[^a-z\s]/g, '')  // remove special characters
                    .replace(/\s+/g, ' ');  // replace multiple space with single space

                const words = cleanText.split(" ");  // put every word in array

                const common = ["the", "on", "and", "a", "in", "of", "from", "to", "at", "this", "is"] ;  // common words to filter out

                const wordsWithoutCommon = words.filter(word => !common.includes(word));

            setWords([...words]);
            setWordsWithoutCommon([...wordsWithoutCommon]);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchInnerText();
     }, [url]);

    const countSingleWords = () => {
        let wordsDensity = {};

        // Group words together
        wordsWithoutCommon.forEach(word => {
            if (word) {
                wordsDensity[word] = (wordsDensity[word] || 0) + 1;  // create new entry or if it exists, add 1 to tally
            }
        })

        // sort from largest to smallest then slice top 10
        const sortedWordsDensity = Object.entries(wordsDensity).sort((a, b) => b[1] - a[1]);
        const top10 = sortedWordsDensity.slice(0, 10);

        setSingleWords({...top10});
    }

    const countTwoWords = () => {
        let phrasesDensity = {};
        let phrases = [];

        // form 2 word phrases
        for (let i = 0; i < words.length - 1; i++) {
            if (wordsWithoutCommon[i] && wordsWithoutCommon[i + 1]) {
                phrases.push(wordsWithoutCommon[i] + ' ' + wordsWithoutCommon[i + 1]);
            }
        }

        // Group phrases together
        phrases.forEach(phrase => {
            phrasesDensity[phrase] = (phrasesDensity[phrase] || 0) + 1;
        });

        // sort from largest to smallest then slice top 10
        const sortedPhrases = Object.entries(phrasesDensity).sort((a, b) => b[1] - a[1]);
        const top10 = sortedPhrases.slice(0, 10);

        setTwoWords({...top10})
    }

    const handleToggleTop10 = () => {
        toggleTop10(showTop10 => !showTop10);

        // start the word grouping depending on type
        if (wordType === "one-word") {
            countSingleWords();
        } else {
            countTwoWords();
        }
    };

    const handleWordType = (type) => {
        return () => {
            if (type === "two-words" && Object.keys(twoWords).length === 0) {
                countTwoWords();
            }
            setWordType(type)
        }
    };

    // JSX
    // --------------------------------------------------------------------------------------------
    return (
        <article className={`bg-white p-4 rounded-md text-center shadow-md w-full md:w-[50rem]`}>
            <h2 className="bg-white border-2 border-gray-100 break-words font-bold mb-4 p-4 rounded-md">
                {url}
            </h2>

            <div className="flex justify-center">
                { isLoading ? <LoaderIcon/> :
                    <div>
                        <p className="text-6xl">{ words.length }</p>
                        <p className="pb-4">Word count</p>
                    </div>
                }
            </div>

            <button
                className="border-2 border-gray-100 mb-4 p-4 rounded-md w-full"
                onClick={handleToggleTop10}
            >

                <div className="flex justify-between">
                    <p>View top 10 keywords</p>

                    { showTop10 ? <ArrowDownIcon/> : <ArrowUpIcon/>}
                </div>
            </button>

            { showTop10 && <aside className="cursor-pointer flex mb-4">
                <p
                    className={"border-2 border-gray-100 p-2 rounded-l-md" + (wordType === "one-word" ? " bg-blue-100" : "")}
                    onClick={handleWordType("one-word")}
                >
                    1 word
                </p>

                <p
                    className={"border-2 border-gray-100 p-2 rounded-r-md" + (wordType === "two-words" ? " bg-blue-100" : "")}
                    onClick={handleWordType("two-words")}
                >
                    2 words
                </p>
            </aside>}

            { Object.keys(singleWords).length !== 0 && wordType === "one-word" && showTop10 &&
                <aside className="bg-white border-2 border-gray-100 rounded-md">
                    <div className="border-b-4 border-gray-100 flex font-bold p-4 text-left">
                        <p className="w-full">Keyword</p>
                        <p className="w-full">Density</p>
                    </div>

                {Object.entries(singleWords).map(([key, value]) => (
                    <div
                        key={key}
                        className="border-b-2 border-gray-100 flex p-4 text-left"
                    >
                        <p className="w-full">{value[0]}</p>
                        <p className="w-full">{value[1]}</p>
                    </div>
                ))}
                </aside>
            }

            { Object.keys(twoWords).length !== 0 &&
                wordType === "two-words" &&
                showTop10 &&
                <aside className="bg-white border-2 border-gray-100 rounded-md">
                    <div className="border-b-4 border-gray-100 flex font-bold p-4 text-left">
                        <p className="w-full">Keyword</p>
                        <p className="w-full">Density</p>
                    </div>

                { Object.entries(twoWords).map(([key, value]) => (
                    <div
                        key={key}
                        className="border-b-2 border-gray-100 flex p-4 text-left"
                    >
                        <p className="break-words w-full">{value[0]}</p>
                        <p className="w-full">{value[1]}</p>
                    </div>
                ))}
                </aside>
            }
        </article>
    );
}

export default UrlCard;