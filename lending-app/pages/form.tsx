import Head from "next/head";
import React, { useState } from "react";
import { InputNumber, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import "antd/dist/antd.css";

export default function Form() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>('Credit Card')
  const [income, setIncome] = useState<number>(0);
  const [employmentLength, setEmploymentLength] = useState<string>('<1 Year');
  const [homeStatus, setHomeStatus] = useState<string>('');
  const [ficoScore, setFicoScore] = useState<number>(0);
  const [creditBalance, setCreditBalance] = useState<number>(0);
  const [creditLines, setCreditLines] = useState<number>(0);
  const [numCollections, setNumCollections] = useState<number>(0);
  const [numDeliquency, setNumDeliquency] = useState<number>(0);
  const [numRecords, setNumRecords] = useState<number>(0);


  const submitData = () => {
    // TODO: Make the axios call to the model, wait for the response then go to the results page
    fetch('https://deandiakov.pythonanywhere.com', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      console.log(res)
      router.push({ pathname: "/results", query: { approved: "denied" } });
    })
  };

  const purposes = ['Credit Card', 'Consolidation', 'Educational', 'Home Improvement', 'House', 'Major Purchase', 'Medical',
  'Moving', 'Other', 'Renewable Energy', 'Small Business', 'Vacation', 'Wedding']
  const purposeMenu = (
    <Menu>
      {
        purposes.map((p: string) =>
          <Menu.Item onClick={() => setPurpose(p)}>
            {p}
          </Menu.Item>
        )
      }
    </Menu>
  )

  const empLengths = ['10+ Years', '9 Years', '8 Years', '7 Years', '6 Years', '5 Years', '4 Years',
    '3 Years', '2 Years', '<1 Year']
  const empLengthMenu = (
    <Menu>
      {
        empLengths.map((p: string) =>
          <Menu.Item onClick={() => setEmploymentLength(p)}>
            {p}
          </Menu.Item>
        )
      }
    </Menu>
  )

  const home_ownership_status = ['Mortgage', 'None', 'Own', 'Other', 'Rent']
  const homeMenu = (
    <Menu>
      {
        home_ownership_status.map((p: string) =>
          <Menu.Item onClick={() => setHomeStatus(p)}>
            {p}
          </Menu.Item>
        )
      }
    </Menu>
  )

  return (
    <div className="container">
      <Head>
        <title>Lending Club Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Lending Club Loan Calculator</h1>

        <div className="grid">
          <h2>Desired Loan Amount</h2>
          <InputNumber
            onChange={e => setLoanAmount(parseFloat(e as string))}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </div>

        <div className="grid">
          <h2>Purpose</h2>
          <Dropdown overlay={purposeMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              { purpose === '' ? 'Select one' : purpose } <DownOutlined />
            </a>
          </Dropdown>
        </div>

        <div className="grid">
          <h2>Annual Income:</h2>
          <InputNumber
            onChange={e => setIncome(parseFloat(e as string))}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </div>

        <div className="grid">
          <h2>Employment Length</h2>
          <Dropdown overlay={empLengthMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              { employmentLength === '' ? 'Select one' : employmentLength } <DownOutlined />
            </a>
          </Dropdown>
        </div>

        <div className="grid">
          <h2>Home Ownership Status</h2>
          <Dropdown overlay={homeMenu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              { homeStatus === '' ? 'Select one' : homeStatus } <DownOutlined />
            </a>
          </Dropdown>
        </div>

        <div className="grid">
          <h2>Enter your FICO score: </h2>
          <InputNumber max={850} onChange={e => setFicoScore(e)}/>
        </div>

        <div className="grid">
          <h2>Total Credit Balance</h2>
          <InputNumber
            onChange={e => setCreditBalance(parseFloat(e as string))}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </div>

        <div className="grid">
          <h2>Number of Open Credit Lines</h2>
          <InputNumber onChange={e => setCreditLines(parseFloat(e as string))}/>
        </div>

        <div className="grid">
          <h2>Number of Collections in the Last 12 Months:</h2>
          <InputNumber onChange={e => setNumCollections(parseFloat(e as string))}/>
        </div>

        <div className="grid">
          <h2>Number of Incidences of Deliquency in the past 2 years</h2>
          <InputNumber onChange={e => setNumDeliquency(parseFloat(e as string))}/>
        </div>

        <div className="grid">
          <h2>Number of Derogatory Public Records</h2>
          <InputNumber onChange={e => setNumRecords(parseFloat(e as string))}/>
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
