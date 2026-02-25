import { Genders } from '../enums/genders.enum';

export const TemplateMessages = {
  OFFICIAL_CONTACT: '*Contacto oficial: +522311767553* ☎️',
  WELCOME: (name: string, gender: string): string => `*¡HOLA ${name}!* 🤩 🎉
   
Ahora formas parte de la familia _*IMPETU.*_
Estamos felices de acompañarte en este camino hacia una vida más saludable y activa 🫂.
Este es tu código QR que te proporcionará el acceso a las instalaciones, *recuerda* que este código es de uso personal e intransferible.
     
*¡${gender == Genders.FEMALE ? 'Bienvenida' : 'Bienvenido'} al trabajo duro, pero inteligente!* 💪🧠
${TemplateMessages.OFFICIAL_CONTACT}
`,

  RENEWAL: (name: string) => `
  `,
};
