import Chat from "./components/Chat";
import Join from "./components/Join";
import { Route,Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import Create from "./components/Create";
import ExistingUser from "./components/existingUser";

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      
      <Route path="/existinguser" element={<ExistingUser />}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/create" element={<Create/>}/>
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
      );
};

export default App;
