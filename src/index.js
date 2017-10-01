import React from 'react';
import ReactDOM from 'react-dom';
// import Button from 'material-ui/Button';
import FloatingButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';

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

	deleteContacts(id){
		this.state.contacts.splice(id,1);
		this.setState({
			contacts:this.state.contacts
		});
	}

	getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

	render(){
		return(
			<div>
				<h1>Contacts &emsp;&emsp;&emsp;<FloatingButton onClick = {this.showContacts.bind(this)}> <ContentAdd/> </FloatingButton></h1>
				{(this.state.showCt) ? <NewContact addContact={this.addContact.bind(this)}/> : null}
				<ContactList contacts={this.state.contacts} deleteCnt={this.deleteContacts.bind(this)} addContact={this.addContact.bind(this)}/>
			</div>
		);
	};
}

class ContactList extends React.Component{

	constructor(props){
		super(props);
		this.state={
			show:[false],
			id:-1,
			edit:[false],
			editId:-1,
			contacts:this.props.contacts
		};
	}

	clickAct(id){

		var arr = new Array(this.props.contacts.length);
		arr.map((e)=>{
			e = false;
		})

		if(id===this.state.id){
			arr[id]=false
		} else {
			arr[id] = true
		}

		this.setState(prevState=>({
			show: arr,
			id:id
		}));

		if(id===this.state.id){
			this.setState({
				id:-1
			})
		}
	}

	deleteCnt(id){
		this.props.deleteCnt(id);
	}

	editCnt(id){

		var arr = new Array(this.props.contacts.length);
		arr.map((e)=>{
			e = false;
		});

		this.setState(prevState=>({
			show: arr
		}));

		arr[id]=true;
		this.setState(prevState=>({
			editId: arr
		}));

		console.log(this.state.edit[id]);
	}

	render(){
		return(
			<div>
				<ol>
					{this.props.contacts.map((cont,i)=>
						<li key={i}> 
							<FlatButton key={i} onClick = {this.clickAct.bind(this,i)}>{cont.name}</FlatButton> &emsp;&emsp;
							<FloatingButton mini={true} onClick={this.editCnt.bind(this,i)}> <Edit/> </FloatingButton> &emsp;
							<FloatingButton mini={true} backgroundColor="red" onClick={this.deleteCnt.bind(this,i)}> <ActionDelete/> </FloatingButton> <br/><br/>
							{(this.state.show[i])?<p>Email: &emsp; {cont.email}<br/>Phone No: &emsp; {cont.no}</p>:null}
							{(this.state.editId[i])?<editConatct edit={this.state.contacts}/>:null}
						</li>)}
				</ol>
			</div>
		)
	}
}

function editContact(){

	constructor(props){
		
		super(props);

		var id = this.props.id;
		this.state = {
			name:this.props.contacts.name[id],
			email:this.props.contacts.email[id],
			no:this.props.contacts.no[id]
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

	cancelEdit(){
		
	}

	<form onSubmit={this.addCont.bind(this)}><br/>
				Name <input type="text" name="name" value = {this.state.name[id]} onChange={this.valueChangeName.bind(this)} required/><br/><br/>
				Email <input type="email" name="email" value = {this.state.email[id]} onChange={this.valueChangeEmail.bind(this)} /><br/><br/>
				Mobile No. <input type="text" name="no" value = {this.state.no[id]} onChange={this.valueChangeNo.bind(this)}/><br/><br/>
				<input type="submit" value="Save" /> <input type="button" value="Cancel" onClick={this.cancelEdit.bind(this)}/>
			</form>
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
			<form onSubmit={this.addCont.bind(this)}><br/>
				Name <input type="text" name="name" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/><br/>
				Email <input type="email" name="email" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/><br/>
				Mobile No. <input type="text" name="no" value = {this.state.no} onChange={this.valueChangeNo.bind(this)}/><br/><br/>
				<input type="submit" value="Add Contact" />
			</form>

		)
	}
}

App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

ReactDOM.render(<App />, document.getElementById('root'));

