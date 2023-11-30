const CharacterCard=({ img, nombre, location ,species, stat ,index})=>{
    return(
        <div className="charac-container-index bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={index}>
            <div className="p-5">
                <img className="rounded-t-lg" src={img} alt="character"/>
            </div>
            <div className="p-5 text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {nombre}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {location}
                </p>
                <p>{species}</p>
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