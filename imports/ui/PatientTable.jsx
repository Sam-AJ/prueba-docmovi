import React from 'react';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { useTracker } from 'meteor/react-meteor-data';
import { PatientCollection } from '../api/PatientCollection';

export const PatientTable = () => {

    const patientData = useTracker(() => PatientCollection.find({}, { sort: { createdAt: -1 } }).fetch());

    const deleteTask = ({ _id }) => PatientCollection.remove(_id);

    return (
        <Grid item
            sx={{
                width: '95%',
                backgroundColor: 'white',
                borderRadius: 2,
                mt: 3,
                mb: 3,
            }}
        >
            <TableContainer component={Paper}>
                <Typography variant='h5' sx={{ margin: 2 }}>Pacientes</Typography>
                <Table aria-label='patient-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombres</TableCell>
                            <TableCell>Apellido Paterno</TableCell>
                            <TableCell>Apellido Materno</TableCell>
                            <TableCell>RUT</TableCell>
                            <TableCell>Región</TableCell>
                            <TableCell>Comuna</TableCell>
                            <TableCell>Código Postal</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {patientData.map((patient) => (
                            <TableRow
                                key={patient._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                
                            >
                                <TableCell>{patient.nombres}</TableCell>
                                <TableCell>{patient.aPaterno}</TableCell>
                                <TableCell>{patient.aMaterno}</TableCell>
                                <TableCell>{patient.rut}</TableCell>
                                <TableCell>{patient.region}</TableCell>
                                <TableCell>{patient.comuna}</TableCell>
                                <TableCell>{patient.cPostal}</TableCell>
                                <TableCell><button onClick={() => deleteTask(patient)}><Delete sx={{ color: red[800] }} /></button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}