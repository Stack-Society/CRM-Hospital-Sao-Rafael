import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/index.css";

function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
