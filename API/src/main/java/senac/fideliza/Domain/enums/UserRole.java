package senac.fideliza.Domain.enums;

public enum UserRole {
    ADMIN("ADMIN"),
    USER("user");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
