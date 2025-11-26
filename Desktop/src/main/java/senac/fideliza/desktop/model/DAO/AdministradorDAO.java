package senac.fideliza.desktop.model.DAO;

import senac.fideliza.desktop.model.Administrador;
import jakarta.persistence.EntityManager;

public class AdministradorDAO {

    private EntityManager entityManager;

    public AdministradorDAO(EntityManager entityManager){

        this.entityManager = entityManager;
    }

    public void salvar(Administrador e){
        entityManager.getTransaction().begin();

        entityManager.persist(e);

        entityManager.getTransaction().commit();
    }

}
