import axios from "axios";
import React, { useEffect, useState } from "react";

export const File1 = () => {
const [file,makefile]=useState(null);

  useEffect(async () => {
    await axios.post("https.localhost:8000/upload");
  }, []);
const setFile=()=>{
makefile()
}
  return (
    <div>
      <form onSubmit={setFile}>
      <input type="file" />
      <button >Submit</button>
      </form>
    </div>
  );
};
