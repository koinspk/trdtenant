import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const steps = ['Company', 'ADD Database', 'SMTP Configuration'];


export default function CompanyForm() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());


  const OrganizationSchema = Yup.object().shape({
    organizationname: Yup.string(),
    address1: Yup.string(),
    address2: Yup.string(),
    emailid: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string(),
    contactno: Yup.string(),
    state: Yup.string(),

  });


  const DatabaseSchema = Yup.object().shape({
    databasename: Yup.string(),
    databasepassword: Yup.string(),

  });

  const SmtpSchema = Yup.object().shape({
    mailparameter: Yup.string(),
    smtphostname: Yup.string(),
    smtpusername: Yup.string(),
    smtppassword: Yup.string(),
    smtpport: Yup.string(),
    smtptimeout: Yup.string(),
  });


  const schema = Yup.object().shape({
    organization: OrganizationSchema,
    database: DatabaseSchema,
    smtp: SmtpSchema,
  });

  console.log(schema);

  const initialValues = {
    organization: { organizationname: "", address1: "", address2: "", emailid: "", password: "", contactno: "", state: "" },
    database: { databasename: "", databasepassword: "" },
    smtp: { mailparameter: "", smtphostname: "", smtpusername: "", smtppassword: "", smtpport: "", smtptimeout: "" }
  };


  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const handlesubmit = async (values) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/organisation`, values)
  }

 

  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }} className="mainwrapper">
        <Stepper activeStep={activeStep} sx={{ marginBottom: 2 }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Box sx={{ mt: 4, mb: 1, textAlign: 'center' }}>
              All steps completed - you&apos;re finished

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'center' }}>
                <Button onClick={handleReset} className="btn btn_black">Reset</Button>
              </Box>
            </Box>
          </React.Fragment>
        ) : (





          <React.Fragment>

            <Formik
              initialValues={{
                ...initialValues
              }}
              validationSchema={schema}

              onSubmit={handlesubmit}
            >
              {({ errors, values, touched, setValues, setFieldValue, handleChange }) => (
                <Form>
                  {
                    activeStep == 0 &&


                    <Grid container spacing={3}>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.organization.organizationname}
                          onChange={handleChange}
                          id="organizationname"
                          label="Organization Name"
                          fullWidth
                          autoComplete="given-name"
                          variant="standard"
                          name="organization.organizationname"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.organization.address1}
                          onChange={handleChange}
                          id="address"

                          label="Address1"
                          fullWidth
                          autoComplete="Address"
                          variant="standard"
                          name="organization.address1"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.organization.address2}
                          onChange={handleChange}
                          id="address"

                          label="Address2"
                          fullWidth
                          autoComplete="street"
                          variant="standard"
                          name={`organization.address2`}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.organization.state}
                          onChange={handleChange}
                          id="state"

                          label="Street / Region"
                          fullWidth
                          autoComplete="state"
                          variant="standard"
                          name={`organization.state`}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.organization.emailid}
                          onChange={handleChange}
                          id="emailid"
                          label="Email-ID"
                          fullWidth
                          autoComplete="family-name"
                          variant="standard"
                          name={`organization.emailid`}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.organization.password}
                          onChange={handleChange}
                          id="password"

                          label="Password"
                          fullWidth
                          autoComplete="Password"
                          variant="standard"
                          name={`organization.password`}
                        />
                      </Grid>



                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.organization.contactno}
                          onChange={handleChange}
                          id="contactno"

                          label="Contact No"
                          fullWidth
                          autoComplete="contactno"
                          variant="standard"
                          name={`organization.contactno`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <input type="file" />
                      </Grid>


                    </Grid>

                  }


                  {
                    activeStep == 1 &&

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.database.databasename}
                          onChange={handleChange}
                          id="firstName"

                          label="Database Name"
                          fullWidth
                          autoComplete="given-name"
                          variant="standard"
                          name={`database.databasename`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values.database.databasepassword}
                          onChange={handleChange}
                          id="lastName"

                          label="Password"
                          fullWidth
                          autoComplete="family-name"
                          variant="standard"
                          name={`database.databasepassword`}
                        />
                      </Grid>
                    </Grid>


                  }

                  {
                    activeStep == 2 &&
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            value={values.smtp.mailparameter}
                            onChange={handleChange}
                            id="mailparameter"

                            label="Mail Parameter"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            name={`smtp.mailparameter`}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            value={values.smtp.smtphostname}
                            onChange={handleChange}
                            id="lastName"

                            label="SMTP Hostname"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            name={`smtp.smtphostname`}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            value={values.smtp.smtpusername}
                            onChange={handleChange}
                            id="firstName"

                            label="SMTP Username"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            name={`smtp.smtpusername`}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            value={values.smtp.smtppassword}
                            onChange={handleChange}
                            id="lastName"
                            // name="smtppassword"
                            label="SMTP Password"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            name={`smtp.smtppassword`}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            value={values.smtp.smtpport}
                            onChange={handleChange}
                            id="firstName"
                            label="SMTP Port"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            name={`smtp.smtpport`}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            value={values.smtp.smtptimeout}
                            onChange={handleChange}
                            id="lastName"
                            label="SMTP Timeout"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            name={`smtp.smtptimeout`}
                          />

                        </Grid>
                      </Grid>


                    </>

                  }


                  <Grid container justifyContent={'space-between'} sx={{ mt: 5 }} className='stepper_control'>
                    <Grid item>
                      <Button
                        className='btn btn_black'
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item sx={{ flexDirection: 'row', display: 'flex' }}>
                      {isStepOptional(activeStep) && (
                        <Grid item>
                          <Button onClick={handleSkip} sx={{ mr: 1 }} className='btn  btn_outline_light' variant="outlined" color="secondary">
                            Skip
                          </Button>
                        </Grid>
                      )}

                      {activeStep != 2 &&
                        <Button onClick={handleNext} className="btn_primary">
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      }

                      {activeStep === 2 &&
                        <Button type="submit" className=" btn btn_primary">Submit</Button>

                       }
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>



          </React.Fragment>

        )}
      </Box>






    </React.Fragment>
  );
}