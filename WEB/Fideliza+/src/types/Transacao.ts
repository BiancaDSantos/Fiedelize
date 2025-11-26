export const TipoTransacao = {
  ACUMULO: 'ACUMULO',
  ACUMULO_DOBRO: 'ACUMULO_DOBRO',
  RESGATE: 'RESGATE',
  EXPIRACAO: 'EXPIRACAO',
  AJUSTE_POSITIVO: 'AJUSTE_POSITIVO',
  AJUSTE_NEGATIVO: 'AJUSTE_NEGATIVO',
} as const;

export type TipoTransacao = (typeof TipoTransacao)[keyof typeof TipoTransacao];

export interface TransacaoRequest {
  pontos: number;
  tipoTransacao: TipoTransacao;
}

export interface TransacaoRequest {
  pontos: number;
  tipoTransacao: TipoTransacao;
}