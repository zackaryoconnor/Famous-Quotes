import React, { useEffect, useState } from "react";
import QuotesCard from "./QuotesCard";

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    const fetchData = async () => {
        const url = `http://localhost:3000/quotes`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.error(`Error fetching data`, error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredQuotes =
        selectedCategory === "All Categories"
            ? quotes
            : quotes.filter((quote) => quote.category === selectedCategory);

    const categories = ["All Categories", ...new Set(quotes.map((quote) => quote.category))];

    return (
        <div>
            <div className="mt-8 mx-24">
            <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="mb-4 p-2 border rounded"
            >
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            </div>

            <div className="mx-24 mt-32 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-16">
                {filteredQuotes.map((quote) => (
                    <QuotesCard key={quote._id} quote={quote} />
                ))}
            </div>
        </div>
    );
};

export default Quotes;