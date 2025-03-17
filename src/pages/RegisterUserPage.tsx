import { Link } from "@mui/material";
import UserFormRegister from "../components/UserFormRegister";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function RegisterUserPage() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col bg-white shadow-lg rounded-xl p-6 w-full max-w-md gap-4">
                <div className="flex items-center justify-center gap-2">
                    <PersonOutlineIcon className="text-gray-700 text-3xl" />
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Cadastrar Usuário
                    </h1>
                </div>

                <UserFormRegister />

                <p className="text-center">Já é cadastrado? <Link>Acesse aqui</Link></p>
            </div>
        </div>
    );
}