import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyHomePage from "./components/homepage";
import MyWelcome from "./components/welcome";
import MyVideo from "./components/video";
import Header from "./components/header";
import Footer from "./components/footer";
import { Provider } from "react-redux";
import store from "./redux/store"; // Adjust the import path to your store file
import MyComment from "./components/comment";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<MyHomePage />} />
            <Route path="/videos" element={<MyVideo />} />
            <Route path="/comment" element={<MyComment />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
