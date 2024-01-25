import { useRef, useState } from "react";
import "./App.css";
import { Carousel, FunctionsRefType } from "./components/Carousel";

function App() {
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const data = [
    {
      id: "1",
      title: "Beach Vacation",
      description: "Enjoy a relaxing getaway by the beach.",
      image:
        "https://plus.unsplash.com/premium_photo-1687881775352-9cac69fe3df0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJpZ2h0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["Beach", "Relaxation", "Getaway"],
      routeTo: "some url",
    },
    {
      id: "2",
      title: "Mountain Hiking",
      description: "Embark on an adventurous hike in the mountains.",
      image:
        "https://images.unsplash.com/photo-1485487656106-d6aa01db3271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJyaWdodHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["Mountains", "Adventure", "Hiking"],
    },
    {
      id: "3",
      title: "City Tour",
      description: "Explore the vibrant streets of a bustling city.",
      image:
        "https://images.unsplash.com/photo-1507643179773-3e975d7ac515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHBob3RvZ3JhcGh5JTIwYXJ0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["City", "Exploration", "Vibrant"],
    },
    {
      id: "4",
      title: "Cultural Experience",
      description: "Immerse yourself in the rich culture and traditions.",
      image:
        "https://images.unsplash.com/photo-1603924147107-81e7a2b3051e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHBob3RvZ3JhcGh5JTIwYXJ0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["Culture", "Traditions", "Immersion"],
    },
    {
      id: "5",
      title: "Wildlife Safari",
      description: "Discover exotic wildlife in their natural habitat.",
      image:
        "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBob3RvZ3JhcGh5JTIwYXJ0fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["Wildlife", "Safari", "Nature"],
    },
    {
      id: "6",
      title: "Food Adventure",
      description: "Indulge in a culinary journey of diverse flavors.",
      image:
        "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJyaWdodHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["Food", "Culinary", "Flavors"],
    },
    {
      id: "6",
      title: "Food Adventure",
      description: "Indulge in a culinary journey of diverse flavors.",
      image:
        "https://images.unsplash.com/photo-1487376480913-24046456a727?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJyaWdodHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      tags: ["Food", "Culinary", "Flavors"],
    },
  ];
  const onTitleClickHandler = (card: {
    id: string;
    title: string;
    description: string;
    image: string;
    routeTo?: string;
  }) => {
    console.log("clicked", card);
  };
  const carouselRef = useRef<FunctionsRefType>(null);
  const handleNext = () => {
    carouselRef.current && carouselRef.current.nextCardHandler();
  };
  const handlePrev = () => {
    carouselRef.current && carouselRef.current.prevCardHandler();
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed bg-voilet-50">
      <button
        onClick={handleNext}
        className="w-56 h-24 bg-red-500 "
      >
        Next
      </button>
      <button
        onClick={handlePrev}
        className="w-56 h-24 bg-red-500 "
      >
        Previous
      </button>
      <Carousel
        cardsData={data}
        setSelectedCardIdx={setSelectedCardIdx}
        rotation={false}
        rotationDuration={60}
        tilt={false}
        freeRoam={false}
        freeRoamLowerBounds={-180}
        freeRoamUpperBounds={0}
        onTitleClickHandler={onTitleClickHandler}
        startingAnimation={true}
        rotateOnScroll={true}
        drag={true}
        ref={carouselRef}
      />
      <div className="w-[25%] h-[25%] absolute bottom-12 left-6 flex flex-col font-serif space-y-2">
        {data[selectedCardIdx].tags.map((tag) => (
          <p className="text-5xl text-gray-900">&#x2022; {tag}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
