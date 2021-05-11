import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import axios from "axios";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [community, setCommunity] = useState("Community One");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, username, community };
      await fetch(`http://localhost:3000/api/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const communities = [
    { value: "Community One", label: "Community One" },
    { value: "Community One", label: "Community Two" },
  ];

  return (
    <Layout>
      <div className="page">
        <form onSubmit={submitData}>
          <h1>Welcome to</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />

          <input
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            type="text"
            value={username}
          />

          <select
            onChange={(r) => setCommunity(r.target.value)}
            value={community}
          >
            {communities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <input disabled={!name && !community} type="submit" value="Signup" />
          <a
            className="back"
            href="#"
            onClick={() => Router.push("/userprofile")}
          >
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
        }
        input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }
        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default SignUp;
