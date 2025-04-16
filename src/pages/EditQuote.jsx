import React, { useState, useEffect } from "react";

export default function EditQuoteModal({
  isOpen = true,
  quoteItem = {},
  onClose,
}) {
  const { author, category, quote, date, image_url } = quoteItem;
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  async function onSubmit(e) {
    e.preventDefault();
    const formElement = e.target;
    const author = formElement.author.value;
    const category = formElement.category.value;
    const quote = formElement.quote.value;
    const date = formElement.date.value;
    const image_url = formElement.image_url.value;

    const response = await fetch(
      `http://localhost:3000/quote/${quoteItem.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author,
          category,
          quote,
          date,
          image: image_url,
        }),
      }
    );

    if (response.ok) {
      console.log(await response.json());
    }
  }

  return (
    isOpen && (
      <modal className="p-4 bg-black/50 fixed w-screen h-screen  overflow-y-auto">
        <form
          onSubmit={onSubmit}
          className="bg-gray-200 p-10 rounded-lg w-2xl max-w-full mx-auto flex flex-col gap-2"
        >
          {/* Title */}
          <h2 className="text-center text-3xl font-semibold">Edit Quote</h2>
          <hr className="opacity-50 w-[40%] self-center"></hr>
          <div id="inputs" className="flex flex-col gap-2">
            {/* Author */}
            <label className="block font-semibold">Author:</label>
            <input
              required
              name="author"
              className="border-gray-400 block border-2 p-2 rounded-lg w-full bg-gray-100 h-10"
              placeholder="e.g, John Doe"
              defaultValue={author}
            ></input>
            {/* Category */}
            <label className="block font-semibold">Category:</label>
            <select
              required
              name="category"
              className="border-gray-400 block bg-gray-100 h-10 border-2 rounded-lg"
              defaultValue={category}
            >
              {[
                "Motivation",
                "Wisdom",
                "Humor",
                "Philosophy",
                "Movie",
                "Other",
              ].map((category) => (
                <option>{category}</option>
              ))}
            </select>
            {/* Quote */}
            <label className="block font-semibold">Quote:</label>
            <textarea
              required
              name="quote"
              className="min-h-20 border-gray-400 block border-2 p-2 rounded-lg w-full bg-gray-100 h-10"
              placeholder={`e.g, "When life gives you lemons"`}
              defaultValue={quote}
            ></textarea>
            {/* Date */}
            <label className="block font-semibold">Date:</label>
            <input
              name="date"
              type="text"
              className="border-gray-400 block border-2 p-2 rounded-lg w-full bg-gray-100 h-10"
              placeholder="e.g, 04/15/2025"
              defaultValue={date}
            ></input>
            {/* Image */}
            <label className="block font-semibold">Image URL (optional):</label>
            <input
              name="image_url"
              className="border-gray-400 block border-2 p-2 rounded-lg w-full bg-gray-100 h-10"
              placeholder="e.g., https://example.com/image.jpg"
              defaultValue={image_url}
            ></input>
          </div>
          <button
            type="submit"
            className="text-white mt-4 bg-blue-500 rounded-lg h-11"
          >
            Update Quote
          </button>
        </form>
      </modal>
    )
  );
}
