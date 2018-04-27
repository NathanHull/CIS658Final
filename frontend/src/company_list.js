import React from 'react';
import {Link} from 'react-router-dom';

const CompanyListItem = (props) => {
    return (
        <tr>
            <td className="col-md-3">{props.name}</td>
            <td className="col-sm-3">{props.location}</td>
            <td className="col-md-3">{props.contact}</td>
            <td className="col-md-3 btn-toolbar">
                <Link to={`/companies/${props.id}/entries`}>
                    <button className="btn btn-success btn-sm">
                        <i className="glyphicon glyphicon-list"></i> Entries
                    </button>
                </Link>
                <button className="btn btn-warning btn-sm" onClick={event => props.onEdit("edit",props)}>
                    <i className="glyphicon glyphicon-pencil"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
                    <i className="glyphicon glyphicon-remove"></i> Delete
                </button>
            </td>
        </tr>
    );
}

const CompanyList = (props) => {
    const companyItems = props.companies.map((company) => {
        return (
            <CompanyListItem
                name={company.name}
                location={company.location}
                contact={company.contact}
                id={company.id}
                key={company.id}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
            />
        )
    });

    return (
        <div className="company-list">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-md-3">Company Name</th>
                        <th className="col-md-3">Location</th>
                        <th className="col-md-3">Contact</th>
                    </tr>
                </thead>

                <tbody>
                    {companyItems}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;
