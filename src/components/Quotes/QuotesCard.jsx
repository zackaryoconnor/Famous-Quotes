import React, { useState } from "react"
import EditQuoteModal from "../../pages/EditQuote";

const QuotesCard = ({ quote, setQuotes, session={} }) => {
    const hasImage = quote.image !== ""
    const [openEditModal, setOpenEditModal] = useState(false);
    
    return (
      <>
        <EditQuoteModal
          quoteItem={quote}
          setQuotes={setQuotes}
          isOpen={openEditModal}
          onCloseF={(e) => {
            return setOpenEditModal(false);
          }}
        />
        <div className="relative flex flex-col items-center justify-center rounded-xl bg-blue-500 p-8 text-center">
          {hasImage ? (
            <img
              className="h-24 w-24 rounded-full bg-gray-500 object-cover text-sm"
              src={quote.image}
              alt="Image of Author"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl">
              🙂
            </div>
          )}

          <h2 className="mt-4 text-2xl">
            <strong>"{quote.quote}"</strong>
          </h2>
          <p>- {quote.author} -</p>
          <p className="text-sm text-gray-800">{quote.date}</p>
          <p className="mt-4 text-sm text-gray-800">{quote.category}</p>
          {session.id && session.id == quote.user ? (
            <button
              onClick={() => setOpenEditModal(true)}
              className="absolute top-5 left-5 cursor-pointer rounded-lg bg-[#0e256a] p-2 px-4 text-[#00cef4] hover:text-[#1deffa]"
            >
              Edit
            </button>
          ) : (
            <></>
          )}
        </div>
      </>
    );
}

export default QuotesCard