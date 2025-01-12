import { useDispatch } from "react-redux";
import {
  startLoading,
  setChunkData,
  setError,
  finishLoading,
} from "../store/slices/featuresSlice";
import { showAlert } from "../store/slices/alertSlice";

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
      let buffer = ""; // Buffer to store chunks
      let braceCount = 0; // Counter to track open and close braces

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          processBuffer(buffer, braceCount);
          dispatch(finishLoading()); // Finish loading
          dispatch(
            showAlert({
              type: "success",
              message: "API call completed successfully!",
            })
          ); 
          break;
        }

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk; // Add chunk to the buffer

          // Process the buffer for complete JSON objects
          ({ buffer, braceCount } = processBuffer(buffer, braceCount));
        }
      }
      dispatch(
        showAlert({
          type: "success",
          message: "API call completed successfully!",
        })
      ); // Success alert
    } catch (error) {
      console.error("API call error:", error.message);
      dispatch(setError(error.message)); // Set error state in Redux
      dispatch(
        showAlert({ type: "error", message: `Error: ${error.message}` })
      ); // Error alert
    }
  };

  const processBuffer = (data, braceCount) => {
    let startIdx = 0;
    let tempBuffer = ""; // Temporary buffer for accumulating JSON
    let processing = false;

    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      if (char === "{") {
        if (!processing) {
          startIdx = i; // Start processing a new JSON
          processing = true;
        }
        braceCount++;
      } else if (char === "}") {
        braceCount--;
      }

      // If braces are balanced and we are processing, extract the JSON
      if (processing && braceCount === 0) {
        tempBuffer = data.slice(startIdx, i + 1);
        try {
          const parsedData = JSON.parse(tempBuffer);
          console.log("Valid JSON:", parsedData); // Log valid JSON

          // Dispatch the data to Redux
          dispatch(setChunkData(parsedData));
          dispatch(
            showAlert({
              type: "info",
              message: "New JSON chunk stored in Redux!",
            })
          ); // Alert when chunk is stored
        } catch (e) {
          console.log("Invalid JSON fragment (ignored):", tempBuffer); // Log invalid JSON
        }
        // Reset processing and buffer after handling the JSON
        tempBuffer = "";
        processing = false;
        startIdx = i + 1;
      }
    }

    // Return unprocessed part of the buffer and the updated brace count
    return { buffer: data.slice(startIdx), braceCount };
  };

  return callApi;
};

export default useApiCall;
