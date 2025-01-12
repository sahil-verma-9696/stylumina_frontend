import { useDispatch } from "react-redux";
import {
  startLoading,
  setChunkData,
  setError,
  finishLoading,
} from "../store/slices/featuresSlice";
import { showAlert } from "../store/slices/alertSlice";
import { setFeedback } from "../store/slices/feedbackSlice";

const useApiCall = () => {
  const dispatch = useDispatch();

  const callApi = async (url, method = "POST", body = null) => {
    try {
      dispatch(startLoading()); // Set loading state
      dispatch(showAlert({ type: "info", message: "API call in progress..." }));

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "text/event-stream",
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("ReadableStream not supported in this environment.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedData = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // console.log(data)
          dispatch(finishLoading()); // Finish loading
          dispatch(
            showAlert({
              type: "success",
              message: "API call completed successfully!",
            })
          );
          break;
        }

        // if (value) {
        //   const chunk = decoder.decode(value, { stream: true });
        //   console.log(chunk);
        // }

        // const { value, done } = await reader.read();
        // if (done) break;
    
        // // Decode and accumulate incoming data
        accumulatedData += new TextDecoder().decode(value);
    
        // Process complete chunks based on a delimiter (e.g., newline)
        let chunks = accumulatedData.split('\n\n'); // Assuming each chunk ends with a newline
        accumulatedData = chunks.pop(); 
    
        for (const chunk of chunks) {
            if (chunk) {
                // Process each complete chunk
                // console.log('Processed Chunk:', JSON.parse(chunk));
                dispatch(setChunkData(JSON.parse(chunk)));
                dispatch(setFeedback(JSON.parse(chunk)));
            }
        }

      }

    } catch (error) {
      console.error("API call error:", error.message);
      dispatch(setError(error.message)); // Set error state in Redux
      dispatch(
        showAlert({ type: "error", message: `Error: ${error.message}` })
      ); // Error alert
    }
  };

  return callApi;
};

export default useApiCall;
