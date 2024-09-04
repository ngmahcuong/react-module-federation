import { useState, Suspense, lazy } from "react";
import "./App.css";

const loadRemoteApp = async () => {
  try {
    const module = await import("remoteApp/App");
    // const module = await import("remoteApp/web-components");
    return module;
  } catch (error) {
    console.error("Failed to load remote module:", error);
    // Return a fallback component in case of error
    return { default: () => <div>Failed to load remote application.</div> };
  }
};

const RemoteApp = lazy(loadRemoteApp);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Host Application</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteApp />
      </Suspense>
    </div>
  );
}

export default App;
