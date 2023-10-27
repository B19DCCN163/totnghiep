import React from 'react';
import './../Slide.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { fakeData1, fakeData2,fakeData3, fakeDataAdmin } from './../fakeData'
import { DataSection } from './DataSection';

function HomeTab() { 
  const [dataSections, setDataSections] = useState([
    { data: fakeData1, displayItems: fakeData1.items.slice(0, 3), startIndex: 0 },
    { data: fakeData2, displayItems: fakeData2.items.slice(0, 3), startIndex: 0 },
  ]);
  const handleItemsChange = (sectionIndex: number, nextStartIndex: number) => {
    const updatedDataSections = [...dataSections];
    const nextItems = updatedDataSections[sectionIndex].data.items.slice(
      nextStartIndex,
      nextStartIndex + 3
    );
    updatedDataSections[sectionIndex].displayItems = nextItems;
    updatedDataSections[sectionIndex].startIndex = nextStartIndex;
    setDataSections(updatedDataSections);
  };
  return (
      <div>
      {dataSections.map((section, index) => (
            <DataSection
              key={index}
              displayItems={section.displayItems}
              handleItemsChange={(nextStartIndex) => handleItemsChange(index, nextStartIndex)}
              startIndex={section.startIndex}
              data={section.data}
            />
          ))}
      </div>
      
    );
  }
  
  export default HomeTab;
  