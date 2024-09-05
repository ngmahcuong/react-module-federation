import { useEffect } from "react";
import "./App.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";

function App() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/Build/unity-event.loader.js",
      dataUrl: "/Build/unity-event.data.unityweb",
      frameworkUrl: "/Build/unity-event.framework.js.unityweb",
      codeUrl: "/Build/unity-event.wasm.unityweb",
    });

  function handleSendMessageToUnity() {
    sendMessage(
      "LoggerObject",
      "MessageFromReact",
      "hello unity are you there?"
    );
  }
  
  useEffect(() => {
    const handleHostAppMessage = (event: MessageEvent) => {
      if (
        event.data &&
        event.data.type === "HostApp-RemoteApp:SendMessageToUnity"
      ) {
        handleSendMessageToUnity();
      }
    };
    window.addEventListener("message", handleHostAppMessage);

    return () => {
      window.removeEventListener("message", handleHostAppMessage);
    };
  }, []);

  useEffect(() => {
    const handleMessageFromUnity = (message: ReactUnityEventParameter) => {
      window.postMessage(
        { type: "RemoteApp-HostApp:ReceiveMessageFromUnity", payload: message },
        "*"
      );
    };

    addEventListener("MessageFromUnity", handleMessageFromUnity);
    return () => {
      removeEventListener("MessageFromUnity", handleMessageFromUnity);
    };
  }, [addEventListener, removeEventListener]);

  return (
    <div className="App">
      <h1>Remote Application</h1>
      <div className="card">
        <Unity unityProvider={unityProvider} />
      </div>
    </div>
  );
}

export default App;
