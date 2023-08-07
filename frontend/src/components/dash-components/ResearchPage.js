import React from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import '../../App.css'
import PostResearch from './PostResearch';
import ResearchHistory from './ResearchHistory';

function ResearchPage(props) {
    console.log("research page");
  return (
    <div style={{ padding:"10px", height: "100%"}}>
        <Tabs defaultActiveKey="tab1" id="tab-example">
            <Tab eventKey="tab1" title={<span style={{fontWeight: "bold"}}>New Research Form</span>}>
                {/* Content for Tab 1 */}
                <PostResearch user={props.user}/>
            </Tab>
            <Tab eventKey="tab2" title={<span style={{fontWeight: "bold"}}>Research History</span>}>
                <ResearchHistory user={props.user}/>
                
            </Tab>
        </Tabs>
    </div>
  )
}

export default ResearchPage