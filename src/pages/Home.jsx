import React, { useEffect, useState } from "react"

const Home = () => {
const [quotes, setQuotes] = useState([]);
const [randomQuote, setRandomQuote] = useState([])

   useEffect(() => {
    const  getQuotes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/quotes`);
            const data = await response.json();
            setQuotes(data)
            if (data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomQuote(data[randomIndex])
            }
        } catch (err) {
            console.error(`Error fectching data`, err)
        }
        
    }
    getQuotes();
   }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <h1 className=" text-center text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-md">Welcome to QuoteFolio</h1>
            <div className="p-6 bg-white rounded-lg shadow-md max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Your Random Quote</h2>
                <div className="space-y-2">
                    {randomQuote.image && (
                        <img src={randomQuote.image} 
                    alt="Quote"
                    className="max-w-[300px] h-auto rounded-md mb-2 mx-auto"/>
                    )}
                    <p><span className="text-gray-600">Quote:</span> {randomQuote.quote}</p>
                    <p><span className="text-gray-600">Author:</span> {randomQuote.author}</p>
                    <p><span className="text-gray-600">Date:</span> {randomQuote.date}</p>
                    <p><span className="text-gray-600">Category:</span> {randomQuote.category}</p> 
                </div>
            </div>
        </div>
    )
    
}
export default Home;
