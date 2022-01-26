import "./App.css";
import { AuthProvider } from "./context/authContext";
import { PostProvider } from "./context/postContext";
import { DasboardRoutes } from "./router/DasboardRoutes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PostProvider>
          <DasboardRoutes />
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
