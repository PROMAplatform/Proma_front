import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <BrowserRouter>
      {/*헤더 들어갈 듯 */}
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
