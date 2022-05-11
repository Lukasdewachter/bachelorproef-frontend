import React from "react";
import '../MainStyleSheet.css'
const EditRow = ({company,editFormData, handleEditChange, handleCancelClick}) => {
    return(
    <dl className="dl-edit">
        <dt>
        <input
                type='text'
                name='companyName'
                required='required'
                placeholder='Company name'
                value={editFormData.companyName}
                onChange={handleEditChange}
                size = "10" 
            />
        </dt>
        <dt>
            <input
                type='text'
                name='firstName'
                required='required'
                placeholder='first name'
                value={editFormData.firstName}
                onChange={handleEditChange}
                size = "10" 
            />
            <input
                type='text'
                name='lastName'
                required='required'
                placeholder='last name'
                value={editFormData.lastName}
                onChange={handleEditChange}
                size = "10" 
            />
        </dt>
        <dt>
            <input
                type='text'
                name='address'
                required='required'
                placeholder='address'
                value={editFormData.address}
                onChange={handleEditChange}
                 />
            <input
                type='text'
                name='tel'
                required='required'
                placeholder='tel number'
                value={editFormData.tel}
                onChange={handleEditChange}
                size="9"
                />
        </dt>
        <dt>
            <input
                type='email'
                name='mail'
                required='required'
                placeholder='mail'
                value={editFormData.mail}
                onChange={handleEditChange}
                 />
        </dt>
        <dt>
            <select className="select-FOS" name="fieldOfStudy" value={editFormData.fieldOfStudy} onChange={handleEditChange} >
                <option value="Sociale Wetenschappen">Sociale Wetenschappen</option>
                <option value="Burgerlijk Ingenieur">Burgerlijk Ingenieur</option>
                <option value="Bio-ingenieur">Bio-ingenieur</option>
                <option value="Industrieel Ingenieur">Industrieel Ingenieur</option>
                <option value="Wetenschappen">Wetenschappen</option>
                <option value="Architectuur">Architectuur</option>
                <option value="Geneeskunde">Geneeskunde</option>
                <option value="Farmacie">Farmacie</option>
                <option value="Letteren">Letteren</option>
                <option value="Economie">Economie</option>
                <option value="Wijsbegeerte">Wijsbegeerte</option>
            </select>
            <select className="select-C" name="campus" value={editFormData.campus} onChange={handleEditChange}>
                <option value="Aalst">Aalst</option>
                <option value="Antwerpen">Antwerpen</option>
                <option value="Brugge">Brugge</option>
                <option value="Brussel">Brussel</option>
                <option value="Diepenbeek">Diepenbeek</option>
                <option value="Geel">Geel</option>
                <option value="Gent">Gent</option>
                <option value="Kortrijk">Kortrijk</option>
                <option value="Leuven">Leuven</option>
                <option value="Sint-Katelijne-Waver">Sint-Katelijne-Waver</option>
            </select>
        </dt>
        <dt>
            <button className='btn-save' type='submit'><ion-icon name="checkmark-outline"></ion-icon></button>
            <button className='btn-cancel' type='button' onClick={handleCancelClick}><ion-icon name="close-circle-outline"></ion-icon></button>
        </dt>
    </dl>
    );
}
export default EditRow;