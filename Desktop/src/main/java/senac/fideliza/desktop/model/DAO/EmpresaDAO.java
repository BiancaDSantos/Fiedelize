package senac.fideliza.desktop.model.DAO;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import senac.fideliza.desktop.model.Empresa;

import java.util.List;

public class EmpresaDAO {
    private EntityManager entityManager;

    public EmpresaDAO(EntityManager entityManager){

        this.entityManager = entityManager;
    }

    public void salvar(Empresa e){
        entityManager.getTransaction().begin();

        entityManager.persist(e);

        entityManager.getTransaction().commit();
    }

    public List<Empresa> buscarTodas() {

        String jpql = "SELECT e FROM Empresa e";

        TypedQuery<Empresa> query = entityManager.createQuery(jpql, Empresa.class);

        return query.getResultList();

    }
}
