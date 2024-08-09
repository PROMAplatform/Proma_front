import { BrowserRouter, Route, Routes } from "react-router-dom";
import PromptMakingPage from "./pages/promptMakingPage";
import MainPage from "./pages/mainPage";
import AboutPage from "./pages/aboutPage";
import CommunityPage from "./pages/communityPage";
import Header from "./components/Header/Header";
import MyPage from "./pages/myPage";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./styles/global.css";
import useGlobalShortcuts from "./hooks/common/useGlobalShortCut";
import ModalStack from "./components/SharingPrompt/modal/ModalStack";
import SocialLoginPageAfter from "./components/Login/socialLoginPageAfter";
import SocialLoginPage from "./pages/socialLoginPage";

function App() {
    useGlobalShortcuts();
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/mypage" element={<MyPage />} />

                    <Route
                        path="/promptMaking"
                        element={<PromptMakingPage />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<SocialLoginPage />} />
                    <Route
                        path="/api/v1/auth/user/:provider"
                        element={<SocialLoginPageAfter />}
                    />
                </Routes>
            </BrowserRouter>
            <ModalStack />
        </ThemeProvider>
    );
}

export default App;
