import React from 'react';
import ReactDOM from 'react-dom';
import FloatingButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

const styles = {
  	marginTop:'0px',
  	marginBottom:'10px',
};

const style = {
	paddingLeft:'10px',
	paddingRight:'10px'
}

const buttonDisplay = {
	marginLeft:'10%'
}

const main = {
	width:'60%',
	marginTop:'7%',
	marginLeft:'20%',
	border:'2px solid #42a5f5',
	height:'400px',
	paddingBottom:'5px',
	overflowY:'scroll'
}

const list={
	lists:{width:'70%',
	float:'left',
	marginLeft:'5%'},
	buttonl:{
	marginLeft:'83%',
	float:'left',
	marginTop:'-5%'
	},
	buttonr:{
	marginLeft:'90%',
	float:'left',
	marginTop:'-5%'
	}
}

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
			<div style={main}>
				<AppBar title="Contacts" iconElementRight={<FloatingButton onClick = {this.showContacts.bind(this)}  iconElementLeft=""
					style = {styles}> 
					<ContentAdd/> </FloatingButton>}>
				</AppBar>
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
			<div>				{this.props.contacts.map((cont,i)=>
				<List key={i}>
					  <ListItem style={list.lists}
					    primaryText={cont.name}
					    initiallyOpen={false}
					    primaryTogglesNestedList={true}
					    nestedItems={[
					    	<ListItem style={list.lists}
					        key={i}
					        primaryText={cont.no}
					        secondaryText="Mobile"
					    	leftIcon={<CommunicationCall color={indigo500} />}
					      />,
					      <ListItem key={i+100} style={list.lists}
					        primaryText={cont.email}
					        leftIcon={<CommunicationEmail />}
					      />,
					       ]}
					     />
				      <FloatingButton mini={true} onClick={this.editCnt.bind(this,i)} style = {list.buttonl}> <Edit/> </FloatingButton> &emsp;
					  <FloatingButton mini={true} backgroundColor="red" onClick={this.deleteCnt.bind(this,i)} style = {list.buttonr}> <ActionDelete/> </FloatingButton> <br/><br/>
					  {(this.state.edit[i])?
							<div>
								<EditContact contacts={this.props.contacts[i]} addCont={this.addCont.bind(this)} id={i} editCancel={this.editCancel.bind(this)}/>
							</div>:null
							}
				</List>)
			}
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
				Name&emsp;&emsp;&emsp; <TextField type="text" name="name" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/><br/>
				Email&emsp;&emsp;&emsp; <TextField type="email" name="email" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/><br/>
				Mobile No.&emsp; <TextField type="text" name="no" value = {this.state.no} onChange={this.valueChangeNo.bind(this)}/><br/><br/>
				<FlatButton type="submit" value="Save">Save</FlatButton> <FlatButton onClick={this.cancelEdit.bind(this,this.props.id)} style={buttonDisplay}>Cancel</FlatButton>
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
				Name &emsp;&emsp;&emsp; <TextField type="text" name="name" hintText = "John" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/><br/>
				Email&emsp; &emsp;&emsp; <TextField type="email" name="email" hintText = "John@gmail.com" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/><br/>
				Mobile No. &emsp; <TextField type="tel" name="no" hintText = "123-4567-890"value = {this.state.no} onChange={this.valueChangeNo.bind(this)} required/><br/><br/>
				&emsp;&emsp;&emsp;&emsp;&emsp;<FlatButton type="submit" value="Add Contact" style = {style}>Add Contact</FlatButton>
			</form>

		)
	}
}

App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

ReactDOM.render(<App />, document.getElementById('root'));

/*{this.props.contacts.map((cont,i)=>
				<List key={i}>
					  <ListItem style={list.lists}
					    primaryText={cont.name}
					    initiallyOpen={false}
					    primaryTogglesNestedList={true}
					    nestedItems={[
					    	<ListItem style={list.lists}
					        key={i}
					        primaryText={cont.no}
					        secondaryText="Mobile"
					    	leftIcon={<CommunicationCall color={indigo500} />}
					      />,
					      <ListItem key={i+100} style={list.lists}
					        primaryText={cont.email}
					        leftIcon={<CommunicationEmail />}
					      />,
					       ]}
					     />
				      <FloatingButton mini={true} onClick={this.editCnt.bind(this,i)} style = {list.buttonl}> <Edit/> </FloatingButton> &emsp;
					  <FloatingButton mini={true} backgroundColor="red" onClick={this.deleteCnt.bind(this,i)} style = {list.buttonr}> <ActionDelete/> </FloatingButton> <br/><br/>
					  {(this.state.edit[i])?
							<div>
								<EditContact contacts={this.props.contacts[i]} addCont={this.addCont.bind(this)} id={i} editCancel={this.editCancel.bind(this)}/>
							</div>:null
							}
				</List>)
			}*/


/*
<ol>
					{this.props.contacts.map((cont,i)=>
						<li key={i}> 
							<FlatButton key={i} onClick = {this.clickAct.bind(this,i)}  >{cont.name}</FlatButton> &emsp;&emsp;
							<FloatingButton mini={true} onClick={this.editCnt.bind(this,i)}> <Edit/> </FloatingButton> &emsp;
							<FloatingButton mini={true} backgroundColor="red" onClick={this.deleteCnt.bind(this,i)}> <ActionDelete/> </FloatingButton> <br/><br/>
							{(this.state.show[i])?<p>Email: &emsp; <TextField disabled="true" value={cont.email}/><br/>Phone No: &emsp; <TextField disabled="true" value={cont.no}/></p>:null}
							{(this.state.edit[i])?
								<div>
									<EditContact contacts={this.props.contacts[i]} addCont={this.addCont.bind(this)} id={i} editCancel={this.editCancel.bind(this)}/>
								</div>:null
								}
						</li>)
				}
				</ol>
				*/