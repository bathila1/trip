import { createContext, useContext, useState } from "react";

export const destinationContext = createContext();
export const useDestinationContext = () => useContext(destinationContext);

const DestinationContext = ({ children }) => {
  //sample array of destination objects
  const destinations = [
    {
      id: 1,
      name: "Ella Rock",
      shortDescription: "Scenic hike with beautiful views.",
      longDescription:
        "Ella Rock is one of Sri Lanka’s most stunning viewpoints.",
      imageUrl: "https://picsum.photos/900/600?random=1",
      rating: 4.7,
      location: { latitude: 6.865, longitude: 81.0468 },
      isFavorite: false,
      category: "hills",
    },
    {
      id: 2,
      name: "Sigiriya",
      shortDescription: "Historic rock fortress.",
      longDescription:
        "Sigiriya is an ancient rock fortress located in the central province.",
      imageUrl: "https://picsum.photos/900/600?random=2",
      rating: 4.9,
      location: { latitude: 7.957, longitude: 80.7603 },
      isFavorite: false,
      category: "historical",
    },
    {
      id: 3,
      name: "Mirissa",
      shortDescription: "Relaxing beach with whale watching.",
      longDescription:
        "Mirissa offers one of the most beautiful beaches in Sri Lanka.",
      imageUrl: "https://picsum.photos/900/600?random=3",
      rating: 4.8,
      location: { latitude: 5.9485, longitude: 80.4716 },
      isFavorite: false,
      category: "beaches",
    },
    {
      id: 4,
      name: "Nuwara Eliya",
      shortDescription: "Sri Lanka’s little England.",
      longDescription: "Known for its cool climate and tea plantations.",
      imageUrl: "https://picsum.photos/900/600?random=4",
      rating: 4.6,
      location: { latitude: 6.9497, longitude: 80.7891 },
      isFavorite: false,
      category: "hills",
    },
    {
      id: 5,
      name: "Unawatuna",
      shortDescription: "Beach paradise for snorkeling.",
      longDescription:
        "Unawatuna is one of Sri Lanka’s most iconic coastal areas.",
      imageUrl: "https://picsum.photos/900/600?random=5",
      rating: 4.5,
      location: { latitude: 6.0131, longitude: 80.2468 },
      isFavorite: false,
      category: "beaches",
    },
    {
      id: 6,
      name: "Kandy",
      shortDescription: "Cultural capital of Sri Lanka.",
      longDescription: "Home to the Temple of the Tooth Relic.",
      imageUrl: "https://picsum.photos/900/600?random=6",
      rating: 4.8,
      location: { latitude: 7.2906, longitude: 80.6337 },
      isFavorite: false,
      category: "cultural",
    },
    {
      id: 7,
      name: "Haputale",
      shortDescription: "Underrated hill country escape.",
      longDescription: "Haputale is known for tea estates and misty views.",
      imageUrl: "https://picsum.photos/900/600?random=7",
      rating: 4.7,
      location: { latitude: 6.7657, longitude: 80.9635 },
      isFavorite: false,
      category: "hills",
    },
    {
      id: 8,
      name: "Bentota",
      shortDescription: "Beach + water sports heaven.",
      longDescription: "Bentota is famous for water sports.",
      imageUrl: "https://picsum.photos/900/600?random=8",
      rating: 4.4,
      location: { latitude: 6.4204, longitude: 79.9956 },
      isFavorite: false,
      category: "beaches",
    },
    {
      id: 9,
      name: "Arugam Bay",
      shortDescription: "Top surfing beach in Sri Lanka.",
      longDescription: "Arugam Bay has international recognition for surfing.",
      imageUrl: "https://picsum.photos/900/600?random=9",
      rating: 4.8,
      location: { latitude: 6.8433, longitude: 81.8304 },
      isFavorite: false,
      category: "wildlife",
    },
    {
      id: 10,
      name: "Jaffna",
      shortDescription: "Northern cultural and historical hub.",
      longDescription: "Jaffna offers unique cuisine and northern culture.",
      imageUrl: "https://picsum.photos/900/600?random=10",
      rating: 4.3,
      location: { latitude: 9.6615, longitude: 80.0255 },
      isFavorite: false,
      category: "cultural",
    },
  ];

  // const [destinations, setDestinations] = useState([]);

  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Beaches" },
    { id: 2, name: "Hills" },
    { id: 3, name: "Cultural" },
    { id: 4, name: "Wildlife" },
    { id: 5, name: "Historical" },
  ];

  //getting added favorite destinations
  const [favorites, setFavorites] = useState([]);

  // -----ALL FUCNTIONS RELATED TO FAVORITES DESTINATIONS-----
  //adding fasvorite destination to the array
  function addToFavorites(destination) {
    setFavorites((favorites) => [...favorites, destination]);
  }

  //removing favorite destination from the array
  function removeFromFavorites(destination) {
    setFavorites(favorites.filter((fav) => fav.id !== destination.id));
  }

  //checking whether a destination is favorite or not(returns boolean)
  function isFavorite(destination) {
    return favorites.some((fav) => fav.id === destination.id);
  }
  // -----ALL FUCNTIONS RELATED TO FAVORITES DESTINATIONS-----

  //-----ALL FUNCTIONS RELATED TO FILTERING DESTINATIONS BY CATEGORY-----
  const [selectCategory, setSelectCategory] = useState("All");
  const [filteredDestinations, setFilteredDestinations] = useState([
    ...destinations,
  ]);

  function destinationByCategory(category) {
    setSelectCategory(category);
    if (category !== "All") {
      setFilteredDestinations(
        destinations.filter(
          (destination) => destination.category === category.toLowerCase(),
        ),
      );
    } else {
      setFilteredDestinations(destinations);
    }
  }
  //-----ALL FUNCTIONS RELATED TO FILTERING DESTINATIONS BY CATEGORY-----

  const value = {
    destinations,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    categories,
    destinationByCategory,
    filteredDestinations,
    selectCategory,
    // setDestinations
  };

  return (
    <destinationContext.Provider value={value}>
      {children}
    </destinationContext.Provider>
  );
};

export default DestinationContext;
