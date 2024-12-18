import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./pages/Main";
import KakaoAuthRedirect from "./pages/KakaoAuthRedirect";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HospitalReservationHistory from "./pages/HospitalReservationHistory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token=", token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // 로컬 스토리지에서 토큰 삭제
      localStorage.removeItem("token");
      // 로그인 페이지로 리디렉션
      setIsLoggedIn(false);
    } catch (error) {
      alert("로그아웃 실패");
    }
  };

  return (
    <Router>
      <div>
        {/* 상단 네비게이션 바 */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              병원가조
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        로그인
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">
                        회원가입
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      로그아웃
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* 페이지 라우팅 */}
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login/oauth2/code/kakao"
              element={<KakaoAuthRedirect setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hospitalReservationHistory"
              element={
                <ProtectedRoute>
                  <HospitalReservationHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
