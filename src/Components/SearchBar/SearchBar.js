import React from "react";

const SearchBar = () => {
  const [term, setTerm] = useState("");

  const search = (term) => {
    props.onSearch(term);
  };

  const handleTermChange = (e) => setTerm(e.value);

  return (
    <div className="SearchBar">
      <input
        onChange={handleTermChange}
        placeholder="Enter A Song, Album, or Artist"
      />
      <button className="SearchButton">SEARCH</button>
    </div>
  );
};

export default SearchBar;
