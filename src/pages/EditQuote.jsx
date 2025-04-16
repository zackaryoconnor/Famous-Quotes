import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function EditQuoteModal({
  isOpen = true,
  quoteItem = {},
  setQuotes = () => {},
  onCloseF = () => {},
  className="",
}) {
  const { author, category, quote, date, image: image_url } = quoteItem;
  const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden"); // This disables scrolling for the body
    } else {
      document.body.classList.remove("overflow-hidden"); // This enables scrolling for the body
    }
  }, [isOpen]);

  async function makeRequestTo(url, method = "GET", body = {}) {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
      }),
    });

    return response;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const formElement = e.target;
    const author = formElement.author.value;
    const category = formElement.category.value;
    const quote = formElement.quote.value;
    const date = formElement.date.value;
    const image_url = formElement.image_url.value;

    const response = await makeRequestTo(
      `${api_url}/quote/${quoteItem._id}`,
      "PUT",
      {
        author,
        category,
        quote,
        date,
        image: image_url,
      },
    );

    if (response.ok) {
      const { updatedQuote } = await response.json();
      setQuotes((prev) =>
        prev.map((item) => {
          return (item._id == updatedQuote._id && updatedQuote) || item;
        }),
      );
      onCloseF(e);
    } else {
      console.log(response);
    }
  }

  async function onDelete(e) {
    const response = await makeRequestTo(
      `${api_url}/quote/${quoteItem._id}`,
      "DELETE",
    );

    if (response.ok) {
      document.body.classList.remove("overflow-hidden"); // This enables scrolling for the body
      setQuotes((prev) => prev.filter((item) => item._id !== quoteItem._id));
      onCloseF(e);
    } else {
      console.log(response);
    }
  }

  // TODO: Add some error handling (if we revisit).

  return (
    isOpen &&
    createPortal(
      <div id="modal" className={`${className} fixed top-0 h-screen w-screen overflow-y-auto`}>
        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="relative z-20 mx-auto mt-10 flex w-md max-w-full flex-col gap-2 rounded-lg border-2 bg-gray-200 p-4 text-gray-700 shadow-lg"
        >
          {/* Title */}
          <h2 className="text-center text-3xl font-semibold">Edit Quote</h2>
          <div id="inputs" className="flex flex-col gap-2">
            {/* Author */}
            <label className="block font-semibold">Author:</label>
            <input
              required
              name="author"
              className="block h-10 w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-2 focus:outline-gray-600"
              placeholder="e.g, John Doe"
              defaultValue={author}
            ></input>
            {/* Category */}
            <label className="block font-semibold">Category:</label>
            <select
              required
              name="category"
              className="block h-10 rounded-lg border-2 border-gray-400 bg-gray-100 focus:outline-gray-600"
              defaultValue={category}
            >
              {[
                "Motivation",
                "Wisdom",
                "Humor",
                "Philosophy",
                "Movie",
                "Other",
              ].map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
            {/* Quote */}
            <label className="block font-semibold">Quote:</label>
            <textarea
              required
              name="quote"
              className="block h-10 min-h-20 w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-2 focus:outline-gray-600"
              placeholder={`e.g, "When life gives you lemons"`}
              defaultValue={quote}
            ></textarea>
            {/* Date */}
            <label className="block font-semibold">Date:</label>
            <input
              name="date"
              type="text"
              className="block h-10 w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-2 focus:outline-gray-600"
              placeholder="e.g, 04/15/2025"
              defaultValue={date}
            ></input>
            {/* Image */}
            <label className="block font-semibold">Image URL (optional):</label>
            <input
              name="image_url"
              className="block h-10 w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-2 focus:outline-gray-600"
              placeholder="e.g., https://example.com/image.jpg"
              defaultValue={image_url}
            ></input>
          </div>
          {/* Update */}
          <button
            type="submit"
            className="mt-4 h-11 cursor-pointer rounded-lg bg-green-700 text-white hover:text-purple-100"
          >
            Update Quote
          </button>

          {/* Delete */}
          <button
            type="button"
            className="mt-4 h-11 cursor-pointer rounded-lg bg-red-500 text-white hover:text-purple-100"
            onClick={onDelete}
          >
            Delete
          </button>
          {/* Exit */}
          <button
            type="button"
            className="mx-auto mt-4 h-11 max-h-9 w-1/4 cursor-pointer rounded-lg bg-gray-500 text-white hover:text-purple-100"
            onClick={onCloseF}
          >
            Exit
          </button>
        </form>
        {/* Black Background */}
        <div
          onClick={(e) => {
            onCloseF(e);
          }}
          className="fixed top-0 z-0 size-full bg-black/50"
        ></div>
      </div>,
      document.getElementById("root"),
    )
  );
}
