import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Lastwatch = (props) => {
  const [isActivelw, setIsActivelw] = useState(true);
  const handleCloseLastwatch = () => {
    setIsActivelw(current => !current);
    if (isActivelw === true)
      document.getElementsByClassName("lastwatch")[0].style.width = "10px"
    else
      document.getElementsByClassName("lastwatch")[0].style.width = "100%"
  }

  return (<>
    {props.lastwatch !== null ?
      <div className="lastwatch active" >
        <div className={isActivelw ? "" : 'deactiveLw'}>
          <p className="my-1" style={{ fontSize: "15px" }}>
            Continue watching:
          </p>

          <Link
            to={props.lastwatch.url}
            state={{ animeID: `${props.lastwatch.animeId}` }}
          >
            <div
              className="d-flex row"
              style={{
                alignItem: "center",
              }}
            >
              <p className="d-flex" style={{ fontSize: "20px" }}>
                <i className="bi bi-caret-right-square-fill me-2" />
                <span style={{ color: "#cae962", fontWeight: "bold" }}>
                  {props.lastwatch?.title}
                </span>
                &nbsp;&nbsp;Ep: {props.lastwatch?.ep}
              </p>
            </div>

          </Link>
        </div>
        <div className="switchLw d-flex">
          {
            isActivelw === true ?
              <i
                className="bi bi-x-lg lastwatchClose"
                onClick={handleCloseLastwatch}
              /> : <i className="bi bi-caret-right-fill lastwatchOpen" onClick={handleCloseLastwatch} />
          }
        </div>

      </div> : null
    }
  </>
  );
};

export default Lastwatch;
