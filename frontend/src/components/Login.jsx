import { useEffect, useState } from "react";
import { getAgentById } from "../utils/agent";
import { getUserById } from "../utils/user";

function Login(props) {
  const [id, setId] = useState(-1);
  const [userType, setUserType] = useState("user");

  return (
    <div>
      <div className="mx-auto my-36 pb-8 flex w-[350px] flex-col border-2 bg-white text-black shadow-xl">
        <div className=" mb-2 flex flex-row justify-start space-x-2">
          <button
            onClick={() => {
              setUserType("user");
            }}
            className=" px-4 py-3 text-center font-sans text-xl font-bold grow"
            style={{ backgroundColor: userType === "user" ? "white" : "#E9E9E9" }}
          >
            <h1>User</h1>
          </button>
          <button
            onClick={() => {
              setUserType("agent");
            }}
            className="px-4 py-3 text-center font-sans text-xl font-bold grow"
            style={{ backgroundColor: userType === "agent" ? "white" : "#E9E9E9" }}
          >
            <h1>Agent</h1>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <input
            className="my-2 w-72 border p-2"
            type="text"
            placeholder="Id"
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="my-2 flex justify-center">
          <button
            className="w-72 border bg-[#1CFEBA] p-2 font-sans font-bold"
            onClick={async () => {
              let user = userType === "user" ? await getUserById(id) : await getAgentById(id);
              window.sessionStorage.setItem("user", JSON.stringify(user));
              window.sessionStorage.setItem("userType", userType);
              props.setUser(user);
              props.setUserType(userType);
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
