import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serviceID, serviceName } from "../../services";
import Navigation from "../components/molecules/Navigation";

const Mycharacter = ({ episodeData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  const [episode, setEpisode] = useState();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [relatedCharacters, setRelatedCharacters] = useState([]);

  useEffect(() => {
    const characterId = router.query.slug;
    if (characterId) {
      serviceName
        .getCharacterByName(characterId)
        .then(({ data }) => {
          setCharacter(data);
          const episodeUrl = data.episode[0];
          return fetch(episodeUrl);
        })
        .then((response) => response.json())
        .then((episodeData) => {
          setEpisode(episodeData);
        })
        .catch((error) => {
          setIsError(true);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [router]);

  useEffect(() => {
    if (character?.name) {
      serviceID
        .getCharacterByID(character.name.split(" ")[0])
        .then(({ data }) => {
          const filtered = data.results.filter((c) => c.id !== character.id);
          setRelatedCharacters(filtered);
        })
        .catch((error) => {
          console.error("Error fetching related characters", error);
        });
    }
  }, [character]);

  if (isLoading) {
    return (
      <>
        <p> Está cargando...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      <div
      onClick={() => router.back()}
      className="flex items-center cursor-pointer group px-6"
    >
      <svg
        fill="#11929b"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 transition-colors group-hover:fill-[#1dbfc9]"
      >
        <path d="M11.17,10.23a33.37,33.37,0,0,0-3.05,3.13c-.51.62-1.28,1.3-1.21,2.17s.81,1.24,1.35,1.76a16.3,16.3,0,0,1,2.57,3.17c.86,1.36,3,.11,2.16-1.26a21.06,21.06,0,0,0-1.82-2.48A16.16,16.16,0,0,0,10,15.52c-.22-.21-.86-1.14-.68-.49l-.13,1a17.85,17.85,0,0,1,3.72-4c1.19-1.08-.58-2.85-1.77-1.76Z"></path>
        <path d="M9.4,17a109.13,109.13,0,0,0,12.53-.1c1.59-.11,1.61-2.61,0-2.5a109.13,109.13,0,0,1-12.53.1c-1.61-.07-1.6,2.43,0,2.5Z"></path>
      </svg>
      <h2 className="text-lg text-[#11929b] transition-colors group-hover:text-[#1dbfc9] ml-2">
        Back
      </h2>
    </div>
      <div className="flex justify-center pt-20">
        <div className="md:flex w-3/4 bg-[#0C7D85] text-white p-6 border border-[#B2DF28] rounded-xl shadow mb-10">
          <div className="flex justify-center">
            <img src={character.image} className="rounded-t-lg" />
          </div>
          <div className="text-center flex justify-center flex-col w-full">
            <h1>{character.name}</h1>
            <p>
              <span className="font-semibold">Origin:</span>{" "}
              {character.origin.name}
            </p>
            <p>
              <span className="font-semibold">First episode:</span>
            </p>
            <p>
              {episode.episode}: {episode.name}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {character.gender}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {character.location.name}
            </p>
            <p>
              <span className="font-semibold">Specie:</span> {character.species}
            </p>
            <div className="flex justify-center w-full mt-2">
              <div
                className={`${
                  character.status === "Alive"
                    ? "alive"
                    : character.status === "Dead"
                    ? "dead"
                    : character.status === "unknown"
                    ? "unknown"
                    : ""
                }`}
              >
                <p>{character.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {relatedCharacters.length > 0 ? (
        <div className="mt-10 px-6">
          <h2 className="text-white text-2xl mb-4 text-center">
            Related characters:
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {relatedCharacters.map((char) => (
              <a
                key={char.id}
                href={`/Character/${char.id}`}
                className="min-w-[200px] bg-[#112] hover:bg-[#11929b] rounded-xl shadow-md p-4 text-white hover:bg-[#1a1a1a]"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full rounded-md mb-2"
                />
                <h3 className="text-lg font-bold">{char.name}</h3>
                <p className="text-sm">
                  {char.species} - {char.status}
                </p>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-white">
          There are not related characters
        </p>
      )}
    </>
  );
};

export default Mycharacter;
