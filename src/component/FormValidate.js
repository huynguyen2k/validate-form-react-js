import React, { Component } from 'react'
import '../assets/css/style.css'


export default class FormValidate extends Component {

    state = {
        inputs: {
            'first-name': '',
            'last-name': '',
            'email': '',
            'password': '',
            'confirm-password': '',
            'date-of-birth': '',
            'gender': '',
            'hobbies': [],
            'city': ''
        },
        errors: {
            'first-name': '',
            'last-name': '',
            'email': '',
            'password': '',
            'confirm-password': '',
            'date-of-birth': '',
            'gender': '',
            'hobbies': '',
            'city': ''
        }
    }

    validateForm = (event) => {
        let {name, value} = event.target

        this.handleInputValidation(name, value)
    }

    handleInputValidation = (name, value) => {
        // const inputs = { ...this.state.inputs, [name]: value }
        // const errors = { ...this.state.errors }

        const inputs = this.state.inputs
        const errors = this.state.errors
        
        switch (name) {
            case 'email': {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                
                if (emailRegex.test(value)) {
                    errors[name] = ''
                    inputs[name] = value
                } else {
                    errors[name] = 'Email is not valid!'
                }
                break
            }

            case 'confirm-password': {
                if (value === inputs['password']) {
                    errors[name] = ''
                    inputs[name] = value
                } else {
                    errors[name] = 'Password confirm is not match!'
                }
                break
            }

            case 'hobbies': {
                let isValid = true

                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        isValid = false
                    }
                } else {
                    let index = inputs[name].indexOf(value)

                    if (index === -1) {
                        inputs[name].push(value)
                    } else {
                        inputs[name].splice(index, 1)

                        if (inputs[name].length === 0) {
                            isValid = false
                        }
                    }
                }

                if (isValid) {
                    errors[name] = ''
                } else {
                    let errorMessage = name.split('-').join(' ') + ' is required!'
                    errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
                    errors[name] = errorMessage
                }
    
                break
            }


            default: {
                if (value.trim() === '') {
                    let errorMessage = name.split('-').join(' ') + ' is required!'
                    errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
                    errors[name] = errorMessage
                } else {
                    errors[name] = ''
                    inputs[name] = value
                }
            }
        }

        this.setState({
            inputs,
            errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const inputs = Object.entries(this.state.inputs)
        
        inputs.forEach(([name, value]) => this.handleInputValidation(name, value))

        const errors = Object.entries(this.state.errors)

        let isValid = errors.every(([, value]) => value === '')

        if (isValid) {
            console.log(this.state.inputs)
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="background"></div>
                <form onSubmit={this.handleSubmit} className="form-validate" method="post" action="#">
                    <h1 className="form-title">Sign up</h1>
                    <div className="input-group">
                        <label htmlFor="first-name">First name</label>
                        <input onBlur={this.validateForm} type="text" id="first-name" name="first-name" placeholder="First name"/>
                        <p className="error-message">{this.state.errors['first-name']}</p>
                    </div>
                    <div className="input-group">
                        <label htmlFor="last-name">Last name</label>
                        <input onBlur={this.validateForm} type="text" id="last-name" name="last-name" placeholder="Last name"/>
                        <p className="error-message">{this.state.errors['last-name']}</p>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onBlur={this.validateForm} type="text" id="email" name="email" placeholder="Email" />
                        <p className="error-message">{this.state.errors['email']}</p>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onBlur={this.validateForm} type="password" id="password" name="password" placeholder="Password" />
                        <p className="error-message">{this.state.errors['password']}</p>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input onBlur={this.validateForm} type="password" id="confirm-password" name="confirm-password" placeholder="Confirm password" />
                        <p className="error-message">{this.state.errors['confirm-password']}</p>
                    </div>
                    <div className="input-group">
                        <label htmlFor="date-of-birth">Date of birth</label>
                        <input onBlur={this.validateForm} type="date" id="date-of-birth" name="date-of-birth" placeholder="Date of birth" />
                        <p className="error-message">{this.state.errors['date-of-birth']}</p>
                    </div>
                    <div className="input-group">
                        <label>Gender</label>
                        <div className="wrap-input">
                            <div className="input-box">
                                <label htmlFor="male">Male</label>
                                <input onChange={this.validateForm} id="male" type="radio" name="gender" value="male" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="female">Female</label>
                                <input onChange={this.validateForm} id="female" type="radio" name="gender" value="female" />
                            </div>
                        </div>
                        <p className="error-message">{this.state.errors['gender']}</p>
                    </div>
                    <div className="input-group">
                        <label>Hobbies</label>
                        <div className="wrap-input">
                            <div className="input-box">
                                <label htmlFor="music">Music</label>
                                <input onClick={this.validateForm} id="music" type="checkbox" name="hobbies" value="music" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="reading-book">Reading book</label>
                                <input onClick={this.validateForm} id="reading-book" type="checkbox" name="hobbies" value="reading book" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="playing-game">Playing game</label>
                                <input onClick={this.validateForm} id="playing-game" type="checkbox" name="hobbies" value="playing game" />
                            </div>
                        </div>
                        <p className="error-message">{this.state.errors['hobbies']}</p>
                    </div>
                    <div className="input-group">
                        <label>City</label>
                        <select name="city" onChange={this.validateForm}>
                            <option value="">Choose city</option>
                            <option value="hcm">Hồ Chí Minh</option>
                            <option value="ct">Cần Thơ</option>
                            <option value="dn">Đà Nẵng</option>
                        </select>
                        <p className="error-message">{this.state.errors['city']}</p>
                    </div>
                    <div className="input-group text-right">
                        <button className="btn btn-primary">Sign up</button>
                    </div>
                </form>
            </div>
        )
    }
}
