import React, { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      const usernameElement = document.getElementById("username");
      if (usernameElement) {
        usernameElement.innerText = username;
      }
      if (username === "") {
        window.location.href = "./index.html";
      }
    }
  }, []);

  //   const logout = () => {
  //     localStorage.setItem("username", "");
  //     window.location.href = "./index.html";
  //   };

  return (
    <div className="flex">
      <section className="main-body h-screen mx-auto">
        <div className="flex justify-center p-5">
          <div className="flex flex-col items-center mb-3">
            <h3 className="font-bold text-3xl">Dashboard</h3>
            <p>
              Welcome <span id="username"></span>,
            </p>
          </div>
          <div className="flex mb-3">
            <div className="bg-gray-100 rounded p-4 w-48">
              <h5>No. of Patient Record</h5>
              <h3>Undefined</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
