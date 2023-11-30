"use client"
import { useState, useEffect } from 'react';
import { serviceList } from '../../../services';
import CharacterCard from '../../atoms/CharacterCard';

const Dashboard = () => {
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const characterList = async (page) => {
        try {
            const response = await serviceList.getList(page);
            setCurrentItems(response.data.results);
        } catch (error) {
            console.error('Error fetching character data: ', error);
        }
    };

    useEffect(() => {
        characterList(currentPage);
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentItems.map((character, index) => (
                    <a key={character.id} href={`../../Character/${character.id}`}>
                        <CharacterCard 
                            img={character.image}
                            nombre={character.name}
                            location={character.location.name}
                            species={character.species}
                            stat={character.status}
                            index={index}
                        />
                    </a>
                ))}
            </div>
            <div className="mt-5">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="button">Previous</button>
                <button onClick={() => paginate(currentPage + 1)} className="button">Next</button>
            </div>
        </>
    );
};

export default Dashboard;
