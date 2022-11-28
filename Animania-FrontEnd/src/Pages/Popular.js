import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../img/Spinner.gif";
import Card from "../Components/Card";

import { useFetchInitialData } from "../utils/hooks";

const Popular = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMorePopular();
  };

  const { loading, popular, loadMorePopular } = props;

  useFetchInitialData(loading, popular, loadMorePopular, ref, window)

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
          content={`watch Popular anime online, popular anime watch online, download popular anime, popular anime in sub/dub, popular anime dub`}
          charSet="utf-8"
        />
        <title>{`Watch Popular Anime free on animix.netlify.app`}</title>
        <link rel="canonical" href={`/popular`} />
      </Helmet>
      {Object.keys(props.popular).length === 0 ? (
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
          <div className="container__main row Popular" ref={ref}>
            <h1
              style={{
                marginTop: "20px",
                textTransform: "uppercase",
                fontFamily: "Poppins",
              }}
              align="center"
            >
              Popular Anime
            </h1>
            {props.popular.map((rec) => (
              <Card
                rec={rec}
                key={rec.animeId}
                handelClick={handelClick}
                ep="false"
              />
            ))}
          </div>
          <InfiniteScroll
            dataLength={props.popular.length}
            next={loadMore}
            hasMore={true}
            loader={<img src={spinner} alt="spinner" width="50px" />}
          ></InfiniteScroll>
          {/* <button
            className="btn btn-primary ms-auto me-auto mt-3"
            align="center"
            style={{ width: "fit-content" }}
            onClick={loadMore}
          >
            Load More
          </button> */}
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

export default Popular;
