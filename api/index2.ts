// // import inquirer  from "inquirer";
// import { program } from "commander";
// import {db} from './src/novelas/infrastructure/database/sequalize/db'
// import {ExtraerContenido} from './src/capitulos/domain/ExtraeCapitulos'
// import {Novelas} from './src/server/infrastructure/novelas'


// const contenido = new ExtraerContenido();
// const BuscarNovela = new Novelas(contenido);



// (function main() {
//   db
//   program
//     .version("0.0.1")
//     .description("Extraer y guardar novelas y sus capitulos favoritos");

//   program
//     .command("url <url>")
//     .alias("u")
//     .description("Ingreser la url ")
//     .action(async (url: string) => {
//           BuscarNovela.AgregarNovela(url)
      
//     });

//   program.parse(process.argv);

// })();
