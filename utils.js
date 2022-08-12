const toTimestamp=(strDate)=>{
    dateTimeParts = strDate.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('/'),


    date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
 
    return date.getTime();
}

const isValid=(timestamp_scheduled)=>{
    const timestamp_present = new Date().getTime(); 
    return timestamp_scheduled-timestamp_present>0;
}

const normalize=(text)=>{
    return text.toLowerCase();
}

const normalizeArray=(arr)=>{
    let temp=[]; 

    for(let i=0;i<arr.length;++i){
        if(arr[i].length){
            temp.push(normalize(arr[i]));
        }
    } 
    return temp;
}

module.exports = {
    toTimestamp,
    isValid,
    normalize,
    normalizeArray,
} 