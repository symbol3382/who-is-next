import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, IconButton, TextField, Tooltip} from "@mui/material";
import {Add, Close, Shuffle} from "@mui/icons-material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import './dashboard.css';

const Dashboard = (props) => {
    const [fields, setFields] = useState(['']);
    const [allowAddNewField, setAllowAddNewField] = useState(false);
    const [randomResult, setRandomResult] = useState(null);

    useEffect(() => {
        if (!fields || !fields.length) {
            setAllowAddNewField(true);
        } else {
            let disable = false;
            fields.forEach(field => {
                if (!field) {
                    disable = true;
                }
            })
            setAllowAddNewField(!disable);
        }
    }, [fields]);

    const handleNameUpdate = (index) => (event) => {
        let newFields = [...fields];
        newFields[index] = event.target.value;
        setFields(newFields);
    }
    const removeField = (index) => () => {
        let newFields = [...fields];
        newFields = newFields.filter((value, i) => i !== index);
        setFields(newFields);
    }

    const addNewField = () => {
        let currentFields = [...fields];
        currentFields.push("");
        setAllowAddNewField(false);
        setFields(currentFields);
    }

    const generateFields = () => {
        let newFields = fields.filter(field => field);
        let length = newFields.length;
        let random = Math.floor(Math.random() * length);
        setRandomResult(newFields[random]);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // Generate random number
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    const shuffleList = () => {
        let newFields = fields.filter(field => field);
        let shuffled = shuffleArray(newFields);
        setRandomResult(shuffled)
    }

    return <>
        <Grid container spacing={3} padding={"2vh"} justifyContenr={"center"}>
            <Grid item lg={3}>
                <Card width={"100%"} sx={{height: "96vh", overflow: "scroll"}}>
                    <CardContent sx={{height: "100%"}}>
                        <Grid container
                              justifyContent={"center"}
                              alignItems={"center"}
                            // direction={"column"}
                              spacing={3}

                        >
                            {
                                fields.map((value, index) => {
                                    return <Grid
                                        item
                                        container
                                        spacing={1}
                                        // lg={12}
                                        key={index}
                                        // direction={"column"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <Grid item lg={10}>

                                            <TextField
                                                onChange={handleNameUpdate(index)}
                                                value={value}
                                                label="Enter Name"
                                                key={index}
                                                size={"small"}
                                                fullWidth={true}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item lg={2}>
                                            <IconButton>
                                                <Close onClick={removeField(index)}/>
                                            </IconButton>
                                        </Grid>

                                    </Grid>
                                })
                            }

                            <Grid item>
                                <Button
                                    variant={"contained"}
                                    onClick={addNewField}
                                    disabled={!allowAddNewField}
                                > <Add/> Add New Item
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item lg={9}>
                <Card sx={{height: "96vh"}}>
                    <CardContent sx={{height: "100%"}}>
                        <Grid container
                              justifyContent={"center"}
                              sx={{height: "100%"}}
                              alignItems={"center"}
                        >
                            {randomResult
                                ? <Grid item lg={12} className={"randomResult"}>
                                    <div className={"code"}>
                                        {Array.isArray(randomResult) ?
                                            randomResult.map(result => {
                                                return <>
                                                    {result} <br/>
                                                </>
                                            })
                                        :
                                        randomResult.toUpperCase()
                                    }
                                    </div>
                                </Grid>
                                : <></>
                            }
                            <Tooltip
                                title={fields.filter(field => field).length
                                    ? ''
                                    : "Add some item to generate random guess"}
                            >
                                <Grid item>
                                    <Button
                                        onClick={generateFields}
                                        variant={"contained"}
                                        disabled={!fields.filter(field => field).length}
                                    >
                                        <AutoAwesomeIcon/> Get Random Name
                                    </Button>
                                </Grid>
                            </Tooltip>

                            <Tooltip title={fields.filter(field => field).length <= 1
                                ? "Add more than two items to shuffle"
                                : ""
                            } sx={{marginLeft: 2}}>
                                <Grid item>
                                    <Button
                                        onClick={shuffleList}
                                        variant={"contained"}
                                        disabled={fields.filter(field => field).length <= 1}
                                    >
                                        <Shuffle/> Shuffle
                                    </Button>
                                </Grid>
                            </Tooltip>
                        </Grid>
                    </CardContent>
                </Card>

            </Grid>
        </Grid>

    </>;
}

export default Dashboard;