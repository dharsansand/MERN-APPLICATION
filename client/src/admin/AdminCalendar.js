import * as React from "react";
import "./AdminCal.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function AdminCalendar() {
  return (
    <div className="cal-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="cal">
          <DateCalendar />
        </div>
      </LocalizationProvider>
    </div>
  );
}
