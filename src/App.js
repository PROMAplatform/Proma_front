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
import AboutOpenAPIPage from "./pages/aboutOpenAPIPage";
import OpenAPIDocsPage from "./pages/openAPIDocsPage";
import OpenAPIPage from "./pages/openAPIPage";
import "../src/locales/i18n";

function App() {
    useGlobalShortcuts();
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<AboutPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/mypage" element={<MyPage />} />

                    <Route
                        path="/promptMaking"
                        element={<PromptMakingPage />}
                    />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/login" element={<SocialLoginPage />} />
                    <Route
                        path="/api/v1/auth/user/:provider"
                        element={<SocialLoginPageAfter />}
                    />
                    <Route path="/openapi" element={<AboutOpenAPIPage />} />
                    <Route path="/openapi/list" element={<OpenAPIPage />} />
                    <Route path="openapi/docs" element={<OpenAPIDocsPage />} />
                </Routes>
                <ModalStack />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
