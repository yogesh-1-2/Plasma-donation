import React from 'react';
import PreLoader from './Components/PreLoader';
const Donation=()=>{
    return(
        <div classNameName="container">
            <div className="row">
            <form className="col s12">
            <div className="row">
                <div className="input-field col s6">
                <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
                <label for="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                <input id="last_name" type="text" className="validate"/>
                <label for="last_name">Last Name</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="blood-grouop" type="text" className="validate"/>
                <label for="blood_group">Blood Group</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="email" type="email" className="validate"/>
                <label for="email">Email</label>
                </div>
            </div>
            <div class="input-field col s6">
                <i class="material-icons prefix">phone</i>
                <input id="icon_telephone" type="tel" class="validate"/>
                <label for="icon_telephone">Telephone</label>
            </div>
            </form>
            <PreLoader/>
            <div class="collection">
                <a href="#!" class="collection-item">Alvin</a>
                <a href="#!" class="collection-item active">Alvin</a>
                <a href="#!" class="collection-item">Alvin</a>
                <a href="#!" class="collection-item">Alvin</a>
            </div>
            </div>
        </div>
    );
}
export default Donation;