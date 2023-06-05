import { useEffect, useState, useRef } from "react";
import { getGitHubRepos } from "./service";
import QueryInput from "./components/QueryInput";
import List from "./components/List";
import { ListItemProps } from "./components/ListItem";

const validateQueryStatus = (status: number) => {
  if (status === 200) return;
  if (status === 304) return;
  if (status === 422) throw "查詢過於頻繁，請稍後再試";
  if (status === 503) throw "伺服器發生錯誤，請稍後再試";
  return;
};

function App() {
  const [queryText, setQueryText] = useState("");
  const [list, setList] = useState<ListItemProps[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const listElement = document.querySelector("#infinite-scroll-list");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!listElement) return;
        if (listElement.scrollHeight <= listElement.clientHeight) return;
        if (isLoading) return;
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: listElement,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading]);

  useEffect(() => {
    if (!queryText) return;
    setIsLoading(true);
    let cancel = false;
    getGitHubRepos(queryText, page)
      .then((res) => {
        if (cancel) return;
        const { status, data } = res;
        validateQueryStatus(status);
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
      <List innerRef={listRef} list={list} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
