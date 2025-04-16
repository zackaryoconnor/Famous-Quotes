import {useEffect, useState} from 'react'

const Game = () => {
    const [quotes, setQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState(null);
    const [authorOptions, setAuthorOptions] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [result, setResult] = useState('')
    


    useEffect(() => {
    const  getQuotes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/quotes`);
            const data = await response.json();
            setQuotes(data)
            if (data.length > 0) {
                pickRandomQuote(data) 
            }
        } catch (err) {
            console.error(`Error fectching data`, err)
        } 
    }
    getQuotes();
    }, [])

    function shuffle(array) {
        let shuffledArray = [];
        while(array.length > 0) {
            let randomIndex = Math.floor(Math.random() * array.length);
            let card = array.splice(randomIndex, 1) [0]; //takes just one at index and leave[0]
            shuffledArray.push(card);
        }
        return shuffledArray;
    }

    const pickRandomQuote = (quotesArray) => {
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        const newQuote = quotesArray[randomIndex];
        setCurrentQuote(newQuote);
        const correctAuthor = newQuote.author
        const allAuthors = [ ...new Set(quotesArray.map((quote) => quote.author))];
        const incorrectAuthor = allAuthors.filter((author) => author !== correctAuthor);
        const shuffledIncorrect = shuffle(incorrectAuthor)
        const shortAuthors = shuffledIncorrect.slice(0, 5)
        const selectedAuthors = [...shortAuthors, correctAuthor];
        const shuffledAuthors = shuffle(selectedAuthors)
        setAuthorOptions(shuffledAuthors)
        setResult('')
        setSelectedAuthor(null)
    }
    const handleGuess = (author) => {
        setSelectedAuthor(author);
        if (author === currentQuote.author) {
            setResult('Correct')
        } else {
            setResult(`Wrong! Correct answer is ${currentQuote.author}`)
        }
    }
    const changeButtonColor = (selectedAuthor, author, correctAuthor) => {
        if (selectedAuthor !== author ) {
            return 'bg-gray hover:bg-dark-gray'
        } 
        return selectedAuthor === correctAuthor ? 'bg-green-800' : 'bg-red-800';
    } 
    console.log(selectedAuthor)
return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray">
        <h1 className="text-center text-6xl mb-8 text-primary drop-shadow-md">Guess The Author</h1>
        <div className="p-6 bg-white rounded-lg shadow-md max-w-lg w-full">
            {currentQuote ? (
                <div className="space-y-2">
                    <p><span className="text-gray-600">Quote:</span> {currentQuote.quote}</p>
                    <p><span className="text-gray-600">Category:</span> {currentQuote.category}</p>
                    <p><span className="text-gray-600">Result:</span> {result}</p>   
                </div>  
                   
            ) : (
                <p>No quote</p>
            )}
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
            {authorOptions.map((author, index) => (
                <div key={index}>
                    <button 
                    onClick={() => handleGuess(author)}
                    disabled={selectedAuthor !== null}
                    className={` mt-10 w-full p-3 rounded-lg text-white font-medium transition-colors
                    ${changeButtonColor(selectedAuthor, author, currentQuote.author)}`}>
                    {author}</button> 
                 </div>
            ))}
        </div>
        <div className='max-w-lg w-full mt-12'>
            <button
            onClick={() => pickRandomQuote(quotes)}
            disabled={selectedAuthor === null }
            className={`bg-info w-full text-white rounded-lg p-3 hover:bg-info-dark`}>
            Next Quote</button>
        </div>
        
    </div>
    
    )
}

export default Game;