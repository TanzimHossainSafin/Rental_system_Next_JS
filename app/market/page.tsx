import axios from "axios";

interface MarketItem {
  id: string;
  location: string;
  price: number;
  ownername: string;
}

export default async function Market() {
  const response = await axios.get("http://localhost:3000/api/market");
  const marketData: MarketItem[] = response.data;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Marketplace Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {marketData.map((item) => (
          <div
            key={item.id}
            className="bg-[#1e293b] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.location}</h2>
            <p className="text-gray-300 mb-1">💰 Price: <span className="font-medium text-white">${item.price}</span></p>
            <p className="text-gray-400">👤 Owner: {item.ownername}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
