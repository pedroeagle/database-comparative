import { Box, Button, MenuItem, Modal, TextField, Typography, useScrollTrigger } from "@mui/material"
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { Comparative } from "../comparative";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const EditEmployeeModal = ({ open, setOpen, employee, employeesList, setEmployeesList }) => {
    const [time, setTime] = useState({ mongo: 0, postgres: 0 })
    const [loading, setLoading] = useState(true)
    const [localEmployee, setLocalEmployee] = useState(employee)

    useEffect(() => {
        setLocalEmployee(employee)
    }, [employee])
    const setField = ({ target: { value, name } }) => {
        setLocalEmployee({ ...employee, [name]: value })
    }
    const updateEmployee = async () => {
        setLoading(true)
        for (const db of ['mongo', 'postgres']) {
            const { data: { response, time: t } } = await axios.put(`/api/${db}/employees/update`, localEmployee)
            if (db === 'postgres') {
                // setEmployeesList([response.employee, ...employeesList])
                // setResponse(response)
            }
            setTime((time) => ({ ...time, [db]: t }))
        }
        setLoading(false)
    }
    return (
        <Modal
            open={open}
            onClose={() => { setOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit {localEmployee.first_name} {localEmployee.last_name} information
                </Typography>
                <TextField style={{ width: '100%' }} onChange={setField} value={localEmployee.first_name} type='name' variant='standard' label='First Name' name='first_name' />
                <TextField style={{ width: '100%' }} onChange={setField} value={localEmployee.last_name} type='name' variant='standard' label='Last Name' name='last_name' />
                <TextField style={{ width: '100%' }} onChange={setField} value={localEmployee.gender} type='select' select variant='standard' label='Gender' name='gender'>
                    <MenuItem value='M'>M</MenuItem>
                    <MenuItem value='F'>F</MenuItem>
                </TextField>
                <TextField style={{ width: '100%' }} onChange={setField} value={localEmployee.hire_date} type='date' variant='standard' label='Hire Date' name='hire_date' />
                <TextField style={{ width: '100%' }} onChange={setField} value={localEmployee.birth_date} type='date' variant='standard' label='Birth Date' name='birth_date' />
                <Comparative
                    time={time}
                    loading={loading}
                    child={
                        <div>
                            <Button
                                style={{ marginTop: '10px', width: '100%' }}
                                color="primary"
                                variant="contained"
                                onClick={updateEmployee}
                            >
                                Save
                            </Button>
                        </div>
                    } />
            </Box>
        </Modal>
    )
}
export default EditEmployeeModal