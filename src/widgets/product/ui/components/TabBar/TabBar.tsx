'use client';

import { TabBarProps } from "./TabBar.type";
import s from "./TabBar.module.scss";
import { useState } from "react";
import clsx from "clsx";

const TabBar = ({ data }: TabBarProps) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className={s.container}>

      <ul className={s.tabs}>
        {data.map((tab, index) => {
          return (
            <li 
              key={index}
              className={clsx(s.tabs__item, {[s.tabs__item_active]: activeTab === index})}
              onClick={() => handleClick(index)}
            >
              {tab.title}
            </li>
          )
        })}
      </ul>

      <div>
        {data.map((tab, index) => {
          return (
            <div 
              key={index}
              className={clsx(s.desc, {[s.desc_active]: activeTab === index})}
            >
              {tab.description}
            </div>
          )
        })}
      </div>
      
    </div>
  )
};

export default TabBar;