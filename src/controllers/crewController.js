/* Green Work ERP by Victor Martinez */

const {StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const Crew = require("../models/crew");
const Employee = require("../models/employee");

const createCrew = async (req, res) => {
    // recieve our data through body
    const { crew_name, employees, crew_leader } = req.body; 
    
    // check that data is valid
    if(!crew_name || !employees || !crew_leader ){
        throw new CustomError.BadRequestError('Please provide all the details');
    }

    const crewCreatedId = await Crew.createCrew(crew_name, crew_leader)
    if(!crewCreatedId){
        throw new CustomError.BadRequestError('crew creation failed');
    }
    
    const employeeListId = JSON.stringify(employees);
    // pass list of employees to crew model
    const employeeListAdded = await Crew.addEmployeesToCrews(crewCreatedId, employeeListId);

    res.status(StatusCodes.CREATED).json({ msg: employeeListAdded });
}

const addEmployeeToCrew = async (req, res) =>{
    const {id: crew_id} = req.params;
    const {employees} = req.body;

    if(!employees){
        throw new CustomError.BadRequestError('Please include valid data');
    }

    const employeeListId = JSON.stringify(employees);
    // pass list of employees to crew model
    const employeeListAdded = await Crew.addEmployeesToCrews(crew_id, employeeListId);

    res.status(StatusCodes.OK).json({ msg: employeeListAdded });
}

const getAllCrew = async (req, res) =>{
    const crews = await Crew.getAllCrews();
    res.status(StatusCodes.OK).json({ msg: crews });
}

const getSingleCrew = async (req, res) => {
    const {id: crewId} = req.params;

    const listOfCrew = await Crew.getCrewEmployeeById(crewId);

    res.status(StatusCodes.OK).json({ Employee: listOfCrew, listLength: listOfCrew.length});
}

const updateCrew = async (req, res) => {
    const {id: crewId} = req.params;
    const {crew_name, crew_leader} = req.body;

    if(!crew_name || !crew_leader){
        throw new CustomError.BadRequestError("Invalid Entries");
    }
   
    await Crew.updateCrew(crewId, crew_name, crew_leader);

    res.status(StatusCodes.OK).json({ msg: 'Updated Succesfully Crew' });
}

const deleteCrewEmployee = async (req, res) => {
    const {id: crewId} = req.params;
    const {employee_id} = req.body;

    if(!employee_id || !crewId){
        throw new CustomError.BadRequestError('Invalid data');
    }

    await Crew.deleteCrewEmployee(crewId, employee_id);

    res.status(StatusCodes.OK).json({ msg: 'Deleted Employee from crew' });
}

module.exports = {
    createCrew,
    getAllCrew,
    getSingleCrew,
    deleteCrewEmployee,
    updateCrew,
    addEmployeeToCrew
}