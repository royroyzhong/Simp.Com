import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Cart','Address', 'Payment','Confirmation']

export default function CheckoutStepper() {
    const [currStep, setCurrStep] = useState(0);

    const handleNext = () => {
        setCurrStep((prev) => prev ++);
    }

    const handleBack = () => {
        setCurrStep((prev) => prev --);
    }

    return (
       < Box sx={{ 
        width: '100%',
        mt:8,
        mb:5,
        }} >
        <Stepper activeStep={currStep}>
            {steps.map((label,index) => {
                 const stepProps = {};
                 const labelProps = {};
                 return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                         </Step>
                 )
            })}
        </Stepper>
       </Box>
    )

}