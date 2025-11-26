package senac.fideliza.desktop.controller;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.Initializable;
import javafx.scene.control.ComboBox;
import senac.fideliza.desktop.model.DAO.AdministradorDAO;
import senac.fideliza.desktop.model.Administrador;
import senac.fideliza.desktop.Utils.JPAUtils;
import jakarta.persistence.EntityManager;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import org.mindrot.jbcrypt.BCrypt;
import senac.fideliza.desktop.model.DAO.EmpresaDAO;
import senac.fideliza.desktop.model.Empresa;
import senac.fideliza.desktop.model.enums.UserRole;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

public class AdministradorController implements Initializable {

    @FXML
    private TextField txtNome;
    @FXML
    private TextField txtEmail;
    @FXML
    private TextField txtSenha;
    @FXML
    private TextField txtCep;

    @FXML
    private ComboBox<Empresa> comboEmpresas;

    private EmpresaDAO empresaDAO = new EmpresaDAO(JPAUtils.getEntityManager());

    private boolean cepValidado = false;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        List<Empresa> listaEmpresas = empresaDAO.buscarTodas();

        ObservableList<Empresa> observableEmpresas = FXCollections.observableArrayList(listaEmpresas);

        comboEmpresas.setItems(observableEmpresas);

    }

    public void validarCep(ActionEvent event) {
        try {
            String cep = txtCep.getText().replaceAll("[^0-9]", "");

            if (cep.length() != 8) {
                showError("CEP deve ter 8 dígitos!");
                cepValidado = false;
                return;
            }

            var urlEndereco = "https://viacep.com.br/ws/" + cep + "/json/";
            URL url = new URL(urlEndereco);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json");

            int status = conn.getResponseCode();
            if (status == 200) {
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                String jsonResponse = response.toString();

                if (jsonResponse.contains("\"erro\": true")) {
                    showError("CEP não encontrado!");
                    cepValidado = false;
                } else {
                    String enderecoFormatado = formatarEndereco(jsonResponse);
                    showSuccess("CEP válido!", enderecoFormatado);
                    cepValidado = true;
                }
            } else {
                showError("Erro ao consultar CEP!");
                cepValidado = false;
            }
            conn.disconnect();

        } catch (Exception e) {
            showError("Erro ao validar CEP: " + e.getMessage());
            cepValidado = false;
        }
    }

    public void cadastrarAdmin(ActionEvent event) {
        try {
            // Validar campos vazios
            if (txtNome.getText().isEmpty() || txtEmail.getText().isEmpty() ||
                    txtSenha.getText().isEmpty()  || txtCep.getText().isEmpty()) {
                showError("Preencha todos os campos!");
                return;
            }

            // Verificar se o CEP foi validado
            if (!cepValidado) {
                showError("Por favor, valide o CEP antes de cadastrar!");
                return;
            }

            EntityManager entityManager = JPAUtils.getEntityManager();
            AdministradorDAO administradorDAO = new AdministradorDAO(entityManager);

            String senhaCriptografada = BCrypt.hashpw(txtSenha.getText(), BCrypt.gensalt());

            Administrador administrador = new Administrador();
            administrador.setNome(txtNome.getText());
            administrador.setEmail(txtEmail.getText());
            administrador.setSenha(senhaCriptografada);
            administrador.setCEP(txtCep.getText());
            administrador.setEmpresa(comboEmpresas.getSelectionModel().getSelectedItem());
            administrador.setRole(UserRole.ADMIN);

            administradorDAO.salvar(administrador);

            showSuccess("Sucesso", "Administrador cadastrado com sucesso!\n\nEmail: " + txtEmail.getText());

            // Limpar campos
            txtNome.clear();
            txtEmail.clear();
            txtSenha.clear();
            txtCep.clear();
            cepValidado = false;

        } catch (Exception e) {
            e.printStackTrace();
            showError("Falha ao cadastrar: " + e.getMessage());
        }
    }

    private String formatarEndereco(String json) {
        try {
            String logradouro = extrairValor(json, "logradouro");
            String bairro = extrairValor(json, "bairro");
            String localidade = extrairValor(json, "localidade");
            String uf = extrairValor(json, "uf");
            String cep = extrairValor(json, "cep");

            StringBuilder endereco = new StringBuilder();
            endereco.append("CEP: ").append(cep).append("\n");
            if (!logradouro.isEmpty()) endereco.append("Logradouro: ").append(logradouro).append("\n");
            if (!bairro.isEmpty()) endereco.append("Bairro: ").append(bairro).append("\n");
            endereco.append("Cidade: ").append(localidade).append(" - ").append(uf);

            return endereco.toString();
        } catch (Exception e) {
            return "Endereço encontrado";
        }
    }

    private String extrairValor(String json, String chave) {
        try {
            String busca = "\"" + chave + "\": \"";
            int inicio = json.indexOf(busca);
            if (inicio == -1) return "";
            inicio += busca.length();
            int fim = json.indexOf("\"", inicio);
            if (fim == -1) return "";
            return json.substring(inicio, fim);
        } catch (Exception e) {
            return "";
        }
    }

    private void showError(String message) {
        Alert alert = new Alert(Alert.AlertType.ERROR);
        alert.setTitle("Erro");
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }

    private void showSuccess(String title, String message) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }
}