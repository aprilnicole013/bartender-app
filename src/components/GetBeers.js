import React, { useEffect, useState } from "react";

const defaultBeer = {
  price: "",
  name: "",
  rating: {
    average: 0,
    reviews: 0,
  },
  image:
    "https://www.totalwine.com/media/sys_master/cmsmedia/hff/h0e/8979036078110.png",
  id: "",
};

const GetBeers = () => {
  const [beers, setBeers] = useState([]);
  const [newBeerNameInput, setNewBeerNameInput] = useState("");
  const [newBeerPriceInput, setNewBeerPriceInput] = useState("");
  const [newBeerRating, setNewBeerRating] = useState("0");
  const [changeBeerName, setChangeBeerName] = useState("");
  const [flight, setFlight] = useState([]);

  //Get beer data on page load
  useEffect(() => {
    async function getAllBeers() {
      const res = await fetch("https://api.sampleapis.com/beers/ale");
      const beerData = await res.json();
      setBeers(beerData);
    }

    getAllBeers();
  }, []);

  const addBeerToMenu = (e) => {
    e.preventDefault();
    const currentBeerList = [...beers];
    const newBeer = defaultBeer;
    if (newBeerNameInput.length > 0 && newBeerPriceInput > 0) {
      newBeer["name"] = newBeerNameInput;
      newBeer["price"] = "$" + parseFloat(newBeerPriceInput).toFixed(2);
      newBeer["rating"] = {
        average: newBeerRating,
        reviews: 1,
      };
      currentBeerList.push(newBeer);
      setBeers([newBeer, ...beers]);
      setNewBeerNameInput("");
      setNewBeerPriceInput("");
      setNewBeerRating("0");
    }
  };

  const removeBeerFromMenu = (beer) => {
    const currentBeerList = [...beers];
    const newBeerList = currentBeerList.filter((item) => item.name !== beer);
    setBeers(newBeerList);
  };

  const handleChangeBeerName = (beer) => {
    const updatedBeer = beer;
    if (changeBeerName.length > 0) {
      updatedBeer["name"] = changeBeerName;

      const currentBeerList = [...beers];
      const newBeerList = currentBeerList.filter((item) => {
        if (item.name !== beer.name) {
          return item;
        } else {
          return updatedBeer;
        }
      });

      setBeers(newBeerList);
      setChangeBeerName("");
    }
  };

  const addToFlight = (beer) => {
    const flightList = [...flight];
    const requestedFlight = [beer, ...flightList];
    if (requestedFlight.length < 7) {
      setFlight(requestedFlight);
      console.log(requestedFlight);
    } else {
      alert("Flight is full!");
    }
  };

  return (
    <div>
      <form>
        <input
          placeholder="Beer Name"
          className="beer-input"
          value={newBeerNameInput}
          onChange={(e) => setNewBeerNameInput(e.target.value)}
        />
        <input
          placeholder="Beer Price"
          className="beer-input"
          value={newBeerPriceInput}
          onChange={(e) => setNewBeerPriceInput(e.target.value)}
        />
        <select
          id="beer-rating"
          value={newBeerRating}
          onChange={(e) => setNewBeerRating(e.target.value)}
        >
          <option value="0">Please rate this beer</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={addBeerToMenu}>Add Beer</button>
      </form>
      <h2>Beer Menu</h2>
      <div className="flight-box">
        <h3>Flight Selection</h3>
        <ol>
          {flight.map((beer, index) => (
            <li key={"inflight-" + index}>{beer.name}</li>
          ))}
        </ol>
      </div>

      {beers.map((beer, index) => (
        <div key={"beer" + index}>
          <ul>
            {beer.name}
            {beer.price} Rating: {parseFloat(beer.rating.average).toFixed()}
            <img src={beer.image} alt={beer.name} />
          </ul>
          <button onClick={() => addToFlight(beer)}>Add to flight</button>
          <button onClick={() => removeBeerFromMenu(beer.name)}>
            Remove from menu
          </button>
          <button onClick={() => handleChangeBeerName(beer)}>Edit Name</button>
          <input
            type="text"
            value={changeBeerName}
            onChange={(e) => setChangeBeerName(e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default GetBeers;
