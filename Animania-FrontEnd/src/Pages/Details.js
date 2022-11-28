import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Details(props) {
  const { animeId } = useParams();

  const [detail, setDetail] = useState([]);
  const [watch, setWatch] = useState("");
  useEffect(() => {
    const getDetail = async () => {
      const Detail = await axios
        .get(`https://gogoanime.consumet.org/anime-details/${animeId}`)
        .catch((err) => console.log("Connection Error"));
      setDetail(Detail.data);
      let n = Detail.data.episodesList.length;
      setWatch(Detail.data.episodesList[n - 1].episodeId);
    };
    getDetail();
  }, [animeId]);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`Best site to watch ${detail.animeTitle} English Sub/Dub online Free and download ${detail.animeTitle} English Sub/Dub anime.`}
          charSet="utf-8"
        />
        <meta
          name="keywords"
          content={`${detail.animeTitle} English Sub/Dub, free ${detail.animeTitle} online, watch ${detail.animeTitle} online, watch ${detail.animeTitle} free, download ${detail.animeTitle} anime, download ${detail.animeTitle} free`}
          charSet="utf-8"
        />
        <title>{`Watch ${detail.animeTitle} free on Animania`}</title>
        <link rel="canonical" href={`/anime-detail/${detail.animeTitle}`} />
      </Helmet>
      <div className="container">
        {Object.keys(detail).length !== 0 ? (
          <div className="row all__details">
            <div className="img__detail">
              <div className="item">
                <div className="img-wrap">
                  <img
                    src={detail.animeImg}
                    className="detail__img col"
                    style={{ maxWidth: "250px" }}
                    alt={detail.animeTitle}
                  />
                </div>
              </div>
              <p className="green fw-bold capSize noMargin" align="center">
                {detail.animeTitle}
              </p>
              <p className="green fw-bold capSize noMargin" align="center">
                {detail.otherNames}
              </p>

              <p className="green capSize noMargin" align="center">
                {detail.type}
              </p>
              <p className="green capSize noMargin" align="center">
                {detail.releasedDate}
              </p>
              <div>
                <p className="capSize noMargin" align="center">
                  Total Ep: <span className="green">{detail.releasedDate}</span>
                </p>
              </div>
              <div align="center" className="mt-3" style={{ marginBottom: "5.2rem" }}>
                <Link
                  to={`/vidcdn/watch/${watch}`}
                  state={{ animeID: `${animeId}` }}
                  onClick={() => {
                    props.handelClick();
                  }}
                >
                  <button className="btn btn-success">Watch Now</button>
                </Link>
              </div>
            </div>

            <div className="col align-self-center">
              <p align="center">{detail.synopsis}</p>
              <div className="d-flex">
                <div className="row ms-auto me-auto">
                  {detail.genres?.map((gen) => (
                    <div
                      className="genres_box m-2 py-2"
                      style={{ width: "fit-content" }}
                      key={gen}
                    >
                      {gen}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="title-container">
            <div className="spinner">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" />
              </svg>
            </div>
            <h4 className="title">loading...</h4>
          </div>
        )}
      </div>
    </>
  );
}
