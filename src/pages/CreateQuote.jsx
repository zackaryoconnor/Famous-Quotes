import React, { useState } from 'react';

const CreateQuote = (props) => {
    const [newQuotes, setNewQuotes] = useState([])
    const [formCreate, setFormCreate] = useState({
        author: '',
        category: '',
        quote: '',
        date: '',
        image: ''
      });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                author: formCreate.author,
                category: formCreate.category,
                quote: formCreate.quote,
                date: formCreate.date || 'unknown',
                image: formCreate.image,
                user: props.session.id
            })
        })
        const newQuoteMade = await response.json();
        setNewQuotes([...newQuotes, newQuoteMade])
        setFormCreate({author: '', 
            category: '', 
            quote: '', 
            date: '', 
            image: ''})
    }
    const handleChange = (event) => {
        setFormCreate({...formCreate, [event.target.name]: event.target.value})
      };
      console.log(props)
 return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-300">
    <div className="mt-10 w-full max-w-2xl p-6 bg-gray-100 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Quote</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label className="font-medium mb-1">Author:</label>
                <input
                type="text"
                name="author"
                value={formCreate.author}
                onChange={handleChange}
                placeholder="Author"
                required className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-medium mb-1">Category:</label>
                <select
                name="category"
                value={formCreate.category}
                onChange={handleChange}
                placeholder="Category"
                required className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select a category</option>
                    <option value="Motivation">Motivation</option>
                    <option value="Wisdom">Wisdom</option>
                    <option value="Humor">Humor</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Movie">Movie</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="font-medium mb-1">Quote:</label>
                <textarea
                name="quote"
                value={formCreate.quote}
                onChange={handleChange}
                placeholder="Enter the quote"
                required className="p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            </div>
            <div className="flex flex-col">
                <label className="font-medium mb-1">Date:</label>
                <input 
                type="text"
                name="date"
                value={formCreate.date}
                onChange={handleChange}
                placeholder="e.g 2023 or Unknown"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-medium mb-1">Image URL (optional):</label>
                <input
                type="text"
                name="image"
                value={formCreate.image}
                onChange={handleChange}
                placeholder="e.g., https://example.com/image.jpg"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        <button 
        type='submit'
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >Add Quote</button>
        </form>
        {newQuotes.length > 0 && (
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Your Added Quote:</h3>
                {newQuotes.map((quote, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-sm mb-4 border">
                       <p><span className="text-gray-600">Author:</span> {quote.author}</p>
                       <p><span className="text-gray-600">Quote:</span> {quote.quote}</p>
                       <p><span className="text-gray-600">Category:</span> {quote.category}</p>
                       <p><span className="text-gray-600">Date:</span> {quote.date}</p> 
                       {quote.image && (
                        <p><span className="text-gray-600">Image:</span> <img 
                        src={quote.image} 
                        alt="Quote"
                        className="max-w-[200px] rounded-md mt-1"
                        /></p>
                       )}
                    </div>
                ))}
            </div>
        )}
    </div>
  </div>  
 )
}
export default CreateQuote;