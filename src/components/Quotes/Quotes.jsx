import React, { useEffect, useState } from "react"
import QuotesCard from "./QuotesCard"

const Quotes = () => {

    const [quotes, setQuotes] = useState([])


    const fetchData = async () => {
        const url = `http://localhost:3000/quotes`

        try {
            const response = await fetch(url)
            const data = await response.json()
            setQuotes(data)
        } catch (error) {
            console.error(`Error fectching data`, error)
        }
    }




    useEffect(() => {
        fetchData()
    }, [])




    return (
        <div className="mx-24 my-32 grid grid-cols-3 gap-16">
            { quotes.map((quote) => (
                <QuotesCard key={ quote._id } quote={ quote } />
                
            ))}
        </div>
    )
}

export default Quotes