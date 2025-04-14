import React from "react"

const QuotesCard = ({ quote }) => {
    return (
        <>
            <div>
                <img src={ quote.image } alt="Image of Author" />
                <h3>{ quote.author }</h3>
                <p>{ quote.quote }</p>
                <p>{ quote.date }</p>
                <p>{ quote.category }</p>
            </div>
        </>
    )
}

export default QuotesCard