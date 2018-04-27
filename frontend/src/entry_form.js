import React from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';
//const API_BASE = "https://still-forest-88986.herokuapp.com/";

class EntryForm extends React.Component {

  constructor(props) {

    const id = props.match.params.id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      name: "",
      description: "",
      created_at: "",
      amount: "",
      company_id: id,
      entry_id: createMode ? 0 : props.match.params.entry_id,
      createMode: createMode
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    if (!createMode) {
      axios
      .get(`${API_BASE}/companies/${this.state.company_id}/entries/${this.state.entry_id}`)
      .then(res => {
        console.log("Entry fetched");
        this.setState({
          name: res.data.name,
          description: res.data.description,
          created_at: res.data.created_at,
          amount: res.data.amount
        })
      })
      .catch(err => console.log(err));
    }
  }

  addEntry(newEntry) {
    axios
    // .post(`${API_BASE}/companies/${newEntry.company_id}/entries`, newEntry)
    .post(`${API_BASE}/companies/${newEntry.company_id}/entries`, newEntry)
    .then(res => {
      this.props.history.goBack();
      console.log("Posting");
    })
    .catch(err => console.log(err));
  }

  updateEntry(entry) {
    axios
    .put(`${API_BASE}/companies/${entry.company_id}/entries/${entry.entry_id}`, entry)
    .then(res => {
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const targetName = target.name;
    this.setState({
      [targetName]: value
    });
  }

  handleSubmit(event)
  {
    const entry = {
      name: this.state.name,
      description: this.state.description,
      created_at: this.state.created_at,
      amount: this.state.amount,
      company_id: this.state.company_id,
      entry_id: this.state.entry_id
    }
    if (this.state.createMode) {
      this.addEntry(entry);
    } else {
      this.updateEntry(entry);
    }
    event.preventDefault();
  }

  handleCancel(event)
  {
    this.props.history.goBack();
    event.preventDefault();
  }

  render()  {
   return (
     <div>
       <h1>
         {this.state.createMode ? "Create Entry" : "Edit Entry"}
       </h1>
       <div className="company-form">
         <form onSubmit={this.handleSubmit}>
           <div className="form-group">
             <label>Title</label>
             <input type="text" className="form-control" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange}/>
           </div>
           <div className="form-group">
             <label htmlFor="article">Description</label>
             <textarea className="form-control" name="description" id="description" value={this.state.description} onChange={this.handleInputChange} rows="4"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="article">Created On</label>
             <input type="datetime-local" className="form-control" name="created_at" id="created_at" value={this.state.created_at} onChange={this.handleInputChange}></input>
           </div>
           <div className="form-group">
             <label htmlFor="article">Amount</label>
             <input type="integer" className="form-control" name="amount" id="amount" value={this.state.article} onChange={this.handleInputChange}></input>
           </div>
           <div className="form-group">
             <button type="submit" className="btn btn-primary">{this.state.createMode ? "Create Entry" : "Save Entry"}</button>
             <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
           </div>
         </form>
       </div>
     </div>
   );
 }

}

export default EntryForm;
