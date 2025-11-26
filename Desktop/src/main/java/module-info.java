module senac.fideliza.desktop {
    requires javafx.controls;
    requires javafx.fxml;
    requires jakarta.persistence;
    requires org.hibernate.orm.core;
    requires java.sql;
    requires java.naming;
    requires jbcrypt;

    opens senac.fideliza.desktop to javafx.fxml;
    opens senac.fideliza.desktop.model to org.hibernate.orm.core;
    opens senac.fideliza.desktop.controller to javafx.fxml;

    exports senac.fideliza.desktop;
    exports senac.fideliza.desktop.controller;
}