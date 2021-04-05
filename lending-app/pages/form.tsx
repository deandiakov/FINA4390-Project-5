import Head from "next/head";
import React, { useEffect } from "react";
import { Input, InputNumber, Button } from "antd";
import Router from "next/router";
import "antd/dist/antd.css";

export default function Form() {
  const submitData = () => {
    // TODO: Make the axios call to the model, wait for the response then go to the results page
    Router.push("/results");
  };

  return (
    <div className="container">
      <Head>
        <title>Lending Club Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Lending Club Loan Calculator</h1>

        <div className="grid">
          <h2>Enter your FICO score</h2>
          <Input></Input>
        </div>

        <div className="grid">
          <h2>Blah blah</h2>
          <Input></Input>
        </div>

        <div className="grid">
          <h2>Choose something here too</h2>
          <InputNumber size="large" defaultValue={3} />
        </div>

        <div className="grid">
          <Button type="primary" size="large" onClick={submitData}>
            Submit
          </Button>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          flex-direction: column;
          max-width: 800px;
          margin-top: 3rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
