import { useEffect, useState } from "react";
import Login from "./components/Login";
import UserChat from "./components/UserChat";
import AgentDashboard from "./components/AgentDashboard";

function App() {
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState({});

  useEffect(() => {
    var storedUser = JSON.parse(window.sessionStorage.getItem("user")) ?? {};
    var storedUserType = window.sessionStorage.getItem("userType");
    setUser(storedUser);
    setUserType(storedUserType);
  }, []);

  return (
    <div className="App">
      {(Object.keys(user).length === 0 && <Login setUser={setUser} setUserType={setUserType} />) ||
        (userType == "user" ? (
          <UserChat user={user} userType={userType} setUser={setUser} setUserType={setUserType} />
        ) : (
          <AgentDashboard user={user} userType={userType} setUser={setUser} setUserType={setUserType} />
        ))}
    </div>
  );
}

export default App;

//   (
//     <div>
//       {JSON.stringify(user)}
//       <button
//         onClick={() => {
//           setUser({});
//           setUserType("");
//           window.sessionStorage.setItem("user", JSON.stringify({}));
//           window.sessionStorage.setItem("userType", "");
//         }}
//       >
//         logout
//       </button>
//     </div>
//   )
