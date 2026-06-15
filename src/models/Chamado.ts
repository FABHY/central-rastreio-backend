import { Schema, model } from 'mongoose';

const ChamadoSchema = new Schema({
  pedidoId: { type: Schema.Types.ObjectId, ref: 'Pedido', required: true },
  assunto: { type: String, required: true },
  mensagemUsuario: { type: String, required: true },
  protocolo: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: 'Aberto' }, // Aberto, Em Atendimento, Fechado
  dataCriacao: { type: String, required: true }
});

export const Chamado = model('Chamado', ChamadoSchema);