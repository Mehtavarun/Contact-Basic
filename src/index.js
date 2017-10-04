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

	editContact(data,id){
		var arr = this.state.contacts;

		arr[id].name=data.name;
		arr[id].email=data.email;
		arr[id].no=data.no;
		this.setState({
			contacts:arr
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
				<ContactList contacts={this.state.contacts} 
				deleteCnt={this.deleteContacts.bind(this)}
				addContact={this.addContact.bind(this)}
				editCnt={this.editContact.bind(this)}
				 />
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
			editId:-1
		};
	}

	clickAct(id){

		var arr = new Array(this.props.contacts.length);
		arr.map((e)=>{
			e = false;
			return e;
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
		var arr1 = new Array(this.props.contacts.length);
		arr1.map((e)=>{
			e = false;
			return e;
		});

		if(this.state.editId!==id){
			arr1[id]=false;
		} else {
			arr1[id] = false;
		}

		this.setState(prevState=>({
			edit: arr1,
			editId:id
		}));

		if(id===this.state.editId){
			this.setState({
				editId:-1
			})
		}
	}

	editCnt(id){

		var arr = new Array(this.props.contacts.length);
		arr.map((e)=>{
			e = false;
			return e;
		});

		if(id===this.state.id){
			arr[id]=false;
		} else {
			arr[id] = false;
		}

		this.setState(prevState=>({
			show: arr,
			id:id
		}))

		if(id===this.state.id){
			this.setState({
				id:id
			});
		}

		var arr1 = new Array(this.props.contacts.length);
		arr1.map((e)=>{
			e = false;
			return e;
		});

		if(this.state.editId!==id){
			arr1[id]=true;
		} else {
			arr1[id] = false;
		}

		this.setState(prevState=>({
			edit: arr1,
			editId:id
		}));

		if(id===this.state.editId){
			this.setState({
				editId:-1
			})
		}

	}

	editCancel(id){
		var arr = new Array(this.props.contacts.length);
		arr.map((e)=>{
			e = false;
			return e;
		});
		this.setState({
			edit:arr
		})
	}

	addCont(data,id){
		this.props.editCnt(data,id);
		var arr1 = new Array(this.props.contacts.length);
		arr1.map((e)=>{
			e = false;
			return e;
		});

		if(this.state.editId!==id){
			arr1[id]=false;
		} else {
			arr1[id] = false;
		}

		this.setState(prevState=>({
			edit: arr1,
			editId:id
		}));

		if(id===this.state.editId){
			this.setState({
				editId:-1
			})
		}
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
							{(this.state.edit[i])?
								<div>
									<EditContact contacts={this.props.contacts[i]} addCont={this.addCont.bind(this)} id={i}/>
									<FlatButton onClick={this.editCancel.bind(this,i)}>Cancel</FlatButton>
									</div>:null
								}
						</li>)}
				</ol>
			</div>
		)
	}
}

class EditContact extends React.Component{

	constructor(props){
		
		super(props);
		var contacts = this.props.contacts;
		this.state = {
			name:contacts.name,
			email:contacts.email,
			no:contacts.no
		};
	}

	addCont(ev){
		ev.preventDefault();
		this.props.addCont(this.state,this.props.id);
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
		this.props.editCancel(this.props.id);
	}

	render(){
		return(
			<form onSubmit={this.addCont.bind(this)}><br/>
				Name <input type="text" name="name" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/><br/>
				Email <input type="email" name="email" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/><br/>
				Mobile No. <input type="text" name="no" value = {this.state.no} onChange={this.valueChangeNo.bind(this)}/><br/><br/>
				<FlatButton type="submit" value="Save" >Save</FlatButton>
			</form>
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
			<form onSubmit={this.addCont.bind(this)}><br/>
				Name <input type="text" name="name" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/><br/>
				Email <input type="email" name="email" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/><br/>
				Mobile No. <input type="text" name="no" value = {this.state.no} onChange={this.valueChangeNo.bind(this)}/><br/><br/>
				<FlatButton type="submit" value="Add Contact" >Add Contact</FlatButton>
			</form>

		)
	}
}

App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

ReactDOM.render(<App />, document.getElementById('root'));

