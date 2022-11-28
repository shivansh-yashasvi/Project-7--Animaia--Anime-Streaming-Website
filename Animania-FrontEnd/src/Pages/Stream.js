import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
// import ReactPlayer from "react-player";

export default function Stream(props) {
  const { episodeId } = useParams();

  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const location = useLocation();
  const animeId = location.state.animeID;
  const [lastwatch, setLastwatch] = useState(null);
  // Localstroage key
  const LOCAL_STORAGE_KEY = "animix-netlify-app";
  useEffect(() => {
    const getVideo = async () => {
      try {
        const Video = await axios.get(
          `https://gogoanime.consumet.org/vidcdn/watch/${episodeId}`
        );
        // const source = Video.data.sources;
        // const first = source[0];
        setData(Video.data.Referer);
      } catch (err) {
        console.log("Connection Error");
      }

    };
    const getDetail = async () => {
      const Detail = await axios
        .get(`https://gogoanime.consumet.org/anime-details/${animeId}`)
        .catch((err) => console.log("Connection Error"));
      const temp = episodeId;
      const ep = Detail.data.episodesList.find(
        ({ episodeId }) => episodeId === temp
      );
      setLastwatch({
        ep: ep.episodeNum,
        title: Detail.data.animeTitle,
        url: window.location.pathname,
        animeId: animeId,
      });

      setDetail(Detail.data);
    };
    getDetail();
    getVideo();
  }, [animeId, episodeId]);

  // useEffect(() => {
  //   console.log(document.getElementsByClassName('show'))
  // }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lastwatch));
  }, [lastwatch]);
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
          content={`${detail.animeTitle} English Sub/Dub, free ${detail.animeTitle} online, watch ${detail.animeTitle} online, watch ${detail.animeTitle} free, download ${detail.animeTitle} anime, download ${detail.animeTitle} free`}
          charSet="utf-8"
        />
        <title>{`Watch ${detail.animeTitle} free on Animania`}</title>
        <link rel="canonical" href={`//vidcdn/watch/${episodeId}`} />
      </Helmet>
      {Object.keys(data).length !== 0 ? (
        <>
          <div className="bg-image" style={{ backgroundImage: `url(${detail.animeImg})` }}></div>
          <div className="container_all" style={{
            backgroundColor: "rgba(0,0,0, 0.4)",
            position: "absolute",
            top: "22%",
            width: "100%",
            paddingBottom: "40.6px"
          }}>
            {/* All Episodes */}
            <div className="all__ep ">
              <p
                className="green"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "800",
                  textTransform: "capitalize",
                }}
              >
                List Of episodes:
              </p>
              <ul className="ep__list">
                {detail.episodesList &&
                  detail.episodesList
                    .slice(0)
                    .reverse()
                    .map((ep) => (
                      <Link
                        to={`/vidcdn/watch/${ep.episodeId}`}
                        state={{ animeID: `${animeId}` }}
                        key={ep.episodeNum}
                      >
                        {ep.episodeId === episodeId ? (
                          <li
                            className="btn__ep even active"
                            style={{ color: "white" }}
                          >
                            <div className="green Anime-ep-num">
                              {ep.episodeNum}
                            </div>
                            <div className="Anime-ep">{ep.episodeId}</div>
                          </li>
                        ) : ep.episodeNum % 2 === 0 ? (
                          <li className="btn__ep even" style={{ color: "white" }}>
                            <div className="green Anime-ep-num">
                              {ep.episodeNum}
                            </div>
                            <div className="Anime-ep">{ep.episodeId}</div>
                          </li>
                        ) : (
                          <li className="btn__ep odd" style={{ color: "white" }}>
                            <div className="green Anime-ep-num">
                              {ep.episodeNum}
                            </div>
                            <div className="Anime-ep">{ep.episodeId}</div>
                          </li>
                        )}
                      </Link>
                    ))}
              </ul>
            </div>

            {/* Video */}
            <div className="video_player m-auto mt-5">
              {/* <ReactPlayer url={data} controls className="reactPlayer" /> */}
              <iframe
                src={data}
                width="100%"
                height="500"
                scrolling="no"
                frameBorder="0"
                allowFullScreen="allowfullscreen"
                webkitallowfullscreen="true"
                title={animeId}
              />
            </div>

            <div className="details"><div className="img__detail">
              <div className="item">
                <div className="img-wrap">
                  <img
                    src={detail.animeImg}
                    className="detail__img col"
                    style={{ maxWidth: "150px" }}
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
            </div>
            </div>
          </div>
        </>
      ) : (
        <div className="title-container">
          <div className="spinner">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" />
            </svg>
          </div>
          <h4 className="title">loading...</h4>
        </div>
      )
      }
    </>
  );
}
