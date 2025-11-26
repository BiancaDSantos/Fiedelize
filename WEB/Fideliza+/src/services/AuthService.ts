import type { LoginRequest, LoginResponse} from '../types/login';
import api from './Api';


export async function login (login:LoginRequest ): Promise<LoginResponse> {

    const response = await api.post<LoginResponse>('http://localhost:8080/auth/login', login);
    if (response.status === 200) {
        return response.data;
    }

    return { token: "" };
}

