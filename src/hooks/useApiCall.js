import { useDispatch } from "react-redux";
import { showAlert } from "../store/slices/imageSlice";

const useApiCall = () => {
  const dispatch = useDispatch();

  const callApi = async (url, method = "GET", body = null) => {
    console.log(body)
    try {
      dispatch(showAlert({ type: "info", message: "Making API call..." }));
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });
      // const response = await fetch('./data.json');

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(showAlert({ type: "success", message: "API call successful!" }));
      return data;
    } catch (error) {
      dispatch(showAlert({ type: "error", message: error.message }));
      throw error;
    }
  };

  return callApi;
};

export default useApiCall;