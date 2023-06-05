import { useEffect, useState, useRef } from "react";
import { getGitHubRepos } from "./service";
import QueryInput from "./components/QueryInput";
import List from "./components/List";
import { ListItemProps } from "./components/ListItem";

function App() {
  const [queryText, setQueryText] = useState("");
  const [list, setList] = useState<ListItemProps[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const listElement = document.querySelector("#infinite-scroll-list");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!listElement) return;
        if (listElement.scrollHeight <= listElement.clientHeight) return;
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
  }, []);

  useEffect(() => {
    if (!queryText) return;
    getGitHubRepos(queryText, page).then((res) => {
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
  }, [queryText, page]);

  return (
    <div className="app">
      <h1>GitHub Repo List</h1>
      <QueryInput
        handleChange={(text: string) => {
          console.log(text);
          setQueryText(text);
        }}
      />
      <List innerRef={listRef} list={list} />
    </div>
  );
}

export default App;
