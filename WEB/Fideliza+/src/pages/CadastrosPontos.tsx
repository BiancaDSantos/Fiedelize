import React, { useState } from 'react';
import { TipoTransacao, TransacaoRequest } from '../types/Transacao';


const tiposTransacaoOpcoes: { value: TipoTransacao; label: string }[] = [
    { value: TipoTransacao.ACUMULO, label: 'Acúmulo' },
    { value: TipoTransacao.ACUMULO_DOBRO, label: 'Acúmulo Dobro' },
    { value: TipoTransacao.RESGATE, label: 'Resgate' },
    { value: TipoTransacao.EXPIRACAO, label: 'Expiração' },
    { value: TipoTransacao.AJUSTE_POSITIVO, label: 'Ajuste Positivo' },
    { value: TipoTransacao.AJUSTE_NEGATIVO, label: 'Ajuste Negativo' },
];

const CadastroPontos: React.FC = () => {
  
  const [formData, setFormData] = useState<TransacaoRequest>({
    pontos: 0,
    tipoTransacao: TipoTransacao.ACUMULO, // Valor inicial
  });

  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);


  const handleChange = (
    e:
        React.ChangeEvent<HTMLInputElement | 
        HTMLSelectElement | 
        HTMLTextAreaElement>

  ) => { const { name, value } = e.target;

    let valorConvertido: string | number | TipoTransacao = value;

    if (name === 'pontos') {
       
        valorConvertido = parseInt(value) || 0;

    } else if (name === 'tipoTransacao') {

        valorConvertido = value as TipoTransacao;
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: valorConvertido,
    }));
  };


  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    setMensagem(null);

    if (formData.pontos <= 0) {
      setMensagem({ tipo: 'erro', texto: 'O campo Pontos deve ser um valor positivo.' });
      return;
    }

    const dataToSend = {
      pontos: formData.pontos,
      tipoTransacao: formData.tipoTransacao,
      
    };

    try {
      


      
      
      setFormData({
        pontos: 0,
        tipoTransacao: TipoTransacao.ACUMULO,
        descricao: '',
      });

    } catch (error) {
      console.error('Erro ao enviar a transação:', error);
      setMensagem({ tipo: 'erro', texto: `❌ Erro ao registrar: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
    }
  };

  return (
    <div style={styles.container}>
      <h2>⭐ Cadastro de Transação de Pontos</h2>
      
      {mensagem && (
        <div style={mensagem.tipo === 'sucesso' ? styles.sucesso : styles.erro}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Campo Tipo de Transação */}
        <div style={styles.formGroup}>
          <label htmlFor="tipoTransacao" style={styles.label}>Tipo de Transação:</label>
          <select
            id="tipoTransacao"
            name="tipoTransacao"
            value={formData.tipoTransacao}
            onChange={handleChange}
            required
            style={styles.input}
          >
            {tiposTransacaoOpcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.label}
              </option>
            ))}
          </select>
        </div>

        {/* Campo Pontos */}
        <div style={styles.formGroup}>
          <label htmlFor="pontos" style={styles.label}>Pontos (Valor da Transação):</label>
          <input
            type="number"
            id="pontos"
            name="pontos"
            value={formData.pontos}
            onChange={handleChange}
            required
            min="1" 
            style={styles.input}
          />
        </div>


        <button type="submit" style={styles.button}>
          Registrar Transação
        </button>
      </form>
    </div>
  );
};

export default CadastroPontos;


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  sucesso: {
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
  },
  erro: {
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
  },
};