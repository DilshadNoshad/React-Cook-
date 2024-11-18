import { useEffect, useReducer } from "react";

const ACTIONS = {
  FETCH_START: "fetch_start",
  FETCH_SUCCESS: "fetch_success",
  FETCH_ERROR: "fetch_error",
};

function reducer(state, { type, payload }) {
  switch (
    type // or action.type
  ) {
    case ACTIONS.FETCH_START:
      return {
        isLoading: true,
        hasError: false,
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        data: payload.data,
        isLoading: false,
        hasError: false,
      };
    case ACTIONS.FETCH_ERROR:
      return {
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
}
export function useFetch(url, options = {}) {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_START });
    const controller = new AbortController();
    fetch(url, { ...options, signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
      })
      .catch((e) => {
        if (e.name === "AbortError") return; //ignore here from set error
        dispatch({ type: ACTIONS.FETCH_ERROR });
      });

    return () => {
      controller.abort();
    };
  }, [url, options]);

  return state;
}


