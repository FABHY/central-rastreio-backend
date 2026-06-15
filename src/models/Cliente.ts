import {Schema, model} from 'mongoose';

const ClienteSchema = new Schema({
    nome : {type: String, required: true},
    cpf : {type: String, required: true, unique: true},
    telefone : {type: String, required: true}, 
    email: {type: String, required: true}
});

export const Cliente = model('Cliente', ClienteSchema);