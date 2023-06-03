import { CapituloEntity } from "../capitulo.entity";
import { Capituilo } from "../capitulo.value";

const cheerio = require("cheerio");

export class ExtraerContenido {
  #ExpLkink =
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  #Expcap1 = /(capítulo|chapter|capitulo|Capítulo|)-*\d{1,4}/gim;
  #Expcap2 = /[0-9]{1,4}/gim;
  #ClaseEntry = /entry-content_wrap_s_*\d{4,8}/gim;

  async ExtrarCapitulo(
    url: string,
    id: string
  ): Promise<CapituloEntity[] | string> {
    try {
      let link = await this.#LinksCapitulos(url);
      let dato = await this.#BuscarLinkDeNovela(link, id);
      return Promise.resolve(dato);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  /**
   *
   * @param url string
   * @returns []string
   * extrar todos los capitulos de cada pagina
   */
  async #LinksCapitulos(url: string): Promise<[]> {
    let linksCapitulos: [];
    let data = await fetch(url);
    let text = await data.text();
    let $ = await cheerio.load(text);
    let capitulos = await $(".lcp_catlist").html();

    if (capitulos == null) {
      capitulos = await $(".c-page__content").html();
    }
    linksCapitulos = capitulos.match(this.#ExpLkink);
    return linksCapitulos;
  }

  async #BuscarLinkDeNovela(
    linksCapitulos: [],
    id: string
  ): Promise<CapituloEntity[] | string> {
    let Np: any;
    try {
      let arr = [];

      let clases = await this.#ClasesDeNovela();

      for (let i = linksCapitulos.length - 1; i >= 0; i--) {
        console.log("En proceseso: ", linksCapitulos[i]);
        let datos = await fetch(linksCapitulos[i]);
        let texto = await datos.text();
        let $ = await cheerio.load(texto);

        let titulo = await $("title").text();

        let cap = await this.#EditarTitulo(titulo);
        if (cap.match(this.#Expcap1) == null) {
          let prueba: any = linksCapitulos[i];

          Np = prueba.match(this.#Expcap1)[0].match(this.#Expcap2)[0];
        } else {
          Np = cap.match(this.#Expcap1)[0].match(this.#Expcap2)[0];

          console.log("numero de cap...: " + Np);
        }

        for (let c = 0; c <= clases.length - 1; c++) {
          if (await $(`.${clases[c].trim()}`).hasClass(clases[c].trim())) {
            arr.push(
              await this.#CrearObjeto($, clases[0].trim(), titulo, cap, Np, id)
            );

            break;
          } else {
            if (c == clases.length - 1) {
              let BuscarClase = await $("div").html();

              let claseEncontrada = BuscarClase.match(this.#ClaseEntry);

              arr.push(
                await this.#CrearObjeto($, claseEncontrada, titulo, cap, Np, id)
              );

              break;
            }
          }
        }
      }

      if (arr.length !== linksCapitulos.length) {
        return Promise.reject("faltan capitulos y clases");
      }

      return Promise.resolve(arr);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async #CrearObjeto(
    $: any,
    clases: string,
    titulo: string,
    cap: string,
    Np: number,
    id: string
  ): Promise<CapituloEntity> {
    let contenido = "";
    contenido = await $(`.${clases}`).text();

    contenido = await this.#Edicion(contenido);

    let NuevoCapitulo = new Capituilo({
      cap,
      titulo,
      contenido: contenido,
      Ncap: Np,
      novelaId: id,
    });
    return Promise.resolve(NuevoCapitulo);
  }
  async #Edicion(contenido: any) {
    return await contenido
      .replaceAll("Leer en tunovelaligera.com", ".")
      .replaceAll(
        `Guardar CapituloReportar CapituloPlease complete the required fields.`,
        ""
      )
      .replaceAll(`Ayuda a Tunovelaligera a reportar los capitulos mal.`, "")
      .replaceAll(
        `Your NameEmailReason (required)Reportar Capitulo en InglesReportar`,
        ""
      )
      .replaceAll(
        `Capitulo de otra novelaReportar Capitulo vacioReportar Capitulo incompletoReportar`,
        ""
      )
      .replaceAll(`Capituilo RepetidoDescriptionEnviarVisitar`, "")
      .replaceAll(
        `com Si no te muestra siguiente pagina, tienes que volver activar javascript.`,
        ""
      )
      .replaceAll(`tunovelaligera.`, "")
      .replaceAll(`Si no te muestra siguiente pagina,`, "")
      .replaceAll(`tienes que volver activar javascript.`, "");
  }

  async #EditarTitulo(title: any) {
    return title
      .replaceAll("-", "")
      .replaceAll(" ", "-")
      .replaceAll(".", "")
      .replaceAll("--", "-")
      .replaceAll("---", "-");
  }

  /**
   *
   * @returns []string
   * Extrar todos las clases mas usadas guardada en memoria
   */
  async #ClasesDeNovela() {
    const arr = [
      "chapter-c",
      "td-post-conten",
      "td-post-content",
      "text-left",
      "Readarea",
      "paragraph",
      "td-post-content",
    ];
    return arr;
  }
}
