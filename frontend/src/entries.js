import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const API_BASE = 'http://localhost:3000';
//const API_BASE = "https://still-forest-88986.herokuapp.com/";

const EntryItem  = (props) =>  {
  return (
    <tr>
      <th className="col-md-3">{props.name}</th>
      <th className="col-md-3">{props.Description}</th>
      <th className="col-md-3">{props.created_at}</th>
      <th className="col-md-3">{props.amount}</th>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/companies/${props.company_id}/entries/${props.id}`}>
            <button className="btn btn-warning btn-sm">
              <i className="glyphicon glyphicon-pencil"></i> Edit
            </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}

class Entries extends React.Component {

  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state = {
      entries: [],
      company_id: id,
      company: {}
    };

    this.loadEntries = this.loadEntries.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  loadEntries() {
    axios
    .get(`${API_BASE}/companies/${this.state.company_id}/entries`)
    .then(res => {
      this.setState({ entries: res.data });
      console.log(`Data loaded! = ${this.state.entries}`)
    })
    .catch(err => console.log(err));

    axios
    .get(`${API_BASE}/companies/${this.state.company_id}`)
    .then(res => {
      this.setState({ company: res.data });
      console.log(`Data loaded! = ${this.state.entries}`)
    })
    .catch(err => console.log(err));
  }

  deleteEntry(id) {
    let filteredArray = this.state.entries.filter(item => item.id !== id)
    this.setState({entries: filteredArray});
    axios
    .delete(`${API_BASE}/companies/${this.state.company_id}/entries/${id}`)
    .then(res => {
      console.log(`Entry Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Entries mounted!')
    this.loadEntries();
  }

  render() {

    const entryItems = this.state.entries.map((entry)  => {
      return (
        <EntryItem
          name={entry.name}
          description={entry.description}
          created_at = {entry.created_at}
          amount = {entry.amount}
          company_id = {entry.company_id}
          id={entry.id}
          key={entry.id}
          onDelete={this.deleteEntry}
        />
      )
    });

    const headerString = (this.state.entries.count === 0)
      ? "Loading..." : `Posts for ${this.state.company.name}`
    return (
      <div className="companies">
        <h1> {headerString} </h1>
        <div className="entry-list">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col-md-3">Name</th>
                <th className="col-md-3">Description</th>
                <th className="col-md-3">Created On</th>
                <th className="col-md-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {entryItems}
            </tbody>
          </table>
          <Link to={`/companies/${this.state.company_id}/entries/create`}>
              <button className="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-plus"></i> Create
              </button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
            <i className="glyphicon glyphicon-menu-left"></i> Back
          </button>
        </div>
      </div>
    );
  }
}

export default Entries;
