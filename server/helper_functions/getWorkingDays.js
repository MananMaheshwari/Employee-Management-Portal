const getWorkingDays = (startDate, endDate) => {
    var result = 0;
    startDate=new Date(startDate);
    endDate=new Date(endDate);
    var currentDate = startDate;
    while (currentDate <= endDate)  {  
        var weekDay = currentDate.getDay();
        if(weekDay != 0 && weekDay != 6)
            result++;
         currentDate.setDate(currentDate.getDate()+1); 
    }

    return result;
}

module.exports=getWorkingDays;