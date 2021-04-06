import Head from "next/head";
import React, { useEffect } from "react";
import { Input, InputNumber, Button } from "antd";
import Router, { useRouter } from "next/router";
import "antd/dist/antd.css";

export default function Form() {
  const router = useRouter();
  const submitData = () => {
    // TODO: Make the axios call to the model, wait for the response then go to the results page
    router.push({ pathname: "/results", query: { approved: "denied" } });
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

    </div>
  );
}
