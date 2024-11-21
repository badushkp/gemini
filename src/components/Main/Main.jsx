import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      {/* ------------------------NavBar----------------------- */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} />
      </div>

      {/* -----------------------Maincontainer------------------- */}
      <div className="main-container">
        {/* ---------------------if no Questions asked----------------------- */}
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Badush.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            {/* ----------------------Cards--------------------- */}
            <div className="cards">
              <div className="card">
                <p>
                  Suggest Beautifull places to see on an upcoming road trip ?
                </p>
                <img src={assets.compass_icon} />
              </div>
              <div className="card">
                <p>How can we handle both text and image inputs together ?</p>
                <img src={assets.bulb_icon} />
              </div>
              <div className="card">
                <p>How can we switch between text and image inputs easily ?</p>
                <img src={assets.message_icon} />
              </div>
              <div className="card">
                <p>How do we keep context when using images and text ?</p>
                <img src={assets.code_icon} />
              </div>
            </div>
          </>
        ) : (
          //-----------------Result-Area-----------------
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} />
              {/* --------------------if loading then loader animation comes--------------------- */}
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* --------------------Input-Field-------------------- */}
        <div className="main-button">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} />
              <img src={assets.mic_icon} />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
