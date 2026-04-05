import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";

const Home = () => {
  const Data = useLoaderData().slice(0, 8);

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* Hero Section */}
      <div
        className="hero min-h-[50vh] rounded-lg overflow-hidden shadow-lg"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/DfN7MtF4/janko-ferlic-sf-L-QOnmy00-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-gradient-to-r from-black/70 to-blue-900/40 p-8 flex items-center">
          <div className="text-white space-y-3">
            <p className="text-sm tracking-widest text-blue-200">
              PRIORITY SERVICE
            </p>
            <h1 className="font-bold text-4xl leading-tight drop-shadow-lg">
              Fastest Library-to- <br /> Door Delivery
            </h1>
            <p className="text-base max-w-lg">
              Get your favorite books delivered to your doorstep in record time
              with our new express fleet.
            </p>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {Data.map((singledata) => (
          <Link
            key={singledata?._id?.toString()}
            to={`/Bookdetails/${singledata?._id?.toString()}`}
          >
            <div className="card bg-base-100 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 h-[420px] flex flex-col">
              {/* Fixed image container */}
              <figure className="flex-shrink-0 h-56 flex items-center justify-center bg-gray-100">
                <img
                  src={singledata.image_url}
                  alt={singledata.title}
                  className="max-h-full max-w-full object-contain rounded-t-lg"
                />
              </figure>

              {/* Card body */}
              <div className="card-body flex flex-col justify-between">
                <div>
                  <h2 className="card-title text-lg font-semibold line-clamp-2">
                    {singledata.title}
                  </h2>
                  <h1 className="text-sm text-gray-600">{singledata.author}</h1>
                </div>
                <Link
                  to={`/Bookdetails/${singledata?._id?.toString()}`}
                  className="btn btn-primary w-full mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>

<section className="bg-base-200 py-16">
  <h2 className="text-center font-bold text-blue-500 text-2xl mb-2">Our Coverage</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
    {[
      { icon: "📚", text: "500+ Books Available" },
      { icon: "👩‍🏫", text: "100+ Librarians" },
      { icon: "😊", text: "10K+ Happy Members" },
      { icon: "🚚", text: "Nationwide Delivery" },
    ].map((item, i) => (
      <div key={i} className="card bg-base-100 shadow-md text-center p-6">
        <div className="text-4xl mb-2">{item.icon}</div>
        <p className="font-semibold">{item.text}</p>
      </div>
    ))}
  </div>
</section>

      {/* Why Choose Section */}
      <div className="mt-16">
        <div>
          <h1 className="text-center font-bold text-blue-500 text-2xl mb-2">
            Why Choose Book Courier
          </h1>
          <p className="text-center mb-8 text-gray-600">
            We bridge the gap between you and knowledge, making library access
            as easy as ordering pizza.
          </p>
        </div>


        <div className="flex flex-wrap justify-center gap-6">
          <div className="card bg-base-100 shadow-sm w-80 hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="card-body">
              <h3 className="text-center font-bold text-blue-400 flex items-center justify-center gap-2">
                🚚 Same Day Delivery
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Request before 2 PM and get your books delivered the same
                evening. We value your reading time.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm w-80 hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="card-body">
              <h3 className="text-center font-bold text-blue-400 flex items-center justify-center gap-2">
                📦 Secure Handling
              </h3>
              <p className="text-sm text-gray-700 mt-2">
                Our couriers are trained to handle books with care. Weather-proof
                packaging ensures pristine condition.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm w-80 hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="card-body">
              <h2 className="text-center font-bold text-blue-400 flex items-center justify-center gap-2">
                📍 Real-time Tracking
              </h2>
              <p className="text-sm text-gray-700 mt-2">
                Track your book’s journey from the library shelf to your front
                door with our live GPS integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
