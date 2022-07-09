import React from "react";
import { Item } from "../interface";

interface Props {
  item: Item;
}

const CharacterItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={item.img} alt="character" />
        </div>
        <div className="card-back">
          <h1>{item.name}</h1>
          <ul>
            <li>
              Actor Name: <strong>{item.portrayed}</strong>
            </li>
            <li>
              Nick Name: <strong>{item.nickname}</strong>
            </li>
            <li>
              Birthday: <strong>{item.birthday}</strong>
            </li>
            <li>
              <strong>Status: </strong>
              <span
                style={{
                  color: item.status === "Alive" ? "green" : "red",
                }}
              >
                {item.status}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
