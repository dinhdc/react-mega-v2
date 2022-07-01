import React from "react";
import {PhotoInterface} from "../interface/photo.interface";

const Photo: React.FC<PhotoInterface> = ({urls, alt_description, likes, user}) => {
    return (
        <article className="photo">
            <img src={urls.regular} alt={alt_description} />
            <div className="photo-info">
                <div>
                    <h4>{user.name}</h4>
                    <p>{likes}</p>
                </div>
                <a href={user.portfolio_url}>
                    <img src={user.profile_image.medium} className="user-img" alt="" />
                </a>
            </div>
        </article>
    );
};
export default Photo;