import { useState, Suspense, lazy, useEffect } from "react";
import "./App.css";

const RemoteApp = lazy(() => import("remoteApp/web-components"));

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    import("remoteApp/web-components").then(() => {
      setTimeout(() => {
        const remoteAppElement = document.querySelector("remote-app");
        console.log("remote-app element is in the DOM", remoteAppElement);
      }, 1 * 1000);
    });
  }, []);

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
