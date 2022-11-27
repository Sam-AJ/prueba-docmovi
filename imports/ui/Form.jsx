import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, FormControl, Grid, InputLabel, NativeSelect, OutlinedInput, TextField, Typography } from '@mui/material';
import { formatRut, validateRut } from 'rutlib';
import Swal from 'sweetalert2';
import { PatientCollection } from '../api/PatientCollection';
import regionData from '../api/comunas-regiones.json';

export const Form = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [region, setRegion] = useState('');

    const [comuna, setComuna] = useState([]);

    const patientData = useTracker(() => PatientCollection.find({}).fetch());

    const handleRegion = (event) => {
        setRegion(event.target.value);
    }

    const onFormSubmit = (data) => {
        const patient = data;
        patient.createdAt = new Date();
        patient.rut = formatRut(patient.rut);

        if (patientData.find((p) => p.rut === patient.rut)) {
            Swal.fire({
                text: 'Ya existe un paciente registrado con ese RUT',
                icon: 'error',
            });
        } else {
            PatientCollection.insert(patient);

            Swal.fire({
                text: 'El paciente ha sido registrado correctamente',
                icon: 'success',
            });

            reset();
        }
    }

    useEffect(() => {
        const getComunas = regionData.regiones.filter(result => result.region == region);
        setComuna(getComunas);
    }, [region]);

    return (
        <Grid item
            sx={{
                width: { sm: 450 },
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 2,
                mt: 3,
                mx: 1.5
            }}
        >
            <Typography variant='h5' sx={{ mb: 1 }}>Registro de Pacientes</Typography>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                        <TextField
                            error={!!errors?.nombres}
                            label="Nombre"
                            type="text"
                            fullWidth
                            {...register('nombres', {
                                required: 'Ingrese su nombre', pattern: {
                                    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/,
                                    message: "Ingrese un nombre válido"
                                }
                            })}
                            helperText={errors?.nombres ? errors.nombres.message : null}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                        <TextField
                            error={!!errors?.aPaterno}
                            label="Apellido Paterno"
                            type="text"
                            fullWidth
                            {...register('aPaterno', {
                                required: 'Ingrese su apellido paterno', pattern: {
                                    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/,
                                    message: "Ingrese un apellido válido"
                                }
                            })}
                            helperText={errors?.aPaterno ? errors.aPaterno.message : null}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                        <TextField
                            error={!!errors?.aMaterno}
                            label="Apellido Materno"
                            type="text"
                            fullWidth
                            {...register('aMaterno', {
                                required: 'Ingrese su apellido materno', pattern: {
                                    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/,
                                    message: "Ingrese un apellido válido"
                                }
                            })}
                            helperText={errors?.aMaterno ? errors.aMaterno.message : null}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                        <TextField
                            error={!!errors?.rut}
                            label="RUT"
                            type="text"
                            fullWidth
                            {...register('rut', { required: 'Ingrese su RUT', validate: validateRut })}
                            helperText={errors?.rut ? errors.rut.message : null}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="outlined" htmlFor="select-region">Región</InputLabel>
                            <NativeSelect
                                onClick={(e) => handleRegion(e)}
                                inputProps={{
                                    id: 'select-region'
                                }}
                                {...register('region', { required: true })}
                                defaultValue={''}
                                input={<OutlinedInput label="Región" />}
                            >
                                <option value='' disabled hidden></option>
                                {
                                    regionData.regiones.map(result => <option key={result.region} value={result.region}>{result.region}</option>)
                                }
                            </NativeSelect>
                            {errors.region?.type === 'required' && <Typography sx={{
                                color: 'error.main',
                                fontSize: 12,
                                mx: 1.75,
                                mt: 0.377,
                                mb: 0
                            }}
                            >Seleccione su región</Typography>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="outlined" htmlFor="select-comuna">Comuna</InputLabel>
                            <NativeSelect
                                inputProps={{
                                    id: 'select-comuna'
                                }}
                                {...register('comuna', { required: true })}
                                defaultValue={''}
                                input={<OutlinedInput label="Comuna" />}
                            >
                                <option value='' disabled hidden></option>
                                {
                                    comuna.map((result) => (
                                        result.comunas.map((result) => (
                                            <option key={result} value={result}>{result}</option>
                                        ))
                                    ))
                                }
                            </NativeSelect>
                            {errors.comuna?.type === 'required' && <Typography sx={{
                                color: 'error.main',
                                fontSize: 12,
                                mx: 1.75,
                                mt: 0.377,
                                mb: 0
                            }}
                            >Seleccione su comuna</Typography>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                        <TextField
                            error={!!errors?.cPostal}
                            label="Código Postal"
                            type="number"
                            fullWidth
                            {...register('cPostal', {
                                required: 'Ingrese su código postal',
                                minLength: {
                                    value: 7,
                                    message: 'El código debe ser de siete digitos'
                                },
                                maxLength: {
                                    value: 7,
                                    message: 'El código debe ser de siete digitos'
                                }
                            })}
                            helperText={errors?.cPostal ? errors.cPostal.message : null}
                        />
                    </Grid>

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={6} sx={{ mt: 2 }}>
                            <Button
                                variant='contained'
                                fullWidth
                                type='submit'
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}
