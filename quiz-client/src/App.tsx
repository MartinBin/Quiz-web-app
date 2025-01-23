import {BrowserRouter, Route, Routes} from "react-router-dom";
import Quiz from "./Views/Quiz.tsx"

const App: React.FC = () => (
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Quiz />}/>
      </Routes>
  </BrowserRouter>
);

export default App;
