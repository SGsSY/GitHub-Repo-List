import { useEffect, useState } from "react";
import { getGitHubRepos } from "./service";
import QueryInput from "./components/QueryInput";
import List from "./components/List";
import { ListItemProps } from "./components/ListItem";

function App() {
  const [queryText, setQueryText] = useState("");
  const [list, setList] = useState<ListItemProps[]>([]);

  useEffect(() => {
    if (!queryText) return;
    getGitHubRepos(queryText).then((res) => {
      console.log(res);
      const { data } = res;
      const { items: repos } = data;
      const list = repos.map(
        (repo): ListItemProps => ({
          id: repo.id,
          name: repo.name,
          author: repo.owner?.login || "",
          description: repo.description || "",
        })
      );
      setList((prev) => prev.concat(list));
    });
  }, [queryText]);

  return (
    <div className="app">
      <h1>GitHub Repo List</h1>
      <QueryInput
        handleChange={(text: string) => {
          console.log(text);
          setQueryText(text);
        }}
      />
      <List list={list} />
    </div>
  );
}

export default App;
