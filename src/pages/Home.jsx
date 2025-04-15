import React, { useEffect, useState } from "react"

const Home = () => {
const [quotes, setQuotes] = useState([]);
const [randomQuote, setRandomQuote] = useState(null)

   useEffect(() => {
    const  getQuotes = async () => {
        const response = await fetch(`http://localhost:3000/quotes`);
        const data = await response.json();
        setQuotes(data)
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randomIndex])
        }
    }
    getQuotes();
   }, [])

    return(
        <h1>HomePage </h1>
    )
    
}
export default Home;