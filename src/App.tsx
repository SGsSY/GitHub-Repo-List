import { useEffect, useState } from "react";
import { getGitHubRepos } from "./service";
import QueryInput from "./components/QueryInput";
import List from "./components/List";
import { ListItemProps } from "./components/ListItem";

function App() {
  const [queryText, setQueryText] = useState("");
  const [list, setList] = useState<ListItemProps[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!queryText) return;
    setIsLoading(true);
    let cancel = false;
    getGitHubRepos(queryText, page)
      .then((res) => {
        if (cancel) return;
        if (!res) return;
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
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [queryText, page]);

  return (
    <div className="app">
      <h1>GitHub Repo List</h1>
      <QueryInput
        handleChange={(text: string) => {
          setQueryText(text);
          setList([]);
        }}
      />
      <List
        list={list}
        isLoading={isLoading}
        scrollCallback={() => {
          setPage((prev) => prev + 1);
        }}
      />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
