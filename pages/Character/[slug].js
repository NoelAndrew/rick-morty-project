import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serviceName } from "../../services";
import Navigation from "../components/molecules/Navigation";

const Mycharacter = ({ episodeData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [character, setCharacter] = useState(null);
    const [episode, setEpisode] = useState();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const characterId  = router.query.slug
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
        if (isLoading) {
            return <><p> Está cargando...</p></>
        }

        if (isError) {
            return <><p>{error}</p></>
        }

    
return (
    <>
    <Navigation/>
    <div className="flex justify-center pt-20">
        <div className="charac-container block p-6 bg-white border border-gray-200 rounded-lg shadow mb-10">
            <div className="flex justify-center">
                <img src={character.image} className="rounded-t-lg"/>
            </div>
            <div>
                {console.log(episode)}
                <h1>{character.name}</h1>
                <p><span className="font-semibold">Origin:</span> {character.origin.name}</p>
                <p><span className="font-semibold">First episode:</span></p> 
                <p>{episode.episode}: {episode.name}</p>
                <p><span className="font-semibold">Gender:</span> {character.gender}</p>
                <p><span className="font-semibold">Location:</span> {character.location.name}</p>
                <p><span className="font-semibold">Specie:</span> {character.species}</p>
                <div className={`${character.status === "Alive" ? "alive" : character.status === "Dead" ? "dead" : character.status === "unknown" ? "unknown" : "" }`}>
                    <p>{character.status}</p>
                </div>
            </div>
        </div>
    </div>
    </>
)

};

export default Mycharacter;
  
