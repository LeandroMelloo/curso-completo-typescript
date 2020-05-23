import { writeFileStrSync } from "https://deno.land/std/fs/mod.ts"
import obterAulas from "./logic/obterAulas.ts";

const aulas = await obterAulas();

const conteudo = aulas.map(aula => `${aula.id} - ${aula.nome}`).join("\n")

writeFileStrSync("./aulas.txt", aulas.join("\n"))