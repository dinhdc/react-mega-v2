import React from "react";
import { Item } from "../interface";
import CharacterItem from "./CharacterItem";

interface Props {
  items: Array<Item>;
}

const CharacterList: React.FC<Props> = ({items}) => {
    return <section className="cards">
        {
            items.map((item) => (
                <CharacterItem key={item.char_id} item={item} />
            ))
      }
  </section>;
};

export default CharacterList;
