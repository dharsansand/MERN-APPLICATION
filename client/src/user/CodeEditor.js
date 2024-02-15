import React, { useState, useEffect } from "react";
import ace from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "./CodeEditor.css";
import axios from "axios";

const CodeEditor = () => {
  const [editor, setEditor] = useState(null); // Initialize editor state as null

  useEffect(() => {
    const newEditor = ace.edit("editor");
    newEditor.setTheme("ace/theme/monokai");
    newEditor.session.setMode("ace/mode/c_cpp");
    setEditor(newEditor); // Store the editor object in state
  }, []);

  const [language, setLanguage] = useState("c");

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    if (editor) {
      if (selectedLanguage === "c" || selectedLanguage === "cpp")
        editor.session.setMode("ace/mode/c_cpp");
      else if (selectedLanguage === "php")
        editor.session.setMode("ace/mode/php");
      else if (selectedLanguage === "python")
        editor.session.setMode("ace/mode/python");
      else if (selectedLanguage === "node")
        editor.session.setMode("ace/mode/javascript");
    }
  };
  const [input, setInputValue] = useState();
  const executeCode = async () => {
    const input = document.getElementById("inputField").value;
    try {
      const response = await axios.post(
        "http://localhost:8000/ide/app/compile",
        {
          language: language,
          code: editor.getSession().getValue(),
          input1: input,
        }
      );

      const data = response.data;
      document.querySelector(".output").textContent = data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app">
      <div className="code-editor">
        <div className="header"> Placement Online IDE </div>
        <div className="control-panel">
          Select Language: &nbsp; &nbsp;
          <select className="languages" onChange={changeLanguage}>
            <option value="c"> C </option>
            <option value="cpp"> C++ </option>
            <option value="php"> PHP </option>
            <option value="python"> Python </option>
            <option value="node"> Node JS </option>
          </select>
        </div>
        <div className="editor" id="editor"></div>
        <div className="button-container">
          <button className="btn" onClick={executeCode}>
            Run
          </button>
        </div>
        <div className="output"></div>
        <div className="input-section">
          <h2>Enter Input:</h2>
          <textarea
            type="text"
            id="inputField"
            placeholder="Enter input..."
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
      <button>Run</button>
    </div>
  );
};

export default CodeEditor;
