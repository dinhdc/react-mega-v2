import React, {FormEvent, useState} from "react";

interface Props {
  setQuery(query: string): void;
}

const SearchBar: React.FC<Props> = ({ setQuery }) => {

    const [text, setText] = useState('')
    
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
        setQuery(e.currentTarget.value);   
    }

  return (
    <div>
      <section>
        <form>
          <input
            type="text"
            placeholder="Search Characters"
            autoFocus
            className="form-control"
            name="search"
            value={text}
            onChange={handleChange}
            id="search"
          />
        </form>
      </section>
    </div>
  );
};

export default SearchBar;
