import { Client, Connection } from "https://deno.land/x/mysql/mod.ts";
import Aula from "../model/aula.ts";

export default async (): Promise<Aula[]> => {
    const client = await new Client().connect({
        hostname: "127.0.0.1",
        username: "root",
        password: "admin",
        db: "osworks"
    });
    
    const registros = await client.query("SELECT id, nome, email, telefone FROM cliente");
    const aulas: Aula[] = registros.map(
        (reg: any): Aula => {
            return {
                id: reg.id,
                nome: reg.name,
                email: reg.email,
                telefone: reg.telefone
            };
        }
    )

    return aulas;
};

