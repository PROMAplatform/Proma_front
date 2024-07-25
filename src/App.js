import { BrowserRouter, Route, Routes } from "react-router-dom";

import PromptMakingPage from "./pages/promptMakingPage";
import MainPage from "./pages/mainPage";
import CommunityPage from "./pages/communityPage";
import Header from "./components/Header/Header";
import MyPage from "./pages/myPage";
import KakaoAfterLogin from "./components/Login/KakaoLoginAfter";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path="/api/v1/auth/customers/kakao"
          element={<KakaoAfterLogin />}
        />
        <Route path="/promptMaking" element={<PromptMakingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
