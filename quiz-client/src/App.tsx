import {BrowserRouter, Route, Routes,Navigate} from "react-router-dom";
import Quiz from "./Views/Quiz.tsx"
import Results from "./Views/Results.tsx";
import Navbar from "./Components/Navbar.tsx";

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
      <Routes>
          <Route path="/" element={<Quiz />}/>
          <Route path="/results" element={<Results />}/>
          <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
      </Routes>
  </BrowserRouter>
);

export default App;
