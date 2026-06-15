import { Schema, model } from 'mongoose';

const HistoricoEntregaSchema = new Schema({
  data: { type: String, required: true },
  status: { type: String, required: true }
});

const PedidoSchema = new Schema({
  clienteId: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  numeroPedido: { type: String, required: true, unique: true },
  dataCompra: { type: String, required: true },
  statusAtual: { type: String, required: true },
  previsaoEntrega: { type: String, required: true },
  historico: [HistoricoEntregaSchema]
});

export const Pedido = model('Pedido', PedidoSchema);