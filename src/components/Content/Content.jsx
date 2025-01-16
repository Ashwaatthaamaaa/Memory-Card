import '../../styles/content.css'
import { useState, useEffect } from 'react';

export default function Content({currScore,setCurrScore,bestScore,setBestScore}){
    const n = 9; // Number of cards to render
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [cards,setCards] = useState([]);
    const[over,setOver] = useState(0);
    let arr = [];






    async function getCharacters() {
        try{
          const response = await fetch(`https://api.jikan.moe/v4/characters?order_by=favorites&sort=desc`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          let sorted = sortAndLimitByFavorites(data.data,9);
          console.log(sorted)
          console.log('ran 1 time')
          const urls = sorted.map((character) => ({url:character.images.webp.image_url,id:character.mal_id,isClicked:'false'}));
          console.log(urls)
          setCards(urls);
          // console.log([urls])
        }
      catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    }
    
    
      function sortAndLimitByFavorites(array, limit, order = "desc") {
        return array
          .sort((a, b) => {
            if (order === "desc") {
              return b.favorites - a.favorites; // Descending order
            } else {
              return a.favorites - b.favorites; // Ascending order
            }
          })
          .slice(0, limit); // Limit results to 'n' objects
      }





      const handleClick=(id,isClicked)=>{




        if (isClicked === 'false') {
          // Update the clicked card's status
          setCards((prevCards) =>
              prevCards.map((card) =>
                  card.id === id ? { ...card, isClicked: 'true' } : card
              )
          );
  
          // Shuffle after state updates
          setCards((prevCards) => shuffleArray([...prevCards]));
          setCurrScore(currScore+1);
      } else {
        if(currScore>bestScore){
          setBestScore(currScore);
        }
        setCurrScore(0);
        setOver(over === 0 ? 1 : 0);
        alert('done');
          
      }




        // if(e.target.dataset.click=='false'){
        //   e.target.setAttribute("data-click", "true");
        //   const shuffled =shuffleArray(cards);
        //   console.log(shuffled);
        //   setCards(shuffled);
        // }else{
        //   alert('DONE');
        // }
    }




  
    useEffect(()=>{
      getCharacters()
    },[over])

    function shuffleArray(array) {
      const shuffledArray = [...array]; // Create a copy to avoid mutating the original array
      for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
      }
      return shuffledArray;
  }



    return(
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="cards">
                {cards.length > 0 ? (
                    cards.map((character,index) => (
                        <img key={index} src={character.url} onClick={()=>handleClick(character.id,character.isClicked)} data-click={character.isClicked} />
                    ))
                ) : (
                    <div>No cards available</div>
                )}
                </div>
            )}  2
        </>
    )
}

// function Card({src,handleClick,dataIsClick}){

//     return(
//         <>
//               <img             
//               src={src}
//             className="card"
//             onClick={handleClick}
//             style={{ cursor: "pointer" }}
//             alt="Character"
//             data-click={dataIsClick}
//             >

//             </img>
//         </>
//     )
// }