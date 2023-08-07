import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const LeaveApply = (props) => {
  const [flag, setFlag]=useState(false);
  const [error, setError]=useState("");
  const [text, setText]=useState("");
  const [allLeaves, setAllLeaves]=useState();
  const [count, setCount]=useState(0);
  const [totalDays, setTotalDays]=useState(0);
  const [leave, setLeave]=useState({
    role: props.user.role,
    empID:props.user._id,
    startDate:new Date().toISOString().substring(0, 10),
    endDate:new Date().toISOString().substring(0, 10),
    department:props.user.department,
    email: props.user.email,
    leaveType: "unpaid",
    reason: "",
    status: "Pending"
  });
  const navigate=useNavigate();
  const getWorkingDays = () => {
    var result = 0;
    var total=0;
    var startDate=new Date(leave.startDate);
    var endDate=new Date(leave.endDate);
    var currentDate = startDate;
    while (currentDate <= endDate)  {  
        var weekDay = currentDate.getDay();
        if(weekDay != 0 && weekDay != 6)
            result++;
            total++;
            currentDate.setDate(currentDate.getDate()+1); 
    }
    setCount(result);
    setTotalDays(total);
    const start=new Date(leave.startDate).toDateString();
    const end=new Date(leave.endDate).toDateString();
    const text=start.substring(8,10)+ " " +start.substring(4,7)+ " "+start.substring(11, 15)+ " - " + end.substring(8,10)+ " " +end.substring(4,7)+ " "+end.substring(11, 15);
    console.log(text);
    setText(text);
  }


  const getAllLeaves=async()=>{
    console.log("get all leaves triggered: ", props.user._id);
    try{
      const res=await fetch(`http://localhost:5000/allLeaves/${props.user._id}`, {
        method: "GET",
        headers:{
          // "Accept": "application/json",
          "Content-Type": "application/json"
        },
      credentials: 'include',
      })
      const data=await res.json();
      if(!(res.status===200)){
        throw new Error("Res status is not OK");
      }
      data.leaves.sort((a,b)=>
        (new Date(b.startDate)-new Date(a.startDate))
      )
      setAllLeaves(data.leaves);
    }catch(err){
      console.log(err);
    }
  }

  const formSubmit=async(e)=>{
    e.preventDefault();
    try{
        const res= await fetch("http://localhost:5000/leave", {
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                ...leave, days: count
            })
        })
        const data=await res.json();
        if(res.status!==200){
            throw new Error(data.error)
        }
        else{
            window.alert(data.message);
            navigate("/dashboard");
        }
    }catch(err){
        console.log(err);
    }
  }

  const handleInput=(e)=>{
    console.log(e);
    setLeave({...leave, [e.target.name]: e.target.value});
  }


  const checkFlag=()=>{
    console.log("check flag function");
    
    if(leave.leaveType==="unpaid"){
      setFlag(false);
    }
    else if(leave.leaveType==="casual"){
      count>props.user.casualLeaves? setFlag(true)  : setFlag(false);
    }
    else if(leave.leaveType==="paid"){
      count>props.user.paidLeaves? setFlag(true) : setFlag(false);
    }
    if(flag){setError("Not enough balance");}
    const date1=new Date(leave.startDate);
    const date2=new Date(leave.endDate);
    const date=new Date();
    date1.setHours(0,0,0,0);
    date2.setHours(0,0,0,0);
    date.setHours(0,0,0,0);
    console.log("start date: ", date1);
    console.log("end date: ", date2);
    console.log("present date: ", date);
    //   console.log("date1 ",date1);
    //   console.log("date ", date);
    console.log("todays Date > endDate ", date>date2);
    if(date1<date || date2<date|| date1>date2){
      setFlag(true);
    }
    if(date1<date || date2<date){
      setFlag(true);
      setError("Can not apply for a date that is in past");
      return;
    }
    if(date1>date2){
      setFlag(true);
      setError("Ending Date cannot be less than starting date");
      return;
    }
    if(count==0){
      setFlag(true);
      setError("can not appy for 0 days of leave");
      return;
    }
    
  }

  const showUserLeave=(leave)=>{
    console.log("show user leave: ", leave);
    return(
      <div key={leave._id} className='card' style={{marginBottom: "5px"}}>
        {(leave.status==="Approved")?
          <div className="card-header green" style={{padding: "12px 0px"}}>
            <span style={{border: "2px solid black", color:"white",borderRadius: "7px 0px 0px 0px", padding: "15px 15px",backgroundColor: "green"}}>Approved</span>
          </div>:
          (leave.status==="Pending")?
          <div className="card-header yellow" style={{padding: "12px 0px"}}>
            <span style={{border: "2px solid black", color:"white",borderRadius: "7px 0px 0px 0px", padding: "15px 15px",backgroundColor: "orange"}}>Pending</span>
          </div>:
          <div className='card-header red' style={{padding: "12px 0px"}}>
            <span style={{border: "2px solid black", color:"white",borderRadius: "7px 0px 0px 0px", padding: "15px 15px",backgroundColor: "red"}}>Rejected</span>
            <span style={{padding: "10px", color: "red"}}>{leave.comment}</span>
          </div>
        }
          <div className='card-body'>
            <div className='row'>
              <p className='col-md-6'><strong>Type: </strong>{leave.leaveType}</p>
              <p className='col-md-6'><strong>No. of Days: </strong>{leave.days}</p>
            </div>
            <div className='row'>
              <p className="col-md-6"><strong>Fron: </strong>{leave.startDate}</p>
              <p className="col-md-6"><strong>To: </strong>{leave.endDate}</p>
            </div>
            {leave.reason?
            <p><strong>Reason: </strong>{leave.reason}</p>:
            <p></p>}
          </div>
      </div>
    )
  }

  useEffect(()=>{
    getWorkingDays();
    checkFlag();
  }, [leave, count]);

  useEffect(()=>{
    if(props.user && props.user._id)
      getAllLeaves();
  },[props.user]);
  
  console.log("rerender");
  console.log("value of all leaves: ", allLeaves)
  return (
    <div className='container'>
    <div className='container' style={{float: 'left'}}>

      <div className='left-div'>
        <div className='container'>
         
          <fieldset className='border border-primary border-2 rounded-3 p-3'>
            <legend className='float-none w-auto px-2 text-primary'>Leave-Application Form:</legend>
            <form method="POST" onSubmit={formSubmit}>
              <div className='form-group'>
                <label for="leaveType"><strong>Type of Leave: </strong> </label><br/>
                <select onChange={handleInput} name="leaveType" id="leave-type" defaultValue={leave.leaveType}>
                  <option value="casual">Casual</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div className='form-row'>
                <div className="form-group col-md-5" style={{display: 'inline-block'}}>
                    <label for="startDate"><strong>From: </strong> </label>
                    <input type="date" name="startDate" value={leave.startDate} id="startDate" onChange={handleInput} className="form-control"/>
                </div>
                <div className='col-md-2' style={{display: 'inline-block'}}></div>
                <div className="form-group col-md-5" style={{display: 'inline-block'}}>
                    <label for="endDate"><strong>To: </strong> </label>
                    <input type="date" name="endDate" value={leave.endDate} id="endDate" onChange={handleInput} className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                  <label for="department"><strong>Department: </strong> </label>
                  <input disabled type="text" name="department" value={props.user.department} id="department" className="form-control" placeholder="Department Assigned"/>
              </div>
              {(leave.leaveType==='paid'|| leave.leaveType==='unpaid')?
                <div className="form-group">
                  <label htmlFor="reason"><strong>Reason: </strong> </label>
                  <textarea name="reason" onChange={handleInput} style={{verticalAlign: 'text-top', width: '100%', marginBottom:'5px'}} value={leave.reason} id="reason" rows={4} columns={10}/>
              </div>:
              <p></p>
              }
              <button disabled={flag} onClick={formSubmit} className="btn btn-primary">Submit</button>
            </form>
          </fieldset>       
        </div>
      </div>
      <div className='right-div'>
        <div className='container'>
          <h5>Available Leaves: </h5>
          <p><span className='col-md-5'>Casual Leaves: {props.user.casualLeaves}</span> | <span className='col-md-5'>Paid Leaves: {props.user.paidLeaves}</span></p>
          <div>
            {(flag)?
            <p> <strong>{error}</strong></p>:
            <p>You have selected for leave from <strong>{text}</strong> . That's a total of <strong>{count} working days spanning over {totalDays} days.</strong></p>
            }
          </div>
          {(allLeaves)?
            <div>
              <h3>Approved Leave dates: </h3>
              {/* {console.log("leaves present to show")} */}
              {allLeaves.map((leave)=>{
                console.log(leave);
                let presentDate=new Date();
                let start=new Date(leave.startDate);
                let end=new Date(leave.endDate);
                presentDate.setHours(0,0,0,0);
                start.setHours(0,0,0,0);
                end.setHours(0,0,0,0);
                console.log("end date: ", end);
                console.log("present date: ", presentDate);
                console.log("comparison: ", end>=presentDate);
                console.log("leave status: ", leave.status);
                if(leave.status==="Approved" && end>=presentDate){
                  start=start.toDateString();
                  end=end.toDateString();
                  console.log("showing leave")
                  return(
                    <div>
                      <span>{start.substring(8,10)} {start.substring(4,7)} {start.substring(11, 15)} -  {end.substring(8,10)} {end.substring(4,7)} {end.substring(11, 15)}</span>
                    </div>
                    
                  )
                }
              })}
            </div>:
            <p>No leaves to show</p>
          }
          
          
        </div>
        
      </div>
    </div>
    <div style={{clear: 'both'}}></div>
    <hr/>
    <div>
      <h2>Track your Leaves: </h2>
      {(allLeaves)?
        <div>
          {allLeaves.map((leave)=>{
            return(
              <div key={leave._id}>{showUserLeave(leave)}</div>
            )
          })}  
        </div>:
        <div>No leave record found</div>
      }
          
    </div>
    </div>
  )
}

export default LeaveApply