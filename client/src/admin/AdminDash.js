import React from "react";
import "./AdminDash.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const data1 = [
  {
    name: "2018",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "2019",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2020",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2021",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "2022",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "2023",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "2024",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const AdminDash = () => {
  //const location = useLocation();
  //const company = location.state.username;

  const [tempArray, setTempArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/send");
        setTempArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const n = tempArray.length;

  return (
    <main className="main-container">
      <div className="title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <div className="cards">
          <div className="inner-cards">
            <h3>Companies Added</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{n}</h1>
        </div>
        <div className="cards">
          <div className="inner-cards">
            <h3>Placed Students</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>0</h1>
        </div>
        <div className="cards">
          <div className="inner-cards">
            <h3>Not interested</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>30</h1>
        </div>
        <div className="cards">
          <div className="inner-cards">
            <h3>Rejected companies</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>0</h1>
        </div>{" "}
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height={400} className="chart1">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={180}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data1}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
          <h3>Placed Chart</h3>
        </ResponsiveContainer>
      </div>

      <div className="todo">
        <h3>TODO LISTS</h3>
        <ul>
          <li>
            <span>Manage job postings from companies</span>
          </li>
          <li>
            <span>Coordinate campus recruitment drives</span>
          </li>
          <li>
            <span>
              Facilitate communication between students and recruiters
            </span>
          </li>
          <li>
            <span>Review and approve student registrations for placements</span>
          </li>
          <li>
            <span>
              Provide guidance to students regarding placement activities
            </span>
          </li>
        </ul>
      </div>
    </main>
  );
};
