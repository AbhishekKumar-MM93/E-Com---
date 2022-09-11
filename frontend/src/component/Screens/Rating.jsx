import React, { useState } from "react";

function Rating({ value, text, color }) {
  // const [star, setStar] = useState(value)
  //   const updateStar = (el) => {
  //     setStar(el + 1);
  //   }

  //   const renderStars = (value) => {
  //     let stars = []
  //     for (let i = 0; i < 5, i++){
  //       star.push()

  //     }
  //   }

  return (
    <div className="my-2">
      <i
        style={{ color }}
        className={
          value > 1
            ? "fas fa-star"
            : value >= 0.5
            ? "fas fa-star-half-stroke"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          value > 2
            ? "fas fa-star"
            : value >= 1.5
            ? "fas fa-star-half-stroke"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          value > 3
            ? "fas fa-star"
            : value >= 2.5
            ? "fas fa-star-half-stroke"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          value > 4
            ? "fas fa-star"
            : value >= 3.5
            ? "fas fa-star-half-stroke"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          value >= 5
            ? "fas fa-star"
            : value >= 4.5
            ? "fas fa-star-half-stroke"
            : "far fa-star"
        }
      ></i>
      <span>{text}</span>
    </div>
  );
}

Rating.defaultProps = {
  color: "skyBlue",
};

export default Rating;
