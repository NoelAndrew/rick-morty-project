import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serviceName } from "../../services";
import Navigation from "../components/molecules/Navigation";

const Mycharacter = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [character, setcharacter] = useState(null);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const characterId  = router.query.slug
        if (characterId) {
            serviceName.getCharacterByName(characterId)
            .then(({ data }) => {
                setcharacter(data);
            })
            .catch((error) => {
                setIsError(true);
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
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
                <img src={character.image} />
            </div>
            <div>
                <h1>{character.name}</h1>
                <p><span className="font-semibold">Origin:</span> {character.origin.name}</p>
                <p><span className="font-semibold">First episode:</span> {character.episode[0]}</p>
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