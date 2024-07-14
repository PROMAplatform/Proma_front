import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import CommunityPage from "./pages/communityPage";
import Header from "./components/Header/Header";
import MyPage from "./pages/myPage";
import LikePromptList from "./components/community/mypage/LikePromptList";

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/mypage" element={<MyPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
