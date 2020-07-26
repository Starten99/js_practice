import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.service'
export class CreateComponent extends Component{
    constructor(id){
        super(id)
    }
    init(){
        this.$el.addEventListener('submit', submitHandler.bind(this))
        this.form = new Form(this.$el, {
            title:[Validators.required],
            fulltext:[Validators.required, Validators.minLength(5)]
        })
    }

}
async function submitHandler(event){
    event.preventDefault()
    if(this.form.isValid()){
        const formData = {
            type: this.$el.type.value,
            data: new Date().toLocaleDateString(),
            ...this.form.value()
        }
        console.log(formData)
        await apiService.createPost(formData)
        this.form.clearValue()
        alert('Пост успешно создан')
    }
}
    