import { useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError();

  return (
    <>
      {import.meta.env.VITE_ENVIRONMENT !== "PRODUCTION" ? (
        <>
          <h1>{error.message}</h1>
          <p>{error.stack}</p>
        </>
      ) : (
        <h1>SOMETHING WENT WRONG!!!</h1>
      )}
    </>
  );
}
