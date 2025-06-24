'use client';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "../../atoms/CharacterCard";
import { fetchCharacters } from "@/features/characteres/characterSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { entities, ids, page, loading, hasMore } = useSelector(
    (state) => state.characters
  );
  const [showBackToTop, setShowBackToTop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const nearBottom = scrollTop + clientHeight >= scrollHeight - 100;
      if (nearBottom && !loading && hasMore) {
        dispatch(fetchCharacters(page));
      }

      setShowBackToTop(scrollTop > 300);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, page, hasMore]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="h-[90vh] overflow-y-auto overflow-x-hidden w-full max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ids.map((id, index) => {
            const character = entities.characters[id];
            return (
              <a key={id} href={`../../Character/${id}`}>
                <CharacterCard
                  img={character.image}
                  nombre={character.name}
                  location={character.location.name}
                  species={character.species}
                  stat={character.status}
                  index={id}
                />
              </a>
            );
          })}
        </div>

        {loading && (
          <p className="text-center my-5 text-white">Loading...</p>
        )}
        {!hasMore && (
          <p className="text-center my-5">There are no characters left</p>
        )}

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-8 z-50 bg-[#00B5CC] hover:bg-[#2779bd] text-white px-4 py-2 rounded-2xl shadow-xl transition-opacity duration-300"
          >
            Back to Start
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
