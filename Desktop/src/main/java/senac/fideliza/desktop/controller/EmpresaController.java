package senac.fideliza.desktop.controller;

import jakarta.persistence.EntityManager;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import senac.fideliza.desktop.Utils.JPAUtils;
import senac.fideliza.desktop.model.DAO.EmpresaDAO;
import senac.fideliza.desktop.model.Empresa;

public class EmpresaController {

    @FXML
    private TextField txtNome;
    @FXML
    private TextField txtEmail;
    @FXML
    private TextField txtCnpj;

    public void cadastrarEmpresa(ActionEvent event) {
        try {
            // Validar campos vazios
            if (txtNome.getText().isEmpty() || txtEmail.getText().isEmpty() ||
                    txtCnpj.getText().isEmpty()) {
                showError("Preencha todos os campos!");
                return;
            }

            EntityManager entityManager = JPAUtils.getEntityManager();
            EmpresaDAO empresaDAO = new EmpresaDAO(entityManager);

            Empresa empresa = new Empresa();
            empresa.setNome(txtNome.getText());
            empresa.setCnpj(txtCnpj.getText().replaceAll("\\D", ""));
            empresa.setEmail(txtEmail.getText());

            empresaDAO.salvar(empresa);

            showSuccess("Sucesso", "Empresa cadastrada com sucesso!\n\nEmail: " + txtEmail.getText());

            // Limpar campos
            txtNome.clear();
            txtEmail.clear();
            txtCnpj.clear();

        } catch (Exception e) {
            e.printStackTrace();
            showError("Falha ao cadastrar: " + e.getMessage());
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