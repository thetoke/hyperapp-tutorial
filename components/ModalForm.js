import { h } from 'hyperapp'
import FormInput from './FormInput.js'
import FormInputLong from './FormInputLong.js'


const renderField = (field, item, updateFieldAction ) => {
    console.log("RENDERING ", field)
    let ftype = FormInput 
    if(field.type == 'longtext') ftype = FormInputLong
    return ftype({
        label: field.label,
        key: field.key,
        value: item[field.key],
        type: field.type,
        errors: field.errors,
        action: (val) => updateFieldAction(field.key, val)
    });

}

const renderFields = (fields, item, updateFieldAction) => fields.map(
    f => renderField(f, item, updateFieldAction)
)

const ModalForm = module.exports = ({ formFields, item, hideAction, saveAction, updateFieldAction }) => <div className={`modal ${item?'active':''}`}>
<div class="modal-overlay"></div>
    <div class="modal-container">
    <div class="modal-header">
        <button class="btn btn-clear float-right" onclick={hideAction}></button>
        <div class="modal-title h5">{item.id?`Editing item ${item.id}`:"Add new item!"}</div>
    </div>
    <div class="modal-body">
        <div class="content">
            <form method='POST'>
                {renderFields(formFields, item, updateFieldAction)}
            </form>
        </div>
    </div>
        <div class="modal-footer">
        <button class="btn" onclick={hideAction}>Cancel</button>
            <button class="btn" onclick={saveAction}>Ok</button>

        </div>
    </div>
</div>
