import { useEffect, useState } from "react";
import { getGitHubRepos } from "./service";
import QueryInput from "./components/QueryInput";
import InfiniteScrollList from "./components/InfiniteScrollList";
import { ListItemProps } from "./components/ListItem";

function App() {
  const [queryText, setQueryText] = useState("");
  const [list, setList] = useState<ListItemProps[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [requestAfterError, setRequestAfterError] = useState(0);

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
        setIsError(false);
      })
      .catch((err) => {
        alert(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [queryText, page, requestAfterError]);

  return (
    <div className="app">
      <h1>GitHub Repo List</h1>
      <QueryInput
        handleChange={(text: string) => {
          setQueryText(text);
          setList([]);
        }}
      />
      <InfiniteScrollList
        list={list}
        isLoading={isLoading}
        scrollCallback={() => {
          setPage((prev) => prev + 1);
        }}
        isError={isError}
        errorCallback={() => {
          setRequestAfterError((prev) => prev + 1);
        }}
      />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
