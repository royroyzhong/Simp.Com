import Cart from "./Cart";
import { Button } from "@mantine/core"
import ComingSoon from "./ComingSoon";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as React from 'react';
import ConfirmationPage from "./ConfirmationPage";

export default function CartWrapper() {
    const [page, setPage] = useState(0);
    const steps = ['Cart', 'Payment','Confirmation']

    const handleNext = () => {
        if (page === 2) {
            setPage(0);
        } else {
            setPage(page + 1);
        }
    }

    const handleBack = () => {
        setPage(page - 1);
    }

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <Cart> </Cart>
            case 1:
                return <ComingSoon></ComingSoon>
            case 2: <ConfirmationPage> </ConfirmationPage>
            default: <Cart> </Cart>
        }
    }

    return (
        <Box>
            < Box sx={{
                width: '100%',
                mt: 8,
                mb: 5,
            }} >
                <Stepper activeStep={page}>
                    {steps.map((label, index) => {
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
            {conditionalComponent()}
            {
                page > 0 &&
                <Button onClick={handleBack} > Back</Button>
            }
            <Button onClick={handleNext} sx={{marginLeft: "500px"}}>
                {page !== 2 ? "Next" : "Back to Cart"}
            </Button>

        </Box>
    )
}