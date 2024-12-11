import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const OfficeHours = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-commonGreen">Schedules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-sm text-commonGreen">BSIT - 3B</h3>
              <p className="text-xs ">CL 2</p>
            </div>
            <p className="font-medium text-sm">08:00 AM - 09:00 AM</p>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-sm text-commonGreen">BSIT - 3B</h3>
              <p className="text-xs ">CL 2</p>
            </div>
            <p className="font-medium text-sm">09:00 AM - 10:00 AM</p>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-sm text-commonGreen">BSIT - 4</h3>
              <p className="text-xs ">CL 1</p>
            </div>
            <p className="font-medium text-sm">10:00 AM - 11:00 AM</p>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-sm text-commonGreen">Lunch</h3>
              <p className="text-xs ">Somewhere</p>
            </div>
            <p className="font-medium text-sm">11:00 AM - 12:00 NN</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfficeHours;
