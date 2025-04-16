import React, { useEffect, useState } from "react"

const Home = () => {
    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState([])

   useEffect(() => {
    const  getQuotes = async () => {
        try {
            const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
            const response = await fetch(`${api_url}/quotes`);
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray">
            <h1 className=" text-center text-6xl mb-8 text-primary drop-shadow-md">Welcome to QuoteFolio</h1>
            <div className=" p-6 bg-white rounded-lg shadow-md max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Your Random Quote</h2>
                    <div className=" space-y-2">
                        <img src={randomQuote.image || 'https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg'} 
                        alt=""
                        className={`transition-all duration-100 ease-in-out rounded-md mb-2 mx-auto h-[300px]`}/> 
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
