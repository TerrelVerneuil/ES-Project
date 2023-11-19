import React, { useState,useEffect } from 'react';
import Button from '../Button';
import Papa from "papaparse";
import StintData from '../StintData';
import FeedingData from '../FeedingData';

function Recipient({file, setRecipient, data }) {
  const upperValues = [" "];//file;
  //["A", "A1", "B", "UC", "U", "K", "O", "S", "M", "Y"];
  const dropdownValues = [" "];
  //["C", "N", "R", "T", "UA"];
  const [recip,setRecip] = useState(upperValues);
 
  const keysArray = file;
  const value = 0;
  const initialdict = keysArray.reduce((acc, key) =>{
    acc[key] = value;
   return acc;
  },{});
  const [dict,setDict] = useState(initialdict);
  
  
  //on save file it should read it.
  //then update button order
  //dict["1"] = (dict["1"] || 0) + 1;
  dict["1"] += 1;
  useEffect(() => {
    const readCsvAndUpdateDict = () => {
      // Replace this with the actual path to your CSV or use a file input
      //const files = file; 
      // fetch(file)
      //   .then(response => response.text())
      //   .then(csvText => {
        
        if(file==null){
          return;
        }else{
          Papa.parse(file, {
            header: false, //no header because arr
            complete: () => {
            const newDict = { ...dict };
            // for(let i = 0;
             if (  newDict.hasOwnProperty("1")) {
              //newDict["1"] += 1;
            }
              //iterate through the rows
              // if ("1" && newDict.hasOwnProperty()) {
              //   newDict["1"] += 1;
              // }
              //results.data.forEach(row => {
              //   //instead it should iterate through the array file
                 
              //   // const item = row['Recipient'];
                 
              // });
               const entries = Object.entries(newDict).filter(([key,])=> upperValues.includes(key));
               entries.sort((a, b) => b[1] - a[1]);
               const sortedDict = Object.fromEntries(entries);
               setDict(sortedDict);
           // }
          
        }
      });
    }
          readCsvAndUpdateDict();
  }}, []);


  useEffect(() => {
    const providersWithCounts = Object.keys(dict).filter(key => dict[key] > 0);
  providersWithCounts.sort((a, b) => dict[b] - dict[a]);
  const providersWithoutCounts = upperValues.filter(key => !providersWithCounts.includes(key));
  setRecip([...providersWithCounts, ...providersWithoutCounts]);
  }, [dict]);
  //const sortedAsc = [...dict].sort((a,b)=>a.id-b.id);
  //sort the dictionary
  //const maxKey = Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? a : b);
  //const maxVal = dict[maxKey];
  
  // const entries = Object.entries(dict);
  // const values = Object.keys(dict);
   //values.sort((x,y) => y[1] - x[1]);
   ///entries.sort((x,y) => y[1] - x[1]);
  // const arrSort = entries.map(entry => entry[1]);
   
  return (
    <div className="recipient">
      <p>Recipient: {data}</p>
      <p>{StintData.file}</p>
      <ul>{Object.entries(dict).map(([key,value])=>(
                <li key={key}>{key}:{value}</li>
            ))}</ul>
      <div className="recipient-bt">
        {recip.map((item, index) => (
          <Button key={index} value={item} handleData={setRecipient} selected={data === item} />
        ))}
        <Button handleData={setRecipient} value="" />
        <Button handleData={setRecipient} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default Recipient;
