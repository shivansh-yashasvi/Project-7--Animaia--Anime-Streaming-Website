import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  function makeBold(input, wordsToBold) {
    var re = new RegExp(wordsToBold, "g");
    return input.replace(re, "<b>" + wordsToBold + "</b>");
  }
  return (
    <>
      <div
        className="card__main card m-2"
        style={{ display: "inline-block" }}
        onClick={() => props.handelClick()}
      >
        <Link to={`/anime-detail/${props.rec.animeId}`}>
          <img
            src={props.rec.animeImg}
            className="card__Img card-img-top rounded"
            alt={props.rec.animeId}
          />
          <div className="card-body row">
            <h5
              className="card-title hiddentext"
              align="center"
              dangerouslySetInnerHTML={{
                __html: makeBold(props.rec.animeTitle, "Dub"),
              }}
            />
            {props.ep !== "false" ? (
              <p className="card-text mt-auto" align="center">
                Ep No: {props.rec.episodeNum}
              </p>
            ) : null}
          </div>
        </Link>
      </div>
    </>
  );
}
