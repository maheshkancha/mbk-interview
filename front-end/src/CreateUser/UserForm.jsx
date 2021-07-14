import React, { Component } from 'react';
import {
    TextField,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
    Button
} from '@material-ui/core';
import './Userform.css';

class UserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            address: '',
            hobbies: [
                { hobby: "Cycling", selected: true },
                { hobby: "Reading", selected: false },
                { hobby: "Coding", selected: false }
            ],
            education: ["PhD", "Masters", "Bachelor", "Matriculate"],
            highestEducation: "Masters",
            isSaveEnabled: false
        }
    }

    handleTextChange = (e, type) => {
        let value = e.target.value;
        this.setState({ [type]: value });
    }

    handleHobbiesChange = selectedHobby => {
        const { hobbies } = this.state;
        const newHobbies = [...hobbies];
        const selectedHobbyIndex = hobbies.findIndex(h => h.hobby === selectedHobby.hobby);
        newHobbies[selectedHobbyIndex] = { ...newHobbies[selectedHobbyIndex], selected: !newHobbies[selectedHobbyIndex].selected };

        this.setState({ hobbies: newHobbies });
    }

    handleEducationChange = e => {
        this.setState({ highestEducation: e.target.value });
    }

    saveUser = () => {
        const { hobbies, highestEducation, name, email, address } = this.state;
        const userHobbies = hobbies.reduce((acc, cur) => {
            if(cur.selected) 
                acc.push(cur.hobby);
            return acc;
        }, [])

        const userDetails = {
            name,
            email,
            address,
            hobbies: userHobbies,
            highestEducation
        }
        console.log('Save clicked', userDetails);
    }


    render() {
        const { hobbies, education, highestEducation, name, email, address } = this.state;

        const getHobbiesEl = hobbies.map(h => (<FormControlLabel
            key={h.hobby}
            control={<Checkbox checked={h.selected} onChange={() => this.handleHobbiesChange(h)} name={h.hobby.toLowerCase()} />}
            label={h.hobby} />
        ))
        const getHighestEducationEl = education.map(edu => (
            <FormControlLabel key={edu} value={edu} control={<Radio />} label={edu} />
        ))

        return (
            <form noValidate>
                <TextField id="outlined-basic" label="Name" value={name} variant="outlined" onChange={e => this.handleTextChange(e, 'name')} />
                <TextField id="outlined-basic" label="Email" value={email} variant="outlined" onChange={e => this.handleTextChange(e, 'email')} />
                <TextField id="outlined-basic" label="Address" value={address} variant="outlined" onChange={e => this.handleTextChange(e, 'address')} />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Hobbies</FormLabel>
                    <FormGroup className="hobbies">
                        {getHobbiesEl}
                    </FormGroup>
                </FormControl>

                <FormControl component="fieldset" >
                    <FormLabel component="legend">Highest Education</FormLabel>
                    <RadioGroup aria-label="education" className="education" name="education" value={highestEducation} onChange={e => this.handleEducationChange(e)}>
                        {getHighestEducationEl}
                    </RadioGroup>
                </FormControl>

                <Button variant="contained" color="primary" onClick={this.saveUser}>Save User Details</Button>
            </form>
        );
    }
}

export default UserForm;
