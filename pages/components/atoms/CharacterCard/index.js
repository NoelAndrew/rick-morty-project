const CharacterCard=({ img, nombre, location ,species, stat ,index})=>{
    return(
        <div className="charac-container-index border border-gray-200 rounded-lg shadow dark:bg-gray-800" key={index}>
            <div className="p-5">
                <img className="rounded-t-lg" src={img} alt="character"/>
            </div>
            <div className="p-5 text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">
                    {nombre}
                </h5>
                <p className="mb-3 font-normal">
                    {location}
                </p>
                <p className="mb-3">{species}</p>
                <div className="flex justify-center">
                    <div className={`${stat === "Alive" ? "alive" : stat === "Dead" ? "dead" : stat === "unknown" ? "unknown" : "" }`}>
                        <p>{stat}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CharacterCard;