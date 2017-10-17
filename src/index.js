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
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import './index.css';

class App extends React.Component{

	constructor(props){
		super(props);
		this.state={
			contacts:[],
			showCt: false,
			addOrEdit:true,
			noCnt:true,
			personal:{}
		}
	}

	addContact(c){
		this.setState(prevState => ({
			contacts:[...prevState.contacts,c],
			showCt:!prevState.showCt,
			noCnt:false
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
			contacts:this.state.contacts,
		});
		if(this.state.contacts.length===0){
				this.setState({
				noCnt:true
			});
		}
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

	adOrEd(){
		this.setState(prevState=>({
			addOrEdit:!prevState.addOrEdit
		}))
	}

	personalInfo(details){
		this.setState({
			personal:details
		})
	}

	getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

	render(){
		return(
				<div className="main">
					<Personal personalDetails={this.personalInfo.bind(this)}/>

					<AppBar title="Contacts"
						iconElementRight={
							(this.state.addOrEdit)?
								<FloatingButton onClick = {this.showContacts.bind(this)} disabled = {false}> <ContentAdd/> </FloatingButton>
									:
								<FloatingButton onClick = {this.showContacts.bind(this)} disabled = {true}> <ContentAdd/> </FloatingButton>
							} 	
						className="styles" showMenuIconButton={false}>
					</AppBar>

					<div className="right">
						{(this.state.showCt) ? <NewContact addContact={this.addContact.bind(this)}/> : null}
						{(!this.state.showCt) ? <PersonalDetails details={this.state.personal}/> : null}
					</div>

					{(this.state.noCnt)?	
						<h1 id="h1">"NO CONTACTS <br/>TO SHOW"</h1>
						 :
						<div className="left">
							<ContactList contacts={this.state.contacts} 
							deleteCnt={this.deleteContacts.bind(this)}
							addContact={this.addContact.bind(this)}
							editCnt={this.editContact.bind(this)}
							adOrEd={this.adOrEd.bind(this)}
							showCt={this.state.showCt}
							/>
						</div>
					}
				</div>
			
		);
	};
}

function PersonalDetails(props){

	return(<form>
			<Paper zDepth={2} className="Paper">
				<h2>Personal Details</h2>
				<Divider/><br/>
				Name<br/>
				 <TextField type="text" value={props.details.name} disabled={true}/><br/><br/>
				Email<br/>
				 <TextField type="text" value={props.details.email} disabled={true}/><br/><br/>
				Phone<br/>
				 <TextField type="text" value={props.details.no} disabled={true}/><br/><br/>
			</Paper>
		</form>
		)
}

class Personal extends React.Component{

	constructor(props){
		super();
		this.state={
			name:'',
			email:'',
			no:'',
			open:true
		}
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

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = (ev) => {
		this.setState({open: false});
		var details = {
			name:this.state.name,
			email:this.state.email,
			no:this.state.no
		};
		this.props.personalDetails(details);
	};

	render(){ 
		return(
			<Dialog className="personal"
	          title="Your Personal Details"
	          actions={<FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose.bind(this)}/>}
	          modal={false}
	          open={this.state.open}
	          onRequestClose={this.handleClose}
	        >
		        <form className="form3">
					&emsp; <TextField errorText="This field is required" className="tf" type="text" placeholder='Name' name="name" value = {this.state.name} onChange={this.valueChangeName.bind(this)} /><br/>
					&emsp; <TextField errorText="This field is required" className="tf" type="email" placeholder='Email' name="email" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/>
					&emsp; <TextField errorText="This field is required" type="text" name="no" className="tf" placeholder='1234-567-890' value = {this.state.no} onChange={this.valueChangeNo.bind(this)} /><br/><br/>
				</form>
			</Dialog>
			)
	}
}

class ContactList extends React.Component{

	constructor(props){
		super(props);
		this.state={
			edit:[false],
			editId:-1,
		};
		if(this.props.showCt){
			
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

		this.props.adOrEd();

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

		this.props.adOrEd();
		var arr = new Array(this.props.contacts.length);
		arr.map((e)=>{
			e = false;
			return e;
		});
		this.setState({
			edit:arr,
			editId:-1
		})
	}

	addCont(data,id){

		this.props.adOrEd();
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
			{this.props.contacts.map((cont,i)=>
				<List key={i} className="lists">
					  <ListItem className="lists"
					    primaryText={cont.name}
					    initiallyOpen={false}
					    primaryTogglesNestedList={true}
					    nestedItems={[
					    	<ListItem className="lists"
					        key={i}
					        primaryText={cont.no}
					        secondaryText="Mobile"
					    	leftIcon={<CommunicationCall color={indigo500} />}
					      />,
					      <ListItem key={i+100} className="lists"
					        primaryText={cont.email}
					        secondaryText="Email"
					        leftIcon={<CommunicationEmail />}
					      />
					       ]}
					     />
				      <FloatingButton mini={true} onClick={this.editCnt.bind(this,i)} className="buttonl" disabled={this.props.showCt}> <Edit/> </FloatingButton> &emsp;
					  <FloatingButton mini={true} backgroundColor="red" onClick={this.deleteCnt.bind(this,i)} className="buttonr"> <ActionDelete/> </FloatingButton> <br/><br/>
					  {(this.state.edit[i])?
							<div>
								<EditContact contacts={this.props.contacts[i]}
								 addCont={this.addCont.bind(this)} id={i} 
								 editCancel={this.editCancel.bind(this)}
								 className="right"
								/>
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
			<form onSubmit={this.addCont.bind(this)} className="form2"><br/>
			<Paper zDepth={2} className="Paper">	
				<h3>Editing Contacts</h3>	
				<Divider/>	
				Name&emsp;&emsp;&emsp; <TextField className="TextField2" type="text" name="name" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/>
				Email&emsp;&emsp;&emsp; <TextField className="TextField2" type="email" name="email" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/>
				Mobile No.&emsp; <TextField type="text" name="no" className="TextField2" value = {this.state.no} onChange={this.valueChangeNo.bind(this)}/><br/><br/>
				<FlatButton type="submit" value="Save">Save</FlatButton> <FlatButton onClick={this.cancelEdit.bind(this,this.props.id)} className="buttonDisplay">Cancel</FlatButton>
			</Paper>
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
			<form onSubmit={this.addCont.bind(this)} className="form1"><br/>
			<Paper zDepth={2} className="Paper">
			<h2>New Contact</h2>
			<Divider/><br/>
				&emsp; <TextField type="text" name="name" hintText = "John" value = {this.state.name} onChange={this.valueChangeName.bind(this)} required/><br/>
				&emsp; <TextField type="email" name="email" hintText = "John@gmail.com" value = {this.state.email} onChange={this.valueChangeEmail.bind(this)} /><br/>
				&emsp; <TextField type="tel" name="no" hintText = "123-4567-890"value = {this.state.no} onChange={this.valueChangeNo.bind(this)} required/><br/><br/>
				&emsp;&emsp;&emsp;&emsp;&emsp;<FlatButton type="submit" value="Add Contact" className="style">Add Contact</FlatButton>
			</Paper>
			</form>
		)
	}
}

App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

ReactDOM.render(<App />, document.getElementById('root'));
