import { useState } from "react";
import "./App.css";
import { Carousel } from "./components/Carousel";

function App() {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const data = [
    {
      id: "1",
      title: "Beach Vacation",
      description: "Enjoy a relaxing getaway by the beach.",
      image: "beach.jpg",
    },
    {
      id: "2",
      title: "Mountain Hiking",
      description: "Embark on an adventurous hike in the mountains.",
      image: "mountain.jpg",
    },
    {
      id: "3",
      title: "City Tour",
      description: "Explore the vibrant streets of a bustling city.",
      image: "city.jpg",
    },
    {
      id: "4",
      title: "Cultural Experience",
      description: "Immerse yourself in the rich culture and traditions.",
      image: "culture.jpg",
    },
    {
      id: "5",
      title: "Wildlife Safari",
      description: "Discover exotic wildlife in their natural habitat.",
      image: "safari.jpg",
    },
    {
      id: "6",
      title: "Food Adventure",
      description: "Indulge in a culinary journey of diverse flavors.",
      image: "food.jpg",
    },
  ];
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed bg-black">
      <Carousel cards={data} setSelectedCaseIdx={setSelectedCaseIdx} />
    </div>
  );
}

export default App;
