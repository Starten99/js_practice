export class Form{
    constructor(form, controls){
        this.form=form
        this.controls=controls
    }
    value(){
        const value={}
        Object.keys(this.controls).forEach(control=>{
            value[control]=this.form[control].value
        })
        return value
    }
    clearValue(){
        Object.keys(this.controls).forEach(control=>{
           this.form[control].value=''
        })
    }
    isValid(){
        let isFormValid=true
        Object.keys(this.controls).forEach(control=>{
            const validators = this.controls[control]
            let isValid = true
            validators.forEach(validator=>{
                isValid=validator(this.form[control].value) && isValid
            })
            isValid?clearError(this.form[control]):setError(this.form[control])
            
            isFormValid=isFormValid && isValid
        })
        return isFormValid
    }
}
function setError($control){
    clearError($control)
    const errors={
        title:'<p class="validation-error">Это поле обязательно для заполнения</p>',
        fulltext:'<p class="validation-error">Ваш текст сообщения должен быть более 5 символов</p>'
    }
    Object.keys(errors).forEach(error=>{
        if($control.name==error){
            $control.insertAdjacentHTML('afterend', errors[error]) 
        }
    })
    $control.classList.add('invalid')
    
    
}
function clearError($control){
    $control.classList.remove('invalid')
    if($control.nextSibling){
        $control.closest('.form-control').removeChild($control.nextSibling)
    }  
}