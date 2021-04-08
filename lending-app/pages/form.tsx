import Head from "next/head";
import React, { useState } from "react";
import { InputNumber, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import axios from 'axios';

export default function Form() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>('')
  const [income, setIncome] = useState<number>(0);
  const [employmentLength, setEmploymentLength] = useState<string>('');
  const [homeStatus, setHomeStatus] = useState<string>('');
  const [ficoScore, setFicoScore] = useState<number>(0);
  const [creditBalance, setCreditBalance] = useState<number>(0);
  const [creditLines, setCreditLines] = useState<number>(0);
  const [numCollections, setNumCollections] = useState<number>(0);
  const [numDeliquency, setNumDeliquency] = useState<number>(0);
  const [numRecords, setNumRecords] = useState<number>(0);


  const submitData = () => {
    axios.get('https://ml-project5.herokuapp.com/random_forest', {
      params: {
        'annual_inc': income,
        'last_fico_range_low': ficoScore - 2,
        'last_fico_range_high': ficoScore + 2,
        'collections_12_mths_ex_med': numCollections,
        'delinq_2yrs': numDeliquency,
        'loan_amnt': loanAmount,
        'open_acc': creditLines,
        'pub_rec': numRecords,
        'revol_bal': creditBalance,
        'emp_length_10+ years': employmentLength === '10+ Years' ? 1 : 0,
        'emp_length_2 years': employmentLength === '2 Years' ? 1 : 0,
        'emp_length_3 years': employmentLength === '3 Years' ? 1 : 0,
        'emp_length_4 years': employmentLength === '4 Years' ? 1 : 0,
        'emp_length_5 years': employmentLength === '5 Years' ? 1 : 0,
        'emp_length_6 years': employmentLength === '6 Years' ? 1 : 0,
        'emp_length_7 years': employmentLength === '7 Years' ? 1 : 0,
        'emp_length_8 years': employmentLength === '8 Years' ? 1 : 0,
        'emp_length_9 years': employmentLength === '9 Years' ? 1 : 0,
        'emp_length__ 1 year': employmentLength === '<1 Year' ? 1 : 0,
        'home_ownership_MORTGAGE': homeStatus === 'Mortgage' ? 1 : 0,
        'home_ownership_NONE': homeStatus === 'None' ? 1 : 0,
        'home_ownership_OTHER': homeStatus === 'Other' ? 1 : 0,
        'home_ownership_OWN': homeStatus === 'Own' ? 1 : 0,
        'home_ownership_RENT': homeStatus === 'Rent' ? 1 : 0,
        'purpose_credit_card': purpose === 'Credit Card' ? 1 : 0,
        'purpose_debt_consolidation': purpose === 'Consolidation' ? 1 : 0,
        'purpose_educational': purpose === 'Educational' ? 1 : 0,
        'purpose_home_improvement': purpose === 'Home Improvement' ? 1 : 0,
        'purpose_house': purpose === 'House' ? 1 : 0,
        'purpose_major_purchase': purpose === 'Major Purchase' ? 1 : 0,
        'purpose_medical': purpose === 'Medical' ? 1 : 0,
        'purpose_moving': purpose === 'Moving' ? 1 : 0,
        'purpose_other': purpose === 'Other' ? 1 : 0,
        'purpose_renewable_energy': purpose === 'Renewable Energy' ? 1 : 0,
        'purpose_small_business': purpose === 'Small Business' ? 1 : 0,
        'purpose_vacation': purpose === 'Vacation' ? 1 : 0,
        'purpose_wedding': purpose === 'Wedding' ? 1 : 0,
        'grade_B': 1,
        'grade_C': 0,
        'grade_D': 0,
        'grade_E': 0,
        'grade_F': 0,
        'grade_G': 0,
      }
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
        router.push({ pathname: "/results", query: { approved: data['Predicted class '], ficoScore } })
      });
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
