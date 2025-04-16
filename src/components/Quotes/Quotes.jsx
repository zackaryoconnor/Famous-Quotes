import React, { useEffect, useState } from "react";
import QuotesCard from "./QuotesCard";
import { motion, AnimatePresence } from "motion/react"

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
        <div className="bg-gray-300">

            <div className="pt-32 mx-24">
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

                <p className="text-gray-700 text-sm mb-6">
                    Showing {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? "s" : ""} in{' '}
                    <span className="font-semibold italic">
                        {selectedCategory === "All Categories" ? "All Categories" : `"${selectedCategory}"`}
                    </span>
                </p>


            </div>

            <motion.div
                layout
                className="mx-24 my-8 pb-32 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">

                <AnimatePresence>
                    {filteredQuotes.map((quote) => (
                        <QuotesCard key={quote._id} quote={quote} />

                    ))}
                </AnimatePresence>
            </motion.div>

        </div>
    );
};

export default Quotes;