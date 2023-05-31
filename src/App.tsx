import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getGitHubRepos } from "./service";
import QueryInput from "./components/QueryInput";

function App() {
  const [count, setCount] = useState(0);
  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    if (!queryText) return;
    getGitHubRepos(queryText).then((res) => {
      console.log(res);
    });
  }, [queryText]);

  return (
    <>
      <h1>GitHub Repo List</h1>
      <QueryInput
        handleChange={(text: string) => {
          console.log(text);
          setQueryText(text);
        }}
      />
    </>
  );
}

export default App;
