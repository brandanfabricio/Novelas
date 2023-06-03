import Cheerio from "cheerio";
import { Novela } from "../novela.value";
import { NovelaEntity } from "../novelas.entity";

const ExpLkink =
  /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

const Expcap1 = /(capítulo|chapter|capitulo|Capítulo|)-*\d{1,4}/gim;
const Expcap2 = /[0-9]{1,4}/gim;
const ExtraerNovelas = async (Url: string): Promise<NovelaEntity | null> => {
  //https://tunovelaligera.com/novelas/wddg-tnl/

  try {
    let dato = await fetch(Url);
    let linkImagen: any;
    let primeraPag: any;
    let capitulos: any;
    let Listacapitulos: any;
    let contenido = await dato.text();

    let novela = await Cheerio.load(contenido);

    let titulo = await novela(".titulo-novela").text().trim();
    let imagenPortada = await novela(".summary_image").html();
    let descripcion = await novela(".summary__content p").text();

    let paginas = await novela(".lcp_paginator").html();

    Listacapitulos = await novela(".lcp_catlist").html();
    if (Listacapitulos == null) {
      Listacapitulos = await novela(".c-page__content").html();
    }

    linkImagen = imagenPortada?.match(ExpLkink);

    primeraPag = paginas?.match(ExpLkink);

    capitulos = Listacapitulos?.match(ExpLkink);
    capitulos = capitulos[0].match(Expcap1)[0].match(Expcap2)[0];

    // if (primeraPag == null || primeraPag == undefined) {
    //   let NuevaNovela = new Novela({
    //     titulo,
    //     imagen: "sin imagen",
    //     url: "sin paginado",
    //     descripcion,
    //   });
    //   return Promise.resolve(NuevaNovela);
    // }

    let NuevaNovela = new Novela({
      titulo,
      imagen:
        linkImagen == undefined || linkImagen == null
          ? "sin imagen"
          : linkImagen[1],
      url:
        primeraPag == undefined || primeraPag == null
          ? Url + "?lcp_page0=1"
          : primeraPag[5],
      descripcion,
      paginas: capitulos,
    });

    // if (primeraPag == null || linkImagen == null) {
    //   let NuevaNovela = new Novela({
    //     titulo,
    //     imagen: 'sin imagen',
    //     url: "erro en url",
    //     descripcion
    //   });

    //   return Promise.resolve(NuevaNovela);
    // }

    // let NuevaNovela = new Novela({
    //   titulo,
    //   imagen: linkImagen[1],
    //   url: primeraPag[5],
    //   descripcion
    // });

    return Promise.resolve(NuevaNovela);
  } catch (error) {
    console.log(error);
    return null || Promise.reject(error);
  }
};

export default ExtraerNovelas;
