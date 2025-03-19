import React, { useEffect } from "react";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import BookList from "../components/BookList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../features/authorSlice";

// data for stats section
const stats = [
  { id: 1, name: "Books in Our Library", value: "300+" },
  { id: 2, name: "Authors Featured", value: "120+" },
  { id: 3, name: "Books Borrowed Annually", value: "15,000+" },
];

// data for Feature book of the month
const featuredBook = {
  title: "Kobzar",
  author: "Taras Shevchenko",
  description:
    "*Kobzar* is a collection of poetry written by Taras Shevchenko, widely regarded as the father of Ukrainian literature. First published in 1840, *Kobzar* reflects Shevchenko's deep connection to the Ukrainian people, their struggles for freedom, and their rich cultural heritage. The collection includes some of his most famous works, addressing themes such as love, patriotism, and social justice.",
  reasonToRead:
    "This iconic work is not only the cornerstone of modern Ukrainian literature but also a reflection of the enduring spirit of resistance and national identity. *Kobzar* continues to resonate with readers across generations, making it a must-read for anyone interested in world literature and Ukrainian culture.",
  coverImage:
    "https://m.media-amazon.com/images/I/81vQYzzJmKL._AC_UF1000,1000_QL80_.jpg",
};

const Home = () => {
  const dispatch = useDispatch();
  const { items: authors } = useSelector((state) => state.authors);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-6 ">
        <div className="relative isolate lg:px-0">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-10 sm:py-24 lg:py-36">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Discover your next favorite book!
                <a href="/" className="font-semibold text-indigo-600">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Explore the collection <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Curated Book Lists to Enrich Your Mind
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Explore our diverse collection of books, from timeless classics
                to the latest releases. Whether you're looking for inspiration,
                knowledge, or entertainment, our book list has something for
                everyone.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Browse Books
                </a>
                <a href="/" className="text-sm/6 font-semibold text-gray-900">
                  Learn More <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <BookList />

        <section className="my-12 px-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Book of the Month
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center justify-center">
            <img
              src="https://m.media-amazon.com/images/I/81vQYzzJmKL._AC_UF1000,1000_QL80_.jpg"
              alt="Kobzar by Taras Shevchenko"
              className="w-full md:w-1/3 lg:w-1/6 h-auto rounded-lg mb-4 md:mb-0"
            />
            <div className="md:ml-6 flex flex-col justify-center items-center text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">
                {featuredBook.title}
              </h3>
              <a
                href="/"
                className="text-blue-500 font-semibold text-2xl cursor-pointer mb-4"
              >
                by {featuredBook.author}
              </a>
              <p className="text-gray-800 mb-4">{featuredBook.description}</p>
              <p className="text-gray-900 font-bold">
                {featuredBook.reasonToRead}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="mx-auto flex max-w-xs flex-col gap-y-4"
                  >
                    <dt className="text-base/7 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Authors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white  rounded-lg p-6 max-h-96 overflow-y-auto">
              {authors.slice(0, 10).map((author) => (
                <li key={author.id} className="mb-2">
                  <a
                    href="/"
                    className="text-blue-500 underline cursor-pointer"
                  >
                    {author.name}
                  </a>
                </li>
              ))}
            </div>
            {authors.length > 10 && (
              <div className="bg-white rounded-lg p-6 max-h-96 overflow-y-auto">
                {authors.slice(10, 20).map((author) => (
                  <li key={author.id} className="mb-2">
                    <a
                      href="/"
                      className="text-blue-500 underline cursor-pointer"
                    >
                      {author.name}
                    </a>
                  </li>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
