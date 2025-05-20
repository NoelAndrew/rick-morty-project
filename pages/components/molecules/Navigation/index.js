import { serviceID } from '@/services';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);

  const listRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await serviceID.getCharacterByID(searchTerm);
      setSearchResults(response.data.results);
      setIsListOpen(true);
    } catch (error) {
      console.error('Error al buscar personajes:', error);
      setSearchResults([]);
    }
  };

  const closeList = () => {
    setIsListOpen(false);
  };

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      closeList();
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setIsListOpen(false);
      setSearchResults([]);
      return;
    }

    handleSearch();
  }, [searchTerm]);

  return (
    <header className="flex items-center justify-between bg-gray-800 text-sm text-white py-4 px-4">
      <div className="flex items-center" ref={listRef}>
        <div className="mr-4">
          <Link href={"/"}>
            <img src="/images/logo.png" width={100} height={40} alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col w-64 min-w-0 mr-5 bg-gray-700 rounded">
          <div>
            <input
              type="text"
              placeholder="Search character..."
              value={searchTerm}
              onChange={handleChange}
              className="h-8 w-full px-2 bg-transparent border-0 outline-none"
            />
          </div>
          {isListOpen && (
            <div className="result-list overflow-y-auto max-h-40 mt-2 absolute mt-8 bg-gray-700">
              <ul>
                {searchResults.map((result) => (
                  <Link key={result.id} href={`../../Character/${result.id}`} onClick={closeList}>
                    <li key={result.id}>
                      <div className="flex p-2">
                        <div className="mr-3">
                          <img src={result.image} width={30} height={30} />
                        </div>
                        <div>{result.name}</div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
