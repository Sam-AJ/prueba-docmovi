import React from 'react'
import { Grid } from '@mui/material'
import { AppTheme } from './AppTheme'
import { Form } from './Form'
import { PatientTable } from './PatientTable'

export const PatientApp = () => {
    return (
        <AppTheme>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ minHeight: '100vh', backgroundColor: 'primary.main' }}
            >
                <Form />
                <PatientTable />
            </Grid>
        </AppTheme>
    )
}
