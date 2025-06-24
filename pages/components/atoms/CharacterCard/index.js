import Image from "next/image";

const CharacterCard = ({ img, nombre, location, species, stat, index }) => {
  return (
    <div
      className="w-full lg:w-[300px] max-w-sm border bg-[#0C7D85] border-[#B2DF28] rounded-lg shadow overflow-hidden "
      key={index}
    >
      <div className="relative w-full h-[300px]">
        <Image
          className="object-cover"
          src={img}
          alt="character"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 text-center">
        <h5 className="truncate text-xl font-bold text-white">{nombre}</h5>
        <p className="text-sm truncate text-gray-200">{location}</p>
        <p className="text-sm text-gray-300 mb-2">{species}</p>
        <div className="flex justify-center">
          <span
            className={`px-3 py-2 text-xs rounded-xl ${
              stat === "Alive"
                ? "bg-green-500 text-white"
                : stat === "Dead"
                ? "bg-red-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {stat}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
