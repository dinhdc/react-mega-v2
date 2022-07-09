import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import SearchBar from "./components/SearchBar";
import axios from "./api";
import { Item } from "./interface";
import Spinner from "./components/Spinner";

const App = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const results = await axios.get(`characters?name=${query}`);
      setItems(results.data);
      setLoading(false);
    };
    fetchItems();
  }, [query]);


  return (
    <div className="App">
      <Navbar />
      <SearchBar setQuery={(query: string) => setQuery(query)} />
      {loading ? <Spinner /> : <CharacterList items={items} />}
    </div>
  );
};

export default App;
