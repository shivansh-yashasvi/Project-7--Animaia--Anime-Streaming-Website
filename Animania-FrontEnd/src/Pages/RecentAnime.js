import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../img/Spinner.gif";
import Card from "../Components/Card";
import Lastwatch from "../Components/Lastwatch"

import { useFetchInitialData } from "../utils/hooks";

const RecentAnime = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreRecent();
  };
  // useImperativeHandle(ref, () => ({
  //   handelScroll(ele) {
  //     if (ele === "Popular") {
  //       window.scrollTo({
  //         top: popular.current.offsetTop,
  //         behavior: "smooth",
  //       });
  //     }
  //   },
  // }));

  // get lastwatch anime
  const [lastwatch, setLastwatch] = useState(null);
  // Localstroage key
  const LOCAL_STORAGE_KEY = "animix-netlify-app";
  useState(() => {
    const fetchLastWatch = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (fetchLastWatch)
      setLastwatch(fetchLastWatch);
  }, []);

  const { loading, recent, loadMoreRecent } = props;

  useFetchInitialData(loading, recent, loadMoreRecent, ref, window)

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
          content={`watch recent anime online, anime watch online, download recent anime, recent anime in sub/dub, recent anime dub, downlaod anime, watch anime online`}
          charSet="utf-8"
        />
        <title>{`Watch Recent Anime free on Animania`}</title>
        <link rel="canonical" href={`/`} />
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
        <>
          <div className="container__total">
            <div className="container__main row" ref={ref}>
              <h1
                style={{
                  marginTop: "20px",
                  textTransform: "uppercase",
                  fontFamily: "Poppins",
                }}
                align="center"
              >
                Recently Added Anime
              </h1>
              {props.recent &&
                props.recent.map((rec) => (
                  <Card rec={rec} key={rec.episodeId} handelClick={handelClick} />
                ))}
            </div>
            <InfiniteScroll
              dataLength={props.recent.length}
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
          <Lastwatch lastwatch={lastwatch} />
        </>
      )}
    </>
  );
};

export default RecentAnime;
