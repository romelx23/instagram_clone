import "./App.css";
import { AuthProvider } from "./context/authContext";
import { DasboardRoutes } from "./router/DasboardRoutes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DasboardRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
