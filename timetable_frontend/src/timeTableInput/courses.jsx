import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';


const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


class Courses extends Component {

    state = {
        courses: [
            {name: '', session: '', teacher: '', crHouurs: ''}
        ],
        width: 0, height: 0,
        marginLeftTextField: 0 
    }

    handleChange = (e, i, j) => {
        const crditHourArray = [[1, 1, 1], [1, 2], [2, 1], [3]];

        const courses = [...this.state.courses]
        const name = e.target.name;

        let value = e.target.value;

        if(name === "crHouurs"){
            value = crditHourArray[value];
        }

        courses[i][name] = value;
        this.setState({courses})
    }

    addMoreField = () => {
        const courses = [...this.state.courses, {name: '', session: '', teacher: '', crHouurs: []}];
        this.setState({courses});
    }

    handleSubmit = () => {
        this.props.onCourses(this.state.courses);
    }

    handleRemove = (i) => {
        const courses = [...this.state.courses];
        if(courses.length > 1){
            courses.splice(i, 1);
            this.setState({courses})
        }else{
            alert('Add atleast one Course')
        }
    }

    setMarginLeft = () => {
        if(window.innerWidth <= 700){
            this.setState({marginLeftTextField: 20})
        }else{
            this.setState({marginLeftTextField: 0})
        }
    }

    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if(i === 1){
            this.setMarginLeft();
        }
    };
    
    componentDidMount() {
        window.addEventListener('resize', () => this.updateDimensions(1));
        this.setMarginLeft();
        
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));
        this.setMarginLeft();
    }
    
    render(){
        const {courses} = this.state;
        const {onTeachersName, onSessionsName} = this.props;
        return (
            <form noValidate>
                <Grid container row alignItems="center" item xs={12} style={{marginTop: 60}}>
                    {
                        courses.map((course, i) => {

                            let crditValue = '';
                            if(course.crHouurs.length === 3){
                                crditValue = 0;
                            }else if(course.crHouurs[0] === 1){
                                crditValue = 1;
                            }else if(course.crHouurs[0] === 2){
                                crditValue = 2;
                            }else if(course.crHouurs[0] === 3){
                                crditValue = 3;
                            }
                                

                            return (
                                <Grid container key = {i} direction="row" justify="center" alignItems="center" item xs={8} style={{marginTop: 50, marginLeft: 80}}>  
                                    <Grid  container direction="row" justify="flex-end" alignItems="center" item sm={2} >                                  
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick = {() => this.handleRemove(i)}
                                        >
                                            X
                                        </Button>
                                    </Grid>

                                    <Grid container direction="row" justify="center" alignItems="center" item sm={3} style={{marginLeft: 30}}>                                    
                                        <CssTextField
                                            label = {`Course-${i+1} Name`}
                                            variant = "outlined"
                                            id = "custom-css-outlined-input"
                                            value = {course.name}
                                            name = "name"
                                            onChange = {(e) => this.handleChange(e, i)}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid container direction="row" justify="center" alignItems="center" item sm={2} >
                                        <FormControl>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={course.session}
                                                name = "session"
                                                onChange={(e) => this.handleChange(e, i)}
                                                >
                                                {
                                                    onSessionsName.map(session => {
                                                        return (<MenuItem value={session}>{session}</MenuItem>);
                                                    })
                                                }
                                            </Select>
                                            <FormHelperText>Select Class</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" item sm={2} >
                                        <FormControl>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={course.teacher}
                                                name = "teacher"
                                                onChange={(e) => this.handleChange(e, i)}
                                                >
                                                {
                                                    onTeachersName.map(teacher => {
                                                        return (<MenuItem value={teacher}>{teacher}</MenuItem>);
                                                    })
                                                }
                                            </Select>
                                            <FormHelperText>Select Teacher</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" item sm={2} >
                                        <FormControl>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={crditValue}
                                                name = "crHouurs"
                                                onChange={(e) => this.handleChange(e, i)}
                                                >
                                                <MenuItem value={0}>1, 1, 1</MenuItem>
                                                <MenuItem value={1}>1, 2</MenuItem>
                                                <MenuItem value={2}>2, 1</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                            </Select>
                                            <FormHelperText>Select Credit Hourse</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                         <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start" 
                            item sm={2}
                            style={{marginTop: 40}}
                        >
                        <Button onClick={this.addMoreField} variant="contained" color="primary">
                            Add more
                        </Button>
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    item xs={12}
                    style={{ marginTop: 40}}
                >
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#90ee90'}}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick = {this.handleSubmit}
                    >
                        Submit and Next
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default Courses;