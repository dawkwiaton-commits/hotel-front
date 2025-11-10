import HeaderSection from "@/app/components/common/HeaderSection";

interface PriceItem {
  title: string;
  season: string;
  price: string;
}

const priceList: PriceItem[] = [
  { title: "Dom z bali - weekend", season: "Sezon niski", price: "400 zł / noc" },
  { title: "Dom z bali - weekend", season: "Sezon wysoki", price: "600 zł / noc" },
  { title: "Dom z bali - tydzień", season: "Sezon niski", price: "2000 zł / tydzień" },
  { title: "Dom z bali - tydzień", season: "Sezon wysoki", price: "3000 zł / tydzień" },
  { title: "Dodatkowe łóżko", season: "cały rok", price: "100 zł / noc" },
];

export default function CennikPage() {
  return (
    <div className="w-full">
      {/* Nagłówek z większym paddingiem top/bottom */}
      <section className="w-full py-12 md:py-20 px-6 md:px-16 max-w-5xl mx-auto">
        <HeaderSection
          title="Cennik"
          className="text-3xl md:text-5xl z-10 text-center"
          color="black"
        />
        <p className="text-lg md:text-xl text-gray-700 text-center">
          Poniżej znajdziesz nasze ceny w zależności od sezonu. Chcesz zarezerwować? Skontaktuj się z nami!
        </p>
      </section>

      {/* Tabela z mniejszymi paddingami */}
      <section className="w-full py-4 md:py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 md:p-4 text-left border-b border-gray-300">Usługa</th>
                <th className="p-2 md:p-4 text-left border-b border-gray-300">Sezon</th>
                <th className="p-2 md:p-4 text-left border-b border-gray-300">Cena</th>
              </tr>
            </thead>
            <tbody>
              {priceList.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 md:p-4 border-b border-gray-300">{item.title}</td>
                  <td className="p-2 md:p-4 border-b border-gray-300">{item.season}</td>
                  <td className="p-2 md:p-4 border-b border-gray-300">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
