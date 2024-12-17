"use client";
import React from "react";
import { cardStyle, titleStyle } from "../styles/commonstyles";

type Setting = {
  name: string;
  value: string;
};

const Settings: React.FC = () => {
  const settings: Setting[] = [
    { name: "Theme", value: "Dark Mode" },
    { name: "Notifications", value: "Enabled" },
  ];

  return (
    <div className="p-6">
      <div className={cardStyle}>
        <h2 className={titleStyle}>Settings</h2>
        <ul>
          {settings.map((setting, index) => (
            <li
              key={index}
              className="py-2 border-b border-gray-200 last:border-none"
            >
              <div className="flex justify-between">
                <span>{setting.name}</span>
                <span className="font-medium text-gray-800">
                  {setting.value}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
