import React from 'react';
import CompanyList from './company_list.js';
import CompanyForm from './company_form.js';

import axios from 'axios';

const API_BASE = "http://localhost:3000";

class Companies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            mode: "new",
            company: {name:"", location:"", contact:""}
        };

        this.loadCompanies = this.loadCompanies.bind(this);
        this.addCompany = this.addCompany.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
    }

    render() {
        return (
            <div className="companies">
                <br/>
                <CompanyList companies={this.state.companies}
                onDelete={(id) => this.deleteCompany(id)}
                onEdit={(mode, company) => this.updateForm(mode, company)}/>
                <br/>
                <br/>
                <CompanyForm
                    onSubmit={(company) => this.formSubmitted(company)}
                    onCancel={(mode, company) => this.updateForm(mode, company)}
                    mode={this.state.mode}
                    company={this.state.company}
                />
            </div>
        );
    }

    updateForm(mode, companyVals) {
        this.setState({
            company: Object.assign({}, companyVals),
            mode: mode
        });
    }

    clearForm() {
        this.updateForm("new", {name:"", location:"", contact:""});
    }

    formSubmitted(company) {
        if(this.state.mode === "new") {
            this.addCompany(company);
        } else {
            this.updateCompany(company);
        }

        this.clearForm();
    }

    loadCompanies() {
        axios.get(`${API_BASE}/companies`).then(res => {
            this.setState({ companies: res.data });
            console.log(`Data loaded! = ${this.state.companies}`)
        })
        .catch(err => console.log(err));
    }

    addCompany(newCompany) {
        axios.post(`${API_BASE}/companies`, newCompany).then(res => {
            res.data.key = res.data.id;
            this.setState({ companies: [...this.state.companies, res.data] });
        })
        .catch(err => console.log(err));
    }

    updateCompany(company) {
        axios.put(`${API_BASE}/companies/${company.id}`, company).then(res => {
            this.loadCompanies();
        })
        .catch(err => console.log(err));
    }

    deleteCompany(companyId) {
        let filteredData = this.state.companies.filter(item => item.id !== companyId);
        this.setState({companies: filteredData});
        axios.delete(`${API_BASE}/companies/${companyId}`).then(res => {
            console.log(`Record Deleted`);
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log("Companies mounted");
        this.loadCompanies();
    }
}

export default Companies;
