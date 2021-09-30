import React, {useEffect, useState} from 'react'
import {Container, Row,Table,Form, Button, Modal} from 'react-bootstrap'
//import Datatable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog,faUser } from '@fortawesome/free-solid-svg-icons'
import api from '../api';
import './donor.css';
// const coloumns = [
//     {
//         name:'Title',
//         selector:row=>row.title
//     },
//     {
//         name:'Year',
//         selector:row=>row.year
//     },
//     {
//         name:"Amount",
//         selector:row=>row.name
//     }
// ]

// const data = [
//     {
//         title:"ReactJS",
//         year:2021,
//         name:"123"
//     },
//     {
//         title:"Angular 2+",
//         year: 2020,
//         name:"234"
//     },
//     {
//         title:"Vue js",
//         year: 2019,
//         name:"345"
//     }
// ]
function Donor() {

    const [data,dataset] = useState( [] );
    const [errorMsg,errorfun] = useState();

    //State to hold bloof gropus
    const [bloodType,bloodTypeFun] = useState( [] );

    //State to hold the selected blood group from the check box 
    const [bloodGroup,selectedBloodGroup] = useState();
    
    //Donor data for Single Donor
    const[data_byID,data_byIDFun] = useState( [] ); 

    //Modal State
    const [show,setShow] = useState(false);

    //set loader
    const [loader,setLoader] = useState(false)

    //Get All donor Details
    const getDonors = async ()=>{
        let donorData;
        //let errorMsg;
        try{
            const response = await api.get('/donor')
            donorData = await response.data
            dataset(donorData)
        }catch(e){
            errorfun(e)
        }
    
        
    }
     //Modal box show and hide and getting the donor details of the particular donor
    const handleClose = ()=>setShow(false)
    const handleShow = async (donor_id,name)=>{
        let singleDonorData;
        setLoader(true);
        console.log('Donor ID',donor_id)
        try{
        console.log('Donor ID',donor_id)
            const response = await api.get(`/donor/${donor_id}`);
            singleDonorData = await response.data
            data_byIDFun(singleDonorData);
            setLoader(false)
        }catch(e){
            setLoader(false)
            setShow(false);
            errorfun(e)
        }
        setShow(true)
    }

    //Get the donors based on the blood group
    const getDonorByBlood = async(e)=>{
        //console.log('Changed',e.target.value)
        let donordataByBlood;
        setLoader(true)
        
        try{
            if(e.target.value !== 'all_groups'){
                selectedBloodGroup(e.target.value)
                const response = await api.get(`/donor/bg/${e.target.value}`)
                donordataByBlood = await response.data
                dataset(donordataByBlood);
                setLoader(false);
            }else{
                await getDonors();
                setLoader(false);
            }
        }catch(e){
            errorfun(e);
        }
    }

    useEffect(()=>{
    
        const getBloodType = async ()=>{
            let bloodType;

            try{
                const response = await api.get('/type');
                bloodType = await response.data;
                bloodTypeFun(bloodType)
            }catch(e){
                errorfun(e)
            }
        }
        // setInterval(()=>{
            getDonors();
            getBloodType();
        // },5000)
        
    },[])

    
    
    return (
        <Container >
            <Row>
                {/* <Col >
                </Col>
                
                <Datatable
                columns={coloumns}
                data={data} /> */}
            <h2 className="text-center mt-3 mb-3 h-2 text-info">Donor Details</h2>
            {(data.length <=0 && !errorMsg && !bloodGroup ) &&
                <div className="d-flex loadingLogo align-items-center justify-content-center">   
                    <FontAwesomeIcon icon={faCog} spin size="5x" className="text-muted"/>
                </div>
            }
            {(data.length <=0 && bloodGroup ) &&
                 <h3 className="text-center text-muted mt-3 mb-3 h-3">No Donor data available</h3>
            }
            
            {data.length > 0 &&

                <div>
                    <div className="col-md-2 mx-2 my-4 searchDonor">
                       <a href="/addDonor" className="btn btn-outline-primary btn-sm">Add Donor</a>
                    </div>
                    <div className="col-md-2 my-4 searchDonor">
                        <Form.Control size="sm" type="text" placeholder="Search Donor" />
                    </div>
                    <div className="col-md-2 mx-2 my-4 searchDonor">
                        {bloodType.length > 0 &&
                            <Form.Select aria-label="Blood Types" size="sm" onChange={getDonorByBlood} >
                                <option value="all_groups">Blood Group</option>
                                {bloodType.map((type,i)=>{
                                    return(
                                        <option key={i} value={type.bloodType}>{type.bloodType}</option>
                                    )
                                   
                                })}
                                
                                
                            </Form.Select>
                        }
                    
                    </div>
                    <div className="col-md-12 donorTable">
                        <Table striped bordered hover className="d-block d-sm-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Blood Group</th>
                                        <th>Phone No</th>
                                        <th>Last Donated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    data.map((donor,i)=>{
                                        return(
                                            <tr key={i} onClick={()=>handleShow(donor._id)}>
                                                <td>{i + 1}</td> 
                                                <td>{donor.firstName}</td> 
                                                <td>{donor.lastName}</td> 
                                                <td>{donor.bloodGroup}</td> 
                                                <td>{donor.phoneNo}</td> 
                                                <td>{donor.lastDonated}</td>    
                                            </tr>
                                        ) 
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                </div>
               
            } 
            {
                errorMsg && <div className="alert alert-danger text-center align-middle" role="alert">
                Something went wrong
              </div>
            } 

                 <Modal show={show} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            <FontAwesomeIcon icon={faUser}  size="lg" className="text-muted mx-3"/>   
                            Donor Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       
                        {data_byID &&
                            <Row className="p-3">
                                
                                    <div className="col-md-4 col-xs-6 py-3 py-3 form-group">
                                         <label htmlFor="firstName">First Name</label>
                                         <input type="text" defaultValue={data_byID.firstName} className="form-control" id="firstName" placeholder="First Name" />
                                    </div>
                                   
                                    <div className="col-md-4 col-xs-6  py-3 form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" defaultValue={data_byID.lastName} className="form-control" id="lastName" placeholder="Last Name" />
                                    </div>
                                    <div className="col-md-4 col-xs-6 py-3 form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="text" defaultValue={data_byID.phoneNo} className="form-control" id="phoneNumber" placeholder="PhoneNumber" />
                                    </div>
                                    <div className="col-md-4 col-xs-6 py-3 form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" defaultValue={data_byID.email} className="form-control" id="email" placeholder="Email" />
                                    </div>
                                    <div className="col-md-4 col-xs-6 py-3 form-group">
                                        <label htmlFor="bloodGroup">Blood Group</label>
                                        {bloodType.length > 0 &&
                                            <Form.Select id="bloodGroup" aria-label="BloodTypes" size="sm">
                                                <option>{data_byID.bloodGroup}</option>
                                                {bloodType.map((type,i)=>{
                                                    return(
                                                        <option key={i} value={type._id}>{type.bloodType}</option>
                                                    )
                                                
                                                })}
                                                
                                                
                                            </Form.Select>
                                        }
                                    </div>
                                    <div className="col-md-4 col-xs-6 py-3 form-group">
                                        <label htmlFor="lastDonated">Last Donated</label>
                                        <input type="text" defaultValue={data_byID.lastDonated} className="form-control" id="lastDonated" placeholder="LastDonated" />
                                    </div>
                                    <div className="col-md-3 col-xs-6 py-3 form-group">
                                        <label htmlFor="count">Count</label>
                                        <input type="text" className="form-control" id="count" placeholder="Count" />
                                    </div>
                                    <div className="col-md-9 align-items-center float-right  d-flex">
                                        
                                        <input className="form-check-input" type="checkbox" value="" id="isDonated" />
                                        <label className="form-check-label px-3" htmlFor="isDonated">
                                            Is the Donor willing to Donating now?
                                        </label>
                                    </div>
            
                                </Row>   
                        }
                      
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal> 
                {loader &&
                    <div className="loader_screen">
                        <div className="loader"></div>
                    </div>
                   
                 }  
            </Row>
        </Container>
    )
}

export default Donor
