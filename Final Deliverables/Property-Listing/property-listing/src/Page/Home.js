import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { contract } from "./connector";

function Home() {
 const [Id, setId] = useState("");
 const [name, setname] = useState("");
 const [location, setLocation] = useState("");
 const [des, setDes] = useState("");
 const [TransferPropertId, setTransferPropertId] = useState(""); 
 const [MeatAddr, setMeatAddr] = useState("");
 const [PropDetailId, setPropDetailId] = useState("");
 const [PropDetails, setPropDetails] = useState("");
 const [Wallet, setWallet] = useState("");


 

 const handleId = (e) => {
  setId(e.target.value)
 }

 const handleName = (e) => {
  setname(e.target.value)
 }

 const handleLocation = (e) => {
  setLocation(e.target.value)
 }

 const handleDes = (e) => {
  setDes(e.target.value)
 }

 const handleAddProperty = async() => {
  try {
   let tx  = await contract.addProperty(Id.toString(),name,location,des)
   let wait = await tx.wait()
   console.log(wait);
   alert(wait.transactionHash)
  } catch (error) {
   alert(error)
  }
 }

 const handleTransferPropertyId = (e) => {
  setTransferPropertId(e.target.value)
 }

 const handleMetaAddr = (e) => {
  setMeatAddr(e.target.value)
 }

 const handletransferProperty = async () => {
  try {
   let tx = await contract.transferProperty(TransferPropertId.toString(), MeatAddr)
   let wait = await tx.wait()
   console.log(wait);
   alert(wait.transactionHash)

  } catch (error) {
   alert(error)
  }
 }

 const handlePropId = (e) => {
  setPropDetailId(e.target.value)
 }

 const handlePorpDetails = async() => {
  try {
   let tx = await contract.getPropertyDetails(PropDetailId.toString())
   let arr = []

   tx.map(e => arr.push(e))

   setPropDetails(arr)
   console.log(tx);
   // alert(tx)
  } catch (error) {
   alert(error)
  }
 }

 const handleWallet = async () => {
  if (!window.ethereum) {
   return alert('please install metamask');
  }

  const addr = await window.ethereum.request({
   method: 'eth_requestAccounts',
  });

  setWallet(addr[0])

 }
 
 return (
  <div>
   <h1 style={{ marginTop: "30px", marginBottom: "80px" }}>Property Listing on Blockchain</h1>
   {!Wallet ?

    <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
    :
    <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0, 6)}....{Wallet.slice(-6)}</p>
   }
   <Container style={{ display: "flex" }}>
    <Row >
     <Col>
      <div>

       
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleId} type="number" placeholder="Enter Property ID" value={Id} /> <br />
       
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleName} type="string" placeholder="Enter name" value={name} /> <br />
       
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleLocation} type="string" placeholder="Enter location" value={location} /><br />
       
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleDes} type="string" placeholder="Enter description" value={des} /><br />

       <Button onClick={handleAddProperty} style={{ marginTop: "10px" }} variant="primary">Add Property To Blockchain</Button>
      </div>
     </Col>
     <Col>
      <div style={{marginTop:"80px"}}>
       
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleTransferPropertyId} type="string" placeholder="Enter Property Id" value={TransferPropertId} /><br />

     
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleMetaAddr} type="string" placeholder="Enter new Owner Metamask Address" value={MeatAddr} /><br />
 

       <Button onClick={handletransferProperty} style={{ marginTop: "10px" }} variant="primary">Transfer property</Button>

      </div>
     </Col>
    </Row>
    <Row>
     <Col>
      <div>
       
       <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handlePropId} type="string" placeholder="Enter property Id" value={PropDetailId} /><br />


       <Button onClick={handlePorpDetails} style={{ marginTop: "10px" }} variant="primary">Get property Detail</Button>
       {PropDetails ? PropDetails?.map(e => {
        return <p>{e}</p>
       }) : <p></p>}
      </div>
     </Col>
    </Row>

   </Container>

  </div>
 )
}

export default Home;
