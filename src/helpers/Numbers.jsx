import React from 'react'

const useNumbers = () => {
    const abbreviateNumber = (value) => {
        if(value === 0){
          return 0;
        }
        if(value < 100){
          return value;
        }
        let newValue = value;
        const suffixes = ["", "K", "M", "B","T"];
        let suffixNum = 0;
        while (newValue >= 1000) {
          newValue /= 1000;
          suffixNum++;
        }
        newValue = newValue.toPrecision(3);
        newValue += suffixes[suffixNum];
        return newValue;
    };
    return { abbreviateNumber };
}

export default useNumbers