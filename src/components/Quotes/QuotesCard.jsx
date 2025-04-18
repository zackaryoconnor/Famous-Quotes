import React, { useState } from "react"
import EditQuoteModal from "../../pages/EditQuote";
import { motion, AnimatePresence } from "motion/react"


const QuotesCard = ({ quote, setQuotes, session }) => {
    const hasImage = quote.image !== ""
    const [openEditModal, setOpenEditModal] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
        >

            <div layout className="relative flex flex-col items-center justify-center text-center bg-white rounded-xl p-8 shadow-md min-h-[450px] w-full">

                <EditQuoteModal
                    quoteItem={quote}
                    setQuotes={setQuotes}
                    isOpen={openEditModal}
                    onCloseF={(e) => {
                        return setOpenEditModal(false);
                    }}
                />



                {hasImage ? (
                    <img className="bg-gray-500 text-sm w-24 h-24 object-cover rounded-full" src={quote.image} alt="Image of Author" />
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-300 text-3xl">🙂</div>
                )}

                <h2 className="mt-4 text-2xl"><strong>"{quote.quote}"</strong></h2>
                <p>- {quote.author} -</p>
                <p className="text-sm text-gray-800">{quote.date}</p>
                <p className="mt-4 text-sm text-gray-800">{quote.category}</p>
                {/* Edit Button */}
                {session && session.id == quote.user ? (
                    <button
                        onClick={() => setOpenEditModal(true)}
                        className="absolute top-5 left-5 cursor-pointer rounded-lg border- p-2 px-4 text-black hover:text-secondary hover:underline "
                    >
                        Edit
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </motion.div>
    )
}

export default QuotesCard