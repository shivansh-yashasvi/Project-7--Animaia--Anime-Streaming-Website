import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Components/Card";
import spinner from "../img/Spinner.gif";

import { useFetchInitialData } from "../utils/hooks";

const DubAnime = (props, ref) => {
  const clientRef = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreDub();
  };

  const { loading, recent, loadMoreDub } = props;

  useFetchInitialData(loading, recent, loadMoreDub, clientRef, window)

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`Best site to watch Anime English Sub/Dub online Free and download Anime English Sub/Dub anime.`}
          charSet="utf-8"
        />
        <meta
          name="keywords"
          content={`Watch Dub anime online, Dub anime watch online, download dub anime, Anime in english, Anime dub in english`}
          charSet="utf-8"
        />
        <title>{`Watch Dub Anime free on Animania`}</title>
        <link rel="canonical" href={`/dub-anime`} />
      </Helmet>
      {Object.keys(props.recent).length === 0 ? (
        <div className="title-container">
          <div className="spinner">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" />
            </svg>
          </div>
          <h4 className="title">loading...</h4>
        </div>
      ) : (
        <div className="container__total">
          <div className="container__main row" ref={clientRef}>
            <h1
              style={{
                marginTop: "20px",
                textTransform: "uppercase",
                fontFamily: "Poppins",
              }}
              align="center"
            >
              Recently Added <b>DUB</b> Anime
            </h1>

            {props.recent.map((rec) => (
              <Card rec={rec} key={rec.episodeId} handelClick={handelClick} />
            ))}
          </div>
          <InfiniteScroll
            dataLength={props.recent.length}
            next={loadMore}
            hasMore={true}
            loader={<img src={spinner} alt="spinner" width="50px" />}
          ></InfiniteScroll>
          <hr
            style={{
              color: "white",
              height: "2px",
              width: "80%",
              margin: "20px auto",
              marginBottom: "5.2rem",
            }}
          />
        </div>
      )}
    </>
  );
};

export default DubAnime;
