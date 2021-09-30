import React ,{useEffect,useState} from  'react'
import {Container, Row,Modal,Button} from 'react-bootstrap'
import "./addDonor.css";
import api from '../api'

function AddDonor() {

    //Creating state to store all the blood group
    const [bloodGroup, setbloodGroup] = useState( [] );

    //Add blood Group modal(alert box)
    const [show,setShow] = useState(false);

    //functions to handle the modal open and close
    const handleClose = ()=>setShow(false)
    const handleShow = ()=>setShow(true)

    //Get all the blood types into the dropdown in forms below
    useEffect(() => {
        const getBloodGroup = async ()=>{
            let bloodTypes;
            try{
                let resposne = await api.get('/type')
                bloodTypes = await resposne.data;
                setbloodGroup(bloodTypes);
            }catch(e){
                console.log(e)
            }
        }

        //calling the function
        getBloodGroup();

    }, []);

    return (
       <Container>
           <Row className="mt-4">
                <h2 className="h2 text-center text-secondary text-info">Add Donor</h2>

                    
                        <div className="col-md-6">
                            <small className="text-muted"><span className="text-danger pr-1">*</span>Indicates Required field.</small>
                        </div>
                       
                        <div className="col-md-6 ">
                            <button type ="button" className="btn btn-outline-primary btn-sm addBloodGroup mx-1" onClick={handleShow}>Add Blood Group</button>
                            <a href="/" type ="button" className="btn btn-outline-info btn-sm addBloodGroup mx-1 ">View Donor</a>
                        </div>
                        
                
                    <div className="col-md-4 mt-3">
                        <div className="form-group">
                            <label className="text-secondary" for="firstName">First Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="firstName" aria-describedby="firstName" placeholder="Enter First Name" />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="form-group">
                            <label className="text-secondary" for="lastName">Last Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="lastName" aria-describedby="lastName" placeholder="Enter Last Name" />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="form-group">
                            <label className="text-secondary" for="phoneNumber">Phone Number <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="phoneNumber" aria-describedby="phoneNumber" placeholder="Enter Phone Number" />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="form-group">
                            <label className="text-secondary" for="email">Phone Number <span className="text-danger">*</span></label>
                            <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter Email Address" />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div class="form-group">
                            <label className="text-secondary" for="bloodType">Blood Group<span className="text-danger">*</span></label>
                            {bloodGroup.length>0 &&
                                <select class="form-control" id="bloodType">
                                    <option>Blood Group</option>
                                    {bloodGroup.map((type,i)=>{
                                        return(
                                            <option value={type.bloodType} key={i}>{type.bloodType}</option>
                                        )
                                    })

                                    }
                                    
                                </select>
                            }
                            
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="form-group">
                            <label className="text-secondary" for="lastDonated">Last Donated</label>
                            <input type="date" className="form-control" id="lastDonated" aria-describedby="lastDonated" placeholder="Last Donated date" />
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="form-group">
                            <label className="text-secondary" for="count">Number of times donor donated</label>
                            <input type="text" className="form-control" id="count" aria-describedby="count" placeholder="Enter count of donation" />
                        </div>
                    </div>
                    
                    <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    
           </Row>

           <Modal show={show} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            Add Blood Group
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <div className="col-md-4 mt-3">
                                <div className="form-group">
                                    <label for="bgName text-secondary" className="text-secondary">Add Blood Group Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="bgName" aria-describedby="bgName" placeholder="Enter Blood group" />
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <div class="form-group">
                                    <label for="bgDescription" className="text-secondary">Blood Group Description</label>
                                    <textarea class="form-control" id="bgDescription" rows="3"></textarea>
                                </div>
                            </div>
                        </Row>
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
       </Container>
    )
}

export default AddDonor
