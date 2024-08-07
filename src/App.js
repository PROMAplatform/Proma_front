import { BrowserRouter, Route, Routes } from "react-router-dom";
import PromptMakingPage from "./pages/promptMakingPage";
import MainPage from "./pages/mainPage";
import AboutPage from "./pages/aboutPage";
import CommunityPage from "./pages/communityPage";
import Header from "./components/Header/Header";
import MyPage from "./pages/myPage";
import KakaoAfterLogin from "./components/Login/KakaoLoginAfter";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
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
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
