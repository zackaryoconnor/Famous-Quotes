import React from "react"
import { motion, AnimatePresence } from "motion/react"

const QuotesCard = ({ quote }) => {

    const hasImage = quote.image !== ""

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
        >
            <div layout className="flex flex-col items-center justify-center text-center bg-blue-500 rounded-xl p-8">

                {hasImage ? (
                    <img className="bg-gray-500 text-sm w-24 h-24 object-cover rounded-full" src={quote.image} alt="Image of Author" />
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white text-3xl">🙂</div>
                )}

                <h2 className="mt-4 text-2xl"><strong>"{quote.quote}"</strong></h2>
                <p>- {quote.author} -</p>
                <p className="text-sm text-gray-800">{quote.date}</p>
                <p className="mt-4 text-sm text-gray-800">{quote.category}</p>
            </div>
        </motion.div>
    )
}

export default QuotesCard