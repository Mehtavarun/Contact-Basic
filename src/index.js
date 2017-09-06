import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import {FloatingButton} from 'material-ui/FloatingActionButton';
import {ContentAdd} from 'material-ui/svg-icons/content/add';

class App extends React.Component{

	constructor(props){
		super(props);
		this.state={
			contacts:[],
			showCt: false
		}
	}

	addContact(c){
		this.setState(prevState => ({
			contacts:[...prevState.contacts,c],
			showCt:!prevState.showCt
		}));
	}

	showContacts(){
		this.setState(prevState=>({
			showCt:!prevState.showCt
		}));
	}

	render(){
		return(
			<div>
				<h2>Contacts</h2>
				<Button onClick = {this.showContacts.bind(this)}>New</Button>
				{(this.state.showCt) ? <NewContact addContact={this.addContact.bind(this)}/> : null}
				<ContactList contacts={this.state.contacts}/>
			</div>
		);
	};
}

class ContactList extends React.Component{

	constructor(props){
		super(props);
		this.state={
			show:[false],
			id:-1
		};
	}

	clickAct(id){

		var arr = new Array(this.props.contacts.length);
		arr.map((e)=>{
			e = false;
		})

		if(arr[id]===true || id==this.state.id){
			arr[id]=false
		} else {
			arr[id] = true
		}

		this.setState(prevState=>({
			show: arr,
			id:id
		}));

		if(id==this.state.id){
			this.setState({
				id:-1
			})
		}
	}

	render(){
		return(
			<div>
				<ol>
					{this.props.contacts.map((cont,i)=>
						<li key={i}>
							<Button key={i} onClick = {this.clickAct.bind(this,i)}>{cont.name}</Button><br/>
							{(this.state.show[i])?<p>{cont.email}<br/>{cont.no}</p>:null}
						</li>)}
				</ol>
			</div>
		)
	}
}

class NewContact extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			name:'',
			no:'',
			email:''
		};
	}

	addCont(ev){
		this.props.addContact(this.state);
		ev.preventDefault();
	}

	valueChangeName(event){
		this.setState({
			name:event.target.value
		})
	}

	valueChangeEmail(event){
		this.setState({
			email:event.target.value
		})
	}

	valueChangeNo(event){
		this.setState({
			no:event.target.value
		})
	}

	render(){
		return(
			<form onSubmit={this.addCont.bind(this)}>
				Name <input type="text" name="name" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/><br/>
				Email <input type="email" name="email" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/><br/>
				Mobile No. <input type="text" name="no" value = {this.state.no} onChange={this.valueChangeNo.bind(this)}/><br/><br/>
				<input type="submit" value="Add Contact" />
			</form>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));