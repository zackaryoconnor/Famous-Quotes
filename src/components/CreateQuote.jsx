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
 return (
    <div className="create-quote">
        <form onSubmit={handleSubmit}>
            <div>
                <label>Author:</label>
                <input
                type="text"
                name="author"
                value={formCreate.author}
                onChange={handleChange}
                placeholder="Author"
                required
                />
            </div>
            <div>
                <label>Category:</label>
                <select
                name="category"
                value={formCreate.category}
                onChange={handleChange}
                placeholder="Category"
                required
                >
                    <option value="" disabled>Select a category</option>
                    <option value="Motivation">Motivation</option>
                    <option value="Wisdom">Wisdom</option>
                    <option value="Humor">Humor</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Love">Love</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label>Quote:</label>
                <textarea
                name="quote"
                value={formCreate.quote}
                onChange={handleChange}
                placeholder="Enter the quote"
                required
          />
            </div>
            <div>
                <label>Date:</label>
                <input
                type="text"
                name="date"
                value={formCreate.date}
                onChange={handleChange}
                placeholder="e.g 2023 or Unknown"
                />
            </div>
            <div>
                <label>Image URL (optional):</label>
                <input
                type="text"
                name="image"
                value={formCreate.image}
                onChange={handleChange}
                placeholder="e.g., https://example.com/image.jpg"
                />
            </div>
        <button type='submit'>Add Quote</button>
        </form>
        {newQuotes.length > 0 && (
            <div>
                <h3>Your Added Quote:</h3>
                {newQuotes.map((quote, index) => (
                    <div key={index}>
                       <p><strong>Author:</strong> {quote.author}</p>
                       <p><strong>Quote:</strong> {quote.quote}</p>
                       <p><strong>Category:</strong> {quote.category}</p>
                       <p><strong>Date:</strong> {quote.date}</p> 
                       {quote.image && (
                        <p><strong>Image:</strong> <img src={quote.image} alt="Quote image"/></p>
                       )}
                    </div>
                ))}
            </div>
        )}
    </div>
 )
}
export default CreateQuote;