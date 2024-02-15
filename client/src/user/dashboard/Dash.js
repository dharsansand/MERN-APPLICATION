import React from "react";
import "./Dash.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
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

export const Dash = () => {
  //const location = useLocation();
  //const company = location.state.username;

  const name = useSelector((state) => state.name);
console.log(name);

  return (
    <main className="main-container">
      <div className="title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <div className="cards">
          <div className="inner-cards">
            <h3>Attended</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="cards">
          <div className="inner-cards">
            <h3>Mcq's Attended</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="cards">
          <div className="inner-cards">
            <h3>OFFERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="cards">
          <div className="inner-cards">
            <h3>REJECTED</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>300</h1>
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
        </ResponsiveContainer>
      </div>

      <div className="todo">
        <h3>TODO LISTS</h3>
        <ul className="un">
          <li className="lis">
            <span>Complete daily examly tasks</span>
          </li>
          <li>
            <span>Register for companies</span>
          </li>
          <li>
            <span>Prepare for interviews</span>
          </li>
          <li>
            <span>Practice MCQ's</span>
          </li>
          <li>
            <span>Update daily progression</span>
          </li>
        </ul>
      </div>
    </main>
  );
};
