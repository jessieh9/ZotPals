import React from "react";
import "./ExploreListing.css";
import { Link } from "react-router-dom";

// eventually use props and replace the string inside the require src
export default function ExploreListing() {
  return (
    <Link to="/item_info/2">
      <section className="outerPostBox">
        <section className="innerPostBox">
          <img
            className="postImage"
            src={require("../../images/chopper.jpg")}
            alt="first chopper pic"
          />
          <section className="caption">
            {/* make the item_info below changeable for each loop */}

            <p>
              CHOPPER <br />
              11/14/2022 - 11/21/2022
            </p>
          </section>
        </section>
      </section>
    </Link>
  );
}
