import { useState } from "react";
import "./texttranslator.css";
import { useEffect } from "react";
let TRANSLATOR = () => {
  const [language, setLanguage] = useState([]);
  const [source, setSource] = useState("af");
  const [target, setTarget] = useState("af");
  const [sourceLang, setSourceLang] = useState("");
  const [translate, setTranslate] = useState("");

  const urls = "https://text-translator2.p.rapidapi.com/getLanguages";
  const optionss = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aa82370828msh874016d7efbebd4p16d68djsn412ab6e2a397",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
  };

  let getLanguage = async () => {
    try {
      const response = await fetch(urls, optionss);
      const result = await response.json();
      setLanguage(result.data.languages);
    } catch (error) {
      console.error(error);
    }
  };

  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "aa82370828msh874016d7efbebd4p16d68djsn412ab6e2a397",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: source,
      target_language: target,
      text: sourceLang,
    }),
  };

  let translatetext = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.status == "success") {
        setTranslate(result.data.translatedText);
      } else {
        setTranslate(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  return (
    <div className="cont">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Language Transalator
        </span>
      </h1>
      <div className="inputs">
        <div className="source">
          <h4 class="text-3xl font-bold dark:text-black">Source Language : </h4>
          <select
            onChange={(e) => setSource(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {language.map((Element, index) => (
              <option key={index} value={Element.code}>
                {Element.name}
              </option>
            ))}
          </select>
        </div>

        <div className="target">
          <h4 class="text-3xl font-bold dark:text-black">Target Language : </h4>
          <select
            onChange={(e) => setTarget(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {language.map((Element, index) => (
              <option key={index} value={Element.code}>
                {Element.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your message here..."
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        ></textarea>
      </div>
      <div className="translated_text">
        <p class="mb-3 mt-3 text-lg text-gray-500 md:text-xl dark:text-black-400 border-solid border-2 border-sky-500">
          {translate}
        </p>
      </div>
      <button
        onClick={() => {
          if (sourceLang == "") {
            alert("Input Box is empty!");
          } else {
            translatetext();
            setSourceLang("");
          }
        }}
        type="button"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Translate
      </button>
    </div>
  );
};

export default TRANSLATOR;
