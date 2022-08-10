import Cart from "./Cart";
import { Button } from "@mantine/core"
import ComingSoon from "./ComingSoon";
import { useState } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as React from 'react';
import ConfirmationPage from "./ConfirmationPage";
import { Stack } from "@mui/material";

// Reference: https://mui.com/material-ui/react-stepper/

export default function CartWrapper() {
    const [page, setPage] = useState(0);
    const steps = ['Cart', 'Payment', 'Confirmation']


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
            case 2:
                return <ConfirmationPage> </ConfirmationPage>
            default: <Cart> </Cart>
        }
    }

    return (
        <Stack spacing={2}>
            <Stepper activeStep={page} sx={{ mt: "30px" }}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} sx={{ color: "#5F0F40" }} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <div>
            {
                page > 0 &&
                <Button color={'#310E68'}
                    onClick={handleBack} sx={{ width: "20%" }} > Back</Button>
            }
                <Button color={"#310E68"}
                    onClick={handleNext} sx={{ marginLeft:"40%" , width: "20%" }}>
                    {page !== 2 ? "Next" : "Back to Cart"}
                </Button>
            </div>
            {conditionalComponent()}
        </Stack>
    )
}