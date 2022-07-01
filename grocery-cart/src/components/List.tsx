import React from 'react'
import { Item } from '../interface/item.interface'
import { FaEdit, FaTrash} from 'react-icons/fa'

interface Props {
    items: Array<Item>,
    removeItem: (id: number) => void,
    editItem: (id: number) => void
}

const List: React.FC<Props> = ({items, editItem, removeItem}) => {
    return <div className="grocery-list">
        {items.map(item => {
            return <article className="grocery-item" key={item.id}>
                <p className="title">{item.title}</p>
                <div className="btn-container">
                    <button className="edit-btn" onClick={() => editItem(item.id)} type='button'>
                        <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={() => removeItem(item.id)} type='button'>
                        <FaTrash />
                    </button>
                </div>
                </article>
            })}
        </div>
}

export default List