import { createContext, useState } from "react";
import run from "../config/gimini";

export const Context = createContext();

import React from "react";

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // for delaying the result
  const delayPara = (index, nextword) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextword);
    }, 30 * index);
  };

  // newchat
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    // if we click on the recent chat
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      // ------------------- Calling the Function----------------------
      response = await run(input);
    }

    // splitting the response into array basd on the **
    let responseArray = response.split("**");
    let newResponse = "";

    // Based on indexing the result in joined if odd it is in <b> bold, otherwise normaly.
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 != 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    // removing * and adding new line
    let newResponse2 = newResponse.split("*").join("</br>");

    // add it in to new array by splitting by space
    let newResponseArray = newResponse2.split("");
    // delaying the result with a delay of 75ms for each word. 0-indexed so the first word will be displayed immediately.
    for (let i = 0; i < newResponse2.length; i++) {
      const nextword = newResponseArray[i];
      delayPara(i, nextword + "");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
  };

  return (
    // sending the context to all the childrens.
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
