import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import Spinner from '../layout/spinner'

class EditClient extends Component {
    constructor(props) {
        super(props) 
            this.firstNameInput=React.createRef();
            this.lastNameInput=React.createRef();
            this.emailInput=React.createRef();
            this.phoneInput=React.createRef();
            this.balanceInput=React.createRef();
        }
  
    onSubmit =e=>{
        e.preventDefault();

        const {client, firestore, history}=this.props;
        const updClient={
            firstName:this.firstNameInput.current.value,
            lastName:this.lastNameInput.current.value,
            email:this.emailInput.current.value,
            phone:this.phoneInput.current.value,
            balance:this.balanceInput.current.value === ''?0:
            this.balanceInput.current.value            
        }

        firestore.update({collection:'clients', doc: client.id},updClient).then(()=>history.push('/'));
    };

    onChange=(e)=>this.setState({[e.target.name]:e.target.value});

    render() {

        const{disableBalanceOnEdit}=this.props.settings;
        const{client}=this.props;
        
        if(client){       

            return (
            <div>
                <div className='row'>
                    <div className='col-md-6'>
                        <Link to='/' className='btn btn-link'>
                            <i className='fas fa-arrow-circle-left' />back to dashboard
                        </Link>
                    </div>
                </div>

                <div className='card'>
                    <div className='card-header'>Edit Client</div>
                    <div className='card-body'>
                        <form onSubmit={this.onSubmit}>
                        <div className='form-group'>
                                <label htmlFor='FirstName'>First Name</label>
                                <input
                                type='text' 
                                className='form-control' 
                                name='FirstName'
                                minLength='2'
                                required
                                ref={this.firstNameInput}
                                defaultValue={client.FirstName}
                                />

                            </div>
                            <div className='form-group'>
                                <label htmlFor='LastName'>Last Name</label>
                                <input
                                type='text' 
                                className='form-control' 
                                name='LastName'
                                minLength='2'
                                required
                                ref={this.lastNameInput}
                                defaultValue={client.LastName}
                                />

                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                type='email' 
                                className='form-control' 
                                name='email'
                                ref={this.emailInput}
                                defaultValue={client.email}
                                />

                            </div>
                            <div className='form-group'>
                                <label htmlFor='phone'>Phone</label>
                                <input
                                type='text' 
                                className='form-control' 
                                name='phone'
                                minLength='10'
                                required
                                ref={this.phoneInput}
                                defaultValue={client.phone}
                                />

                            </div>
                            <div className='form-group'>
                                <label htmlFor='balance'>Balance</label>
                                <input
                                type='text' 
                                className='form-control' 
                                name='balance'
                                ref={this.balanceInput}
                                defaultValue={client.balance}
                                disabled={disableBalanceOnEdit}
                                />

                            </div>

                            <input 
                            type='submit' 
                            value='submit'
                            className='btn btn-primary btn-block'
                            />
                        </form>
                    </div>
                </div>
            </div>
            );
        }else{
            return <Spinner />
        }
  }
}

EditClient.propTypes={
    firestore:PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props=>[
        {collection: 'clients', storeAs:'client', doc: props.match.params.id}
    ]),
    connect(({firestore:{ordered},settings}, props)=>({
        client: ordered.client && ordered.client[0],
        settings
    }))
)(EditClient);