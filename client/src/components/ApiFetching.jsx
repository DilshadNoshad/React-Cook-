import { Fragment, useState } from "react";
import { useFetch } from "../hooks/useFetch";

// const Apis = {
//   COMMENTS: "comments.jsons",
//   USERS: "users.json",
//   POSTS: "posts.json",
// };

const Apis = [
  { name: "USERS", url: "https://jsonplaceholder.typicode.com/users" },
  { name: "POSTS", url: "https://jsonplaceholder.typicode.com/posts" },
  { name: "COMMENTS", url: "https://jsonplaceholder.typicode.com/comments" },
];

const OPTIONS = {
  method: "GET",
  // body: JSON.stringify({ name: "Kyle" }),
  headers: {
    "Content-type": "application/json",
  },
};

export function ApiFetching() {
  const [url, setUrl] = useState(Apis[0].url);

  const { isLoading, hasError, data } = useFetch(url, OPTIONS);

  return (
    <>
      {Apis.map((api) => {
        return (
          <Fragment key={api.name}>
            <input
              id={api.name}
              checked={url === api.url}
              onChange={() => {
                setUrl(api.url);
              }}
              name="api"
              type="radio"
            />
            <label htmlFor={api.name}>{api.name}</label>
          </Fragment>
        );
      })}

      <div>
        {isLoading ? (
          "Loading..."
        ) : hasError ? (
          "Error"
        ) : (
          <pre>{JSON.stringify(data, null, 4)}</pre>
        )}
      </div>
    </>
  );
}

