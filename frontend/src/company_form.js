import React from 'react';

class CompanyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            location:"",
            contact:"",
            id:0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const targetName = target.name;
        this.setState({
            [targetName]: value
        });
    }

    handleSubmit(event) {
        this.props.onSubmit({
            name: this.state.name,
            location: this.state.location,
            contact: this.state.contact,
            id: this.state.id
        });
        event.preventDefault();
    }

    handleCancel(event) {
        this.props.onCancel("new", {name:"", location:"", contact:""});
        event.preventDefault();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.company != null) {
            this.setState({
                name: newProps.company.name,
                location: newProps.company.location,
                contact: newProps.company.contact,
                id: newProps.company.id
            });
        }
    }

    renderButtons() {
        if(this.props.mode === "new") {
            return(
                <button type="submit" className="btn btn-primary">Add Company</button>
            );
        } else {
            return(
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save Company</button>
                    <button type="submit" className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="company-form">
                <h1> Companies </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" className="form-control" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control" name="location" id="location" placeholder="Location" value={this.state.location} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Point of Contact</label>
                        <input type="text" className="form-control" name="contact" id="contact" placeholder="Point of Contact" value={this.state.contact} onChange={this.handleInputChange}/>
                    </div>
                    {this.renderButtons()}
                </form>
            </div>
        );
    }
}

export default CompanyForm;
